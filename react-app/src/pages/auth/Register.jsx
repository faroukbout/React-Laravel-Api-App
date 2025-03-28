import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Register() {
    
    const navigate = useNavigate()
    const {setToken} =useContext(AppContext);

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
    });

    const [errors,setErrors] = useState({});

    async function handleRegister(e){
        e.preventDefault();
        
        const response = await fetch('/api/register', {
            method: "post",
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if(data.errors){
            setErrors(data.errors);console.log(data);
        }else{
          localStorage.setItem('token',data.token)
          setToken(data.token);
          navigate('/');
            console.log(data);
        }

       
    }
    
    return (
    <>
        <h1 className='text-center text-gray-900 pt-4 text-3xl font-bold'>Register a new account</h1>
        
  <form onSubmit={handleRegister} className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-md space-y-5 my-10">
  <div className="flex flex-col gap-1">
    <input
      type="text"
      placeholder="Name"
      className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
  </div>

  <div className="flex flex-col gap-1">
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
  </div>

  <div className="flex flex-col gap-1">
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
  </div>

  <div className="flex flex-col gap-1">
    <input
      type="password"
      placeholder="Confirm Password"
      className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      value={formData.password_confirmation}
      onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
    />
    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation[0]}</p>}
  </div>

  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all hover:shadow-lg font-medium">
    Register
  </button>
</form>


    </>
        

        
    )
}
