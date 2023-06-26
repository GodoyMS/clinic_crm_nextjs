import { createSlice } from "@reduxjs/toolkit";

export const clinicSlice = createSlice({
  name: "clinic",
  initialState: {
    infoClinic: null,
    tokenClinic: null,
    doctors:[],
    patients: [],
    appointmentsClinic: [],
    exp: null,
  },
  reducers: {
    setClinicInfo: (state, action) => {
      state.infoClinic = action.payload;
      if (window !== "undefined") {
        localStorage.setItem("infoClinic", JSON.stringify(action.payload));
      }
    },
    setToken: (state, action) => {
      state.tokenClinic = action.payload;
      if (window !== "undefined") {
        localStorage.setItem("tokenClinic", JSON.stringify(action.payload));
      }
    },
    setExp: (state, action) => {
      state.exp = action.payload;
      if (window !== "undefined") {
        localStorage.setItem("expClinic", JSON.stringify(action.payload));
      }
    },
    setPatient: (state, action) => {
      if (window !== "undefined") {
        localStorage.setItem(
          "patients",
          JSON.stringify([...state.patients, action.payload])
        );
      }
      state.patients.push(action.payload)
    },
    setDoctor:(state,action)=>{

      if (window !== "undefined") {
        localStorage.setItem(
          "doctors",
          JSON.stringify([...state.doctors, action.payload])
        );
      }
      state.doctors.push(action.payload)
    },
      updateDoctorById:(state,action)=>{
      const doctorIndex = state.doctors.findIndex(doctor => doctor._id === action.payload._id);
      if (doctorIndex !== -1) {
        state.doctors[doctorIndex] = action.payload;
      }
      if (window !== "undefined") {
        localStorage.setItem(
          "doctors",
          JSON.stringify(state.doctors)
        );
      }
    },

    deleteDoctorById:(state,action)=>{

      const doctorIndex = state.doctors.findIndex(doctor => doctor._id === action.payload);
      if (doctorIndex !== -1) {
        state.doctors.splice(doctorIndex,1)
      }
      if(window!="undefined"){
        localStorage.setItem(
          "doctors",
          JSON.stringify(state.doctors)
        );
      }


    },


    deletePatientById:(state,action)=>{
      const patientIndex = state.patients.findIndex(patient => patient._id === action.payload);
      if (patientIndex !== -1) {
        state.patients.splice(patientIndex,1)
      }
      if(window!="undefined"){
        localStorage.setItem(
          "patients",
          JSON.stringify(state.patients)
        );
      }
    },

    updatePatientById:(state,action)=>{
      const patientIndex = state.patients.findIndex(patient => patient._id === action.payload._id);
      if (patientIndex !== -1) {
        state.patients[patientIndex] = action.payload;
      }
      if (window !== "undefined") {
        localStorage.setItem(
          "patients",
          JSON.stringify(state.patients)
        );
      }
    },
    setAllPatients:(state,action)=>{
        state.patients=action.payload;

        if (window !== "undefined") {
            localStorage.setItem("patients", JSON.stringify(action.payload));
          }
    },
    setAllDoctors:(state,action)=>{
      state.doctors=action.payload;

      if (window !== "undefined") {
        localStorage.setItem("doctors", JSON.stringify(action.payload));
      }

    },
    setAllAppointments:(state,action)=>{
      state.appointmentsClinic=action.payload;

      if (window !== "undefined") {
        localStorage.setItem("appointmentsClinic", JSON.stringify(action.payload));
      }

    },
    setAppointment: (state, action) => {
      if (window !== "undefined") {
        localStorage.setItem(
          "appointmentsClinic",
          JSON.stringify([...state.appointmentsClinic, action.payload])
        );
      }
      state.appointmentsClinic.push(action.payload);
    },
    initializeState: (state, action) => {
      // Set the initial state based on the action payload
      if (action.payload.patients) {
        state.patients = action.payload.patients;
      } else {
        state.patients = [];
      }
      if (action.payload.doctors) {
        state.doctors = action.payload.doctors;
      } else {
        state.doctors = [];
      }

      if (action.payload.appointmentsClinic) {
        state.appointmentsClinic = action.payload.appointmentsClinic;
      } else {
        state.appointmentsClinic = [];
      }




    //   if (action.payload.appointmentsClinic) {
    //     state.appointments = action.payload.appointmentsClinic;
    //   } else {
    //     state.appointments = [];
    //   }
      state.infoClinic = action.payload.infoClinic;
      state.tokenClinic = action.payload.tokenClinic;
      state.exp = action.payload.exp;
    },
    clearClinic: (state, action) => {
      state.patients = [];
      state.appointmentsClinic = [];
      state.exp = null;
      state.tokenClinic = null;
      state.infoClinic = null;
      state.doctors=[];

      if(window !== "undefined"){
       localStorage.getItem("infoClinic")&& localStorage.removeItem("infoClinic");
       localStorage.getItem("tokenClinic")&&   localStorage.removeItem("tokenClinic");
       localStorage.getItem("patients")&&  localStorage.removeItem("patients");
       localStorage.getItem("doctors")&&  localStorage.removeItem("doctors");

       localStorage.getItem("expClinic")&&   localStorage.removeItem("expClinic");
       localStorage.getItem("appointmentsClinic")&&  localStorage.removeItem("appointmentsClinic");

      }
    },
  },
});
export const {
  setClinicInfo,
  setToken,
  setExp,
  setPatient,
  setAllPatients,
  setDoctor,
  updateDoctorById,
  setAllDoctors,
  setAllAppointments,
  deletePatientById,
  deleteDoctorById,
  updatePatientById,
  setAppointment,
  initializeState,
  clearClinic,
} = clinicSlice.actions;

export default clinicSlice.reducer;
