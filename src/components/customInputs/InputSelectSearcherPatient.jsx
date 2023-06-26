import React, { useState } from "react";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const InputSelectSearcherPatient = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter the options based on the search term
    const filtered = options.filter((option) =>
      option.names.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm("");
    setFilteredOptions(options);
    onSelect(option);
  };

  return (
    <div className="my-6 flex flex-col gap-2">
      <span className="text-gray-600 font-bold text-base">Paciente</span>
      <div className="flex flex-col gap-2">
      <input
        className="rounded-lg"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar por nombre"
        />
       {searchTerm !=="" && (<div><span className="text-xs p-1 bg-blue-50 rounded-md font-bold">{filteredOptions.length} resultados</span></div>)} 

        <select
        required
        className="bg-blue-50 rounded-lg"
          value={selectedOption ? selectedOption._id : ""}
          onChange={(e) =>
            handleOptionSelect(
              options.find((option) => option._id === e.target.value)
            )
          }
        >
          <option value="" className=" ">Seleccionar un paciente</option>
          {filteredOptions.map((option) => (
            <option key={option._id} value={option._id}>
              {option.names} | {option.dni}
            </option>
          ))}
        </select>
       
        {selectedOption && (
          <div className="flex justify-start p-2 gap-4 bg-blue-50 text-blue-600 rounded-lg">
            <AssignmentIndIcon/>
            {selectedOption.names}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSelectSearcherPatient;
