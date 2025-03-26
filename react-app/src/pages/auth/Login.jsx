import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Login() {
    
    const navigate = useNavigate()
    const {setToken} =useContext(AppContext);

    const [formData,setFormData] = useState({
        email:"",
        password:"",

    });

    const [errors,setErrors] = useState({});

    async function handleLogin(e){
        e.preventDefault();
        
        const response = await fetch('/api/login', {
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
        }

       
    }
    
    return (
    <>
        <h1 className='text-center text-gray-900 pt-4 text-4xl text-'>Login to your account</h1>
        
  <form onSubmit={handleLogin} className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-md space-y-5 my-10">

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

  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all hover:shadow-lg font-medium">
   Login
  </button>
</form>


    </>  
    )
}
