import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";

import ContactsIcon from "@mui/icons-material/Contacts";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../Header/Header";
import { tokens } from "@/store/theme";
import { Modal } from "flowbite-react";
import CustomModal from "../customModal/CustomModal";
import Moment from "react-moment";
import "moment/locale/es"; // Import the Spanish locale
import CreateNewAppointment from "../forms/CreateNewAppointment";
import { useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { backendURL } from "@/config/config";
const Calendar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [appointments, setAppointments] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetchLoading,setIsFetchLoading]=useState(false)
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/v1/clinic/appointment/getClinicAppointments`, {
        withCredentials: "include",
      })
      .then(({ data }) => setAppointments(data.appointments))
      .then(() => setIsFetchLoading(false))
      .catch((e) => console.log(e))
      .finally(() => setIsFetchLoading(false));
  }, []);

  // const handleDateClick = (selected) => {
  //   const title = prompt("Please enter a new title for your event");
  //   const calendarApi = selected.view.calendar;
  //   calendarApi.unselect();

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: `${selected.dateStr}-${title}`,
  //       title,
  //       start: selected.startStr,
  //       end: selected.endStr,
  //       allDay: selected.allDay,
  //     });
  //   }
  // };

  // const handleEventClick = (selected) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event '${selected.event.title}'`
  //     )
  //   ) {
  //     selected.event.remove();
  //   }
  // };

  const handleDateSelect = (arg) => {
    setSelectedDates({ start: arg.start, end: arg.end });
    setModalIsOpen(true);
  };

  return (
    <Box m={isMobile ? "5px" : "20px"}>
      <CustomModal
        title={"Agendar nueva cita"}
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <CreateNewAppointment
        appointments={appointments}
        setAppointments={setAppointments}
          closeModal={closeModal}
          selectedDates={selectedDates}
        />
      </CustomModal>

      <Header
        title="Agenda"
        subtitle="Agenda nuevas citas para tus pacientes"
      />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          className="hidden 2xl:block  max-h-[600px] overflow-y-scroll  overflow-hidden"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Citas para hoy</Typography>
          <List>
            {appointments
              .filter(
                (obj) =>
                  new Date(obj.dateStart).toDateString() ===
                  new Date().toDateString()
              )
              .map((e) => (
                <ListItem
                  key={e._id}
                  sx={{
                    backgroundColor: "#FFF",
                    margin: "10px 0",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ListItemText
                    primary={e.reason}
                    secondary={
                      <Typography>
                        <Moment locale="es" format="hh:mm a -  DD MMMM, YYYY">
                          {e.dateStart}
                        </Moment>
                      </Typography>
                    }
                  />
                  <ListItemText
                    sx={{ display: "flex", justifyItems: "center", gap: 2 }}
                    primary={
                      <div className="flex items-center">
                        <div>
                          <Image
                            width={100}
                            height={100}
                            alt="dentist"
                            className="w-10 h-10 object-cover"
                            src={
                              e.doctor.sex === "Hombre"
                                ? "/assets/icons/dentistMale.png"
                                : "/assets/icons/dentistFemale.png"
                            }
                          />
                        </div>
                      </div>
                    }
                    secondary={<Typography>{e.doctor.names}</Typography>}
                  />
                </ListItem>
              ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="5px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            locale={"es"}
            headerToolbar={{
              start: isMobile ? "" : "title",
              center: isMobile
                ? "dayGridMonth,timeGridFourDay"
                : "dayGridMonth,timeGridWeek,timeGridDay",
              end: "prev,next",
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              listMonth: "Agenda del mes",
              listDay: "Agenda hoy",
              timeGrid: "Semana",
            }}
            footerToolbar={{
              start: isMobile ? "listMonth" : "listMonth listDay",
              center: isMobile ? "" : "today",
              end: "prevYear,nextYear",
            }}
            views={{
              timeGridFourDay: {
                type: "timeGrid",
                duration: { days: 4 },
                buttonText: "Semana",
              },
            }}
            initialView={isMobile ? "timeGridFourDay" : "dayGridMonth"}
            //editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={ appointments.map((e) => ({
              id: e._id,
              title: e.reason,
              start: e.dateStart,
              end: e.dateEnd,
            }))}
            select={handleDateSelect}
            //eventClick={handleEventClick}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
