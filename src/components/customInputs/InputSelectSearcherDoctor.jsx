import React, { useState } from "react";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Image from "next/image";


const InputSelectSearcherDoctor = ({ options, onSelect }) => {
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
      <span className="text-gray-600 font-bold text-base">Doctor</span>
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
          <option value="" className="">Seleccionar un doctor</option>
          {filteredOptions.map((option) => (
            <option key={option._id} value={option._id}>
              {option.names} 
            </option>
          ))}
        </select>
       
        {selectedOption && (
          <div className="flex justify-start items-center p-2 gap-4 bg-blue-50 text-blue-600 rounded-lg">
            <Image className="w-20 h-20 rounded-sm object-contain" width={300} height={300} src={selectedOption.profileImage} alt={selectedOption.names}/> 
            <span className="font-bold">{selectedOption.names}{" "}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSelectSearcherDoctor;
