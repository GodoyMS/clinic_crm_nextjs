import { Label,Button } from "flowbite-react"
import { TextInput } from "flowbite-react"
import { useState } from "react"
const CreateNewPatientForm = () => {

    
    const [name, setName]=useState('')
    const [email, setEmail] = useState('');
    const[message,setMessage]=useState('');
    const [dni, setDni] = useState('');
    const[sex,setSex]=useState('');
    const[wsp,setWsp]=useState('');

    const[openToast,setOpenToast]=useState(false)
    const handleCloseToast=()=>setOpenToast(false)
    console.log(sex)
    const resetValues=()=>{
          setName("");
        setEmail("");
        setMessage("");
                }
                const handleSubmit=async(e)=>{
                    e.preventDefault();
                    emailjs.send('service_wvqh7h9', 'template_afvupw8',{
                        to_name:'Godoy',
                        from_name:name,
                        message:`Email: ${email}; message: ${message}`,
                    }, 'bhi5dMdjnkTHWDDlQ')
                        .then((result) => {
                            console.log(result.text);
                            setOpenToast(true);
                            resetValues();
                        }, (error) => {
                            console.log(error.text);
                        });
                }
  return (
                <form  onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="hidden">Nombres</label>
                            <input required type="name" value={name} onChange={(prev)=>setName(prev.target.value)} name="user_name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
                        </div>

                        <div className="flex flex-col mt-2">
                            <label htmlFor="dni" className="hidden">Dni</label>
                            <input required   value={dni}  onChange={(prev)=>setDni(prev.target.value)} type="text" name="dni" id="dni" minLength="8"  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
                        </div>

                        <fieldset className="grid grid-cols-2">
                            <legend className="sr-only">Sexo</legend>

                            <div  style="cursor:pointer" className="flex items-center mb-4">
                                <input id="Hombre" {...sex==='Hombre' ? checked:null }  style="cursor:pointer" onChange={()=>setSex('Hombre')}  type="radio" name="sexo" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 " />
                                <label htmlFor="Hombre" style="cursor:pointer" className="block ml-2 text-sm font-medium text-gray-900 ">
                                Hombre
                                </label>
                            </div>

                            <div style="cursor:pointer" className="flex items-center mb-4">
                                <input id="Mujer" {...sex==='Mujer' ? checked:null } style="cursor:pointer" onChange={()=>setSex('Mujer')} type="radio" name="sexo"  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300    "/>
                                <label htmlFor="Mujer" style="cursor:pointer"  className="block ml-2 text-sm font-medium text-gray-900 ">
                                Mujer
                                </label>
                                
                            </div>
                        </fieldset>


                        <div className="flex flex-col mt-2">
                            <label htmlFor="wsp" className="hidden">Whatsapp</label>
                            <input required  type="text" value={wsp}  onChange={(prev)=>setWsp(prev.target.value)} name="wsp" id="wsp" placeholder="Whatsapp"  maxLength="15" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
                        </div>

                        <button type="submit" className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                            Submit
                        </button>
                    </form>
  )
}

export default CreateNewPatientForm