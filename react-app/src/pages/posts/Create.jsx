import { useContext, useEffect, useState } from "react"
import { AppContext } from '../../context/AppContext'
import { useNavigate } from "react-router-dom";

function Create() {
    const navigate = useNavigate();
    const {token} = useContext(AppContext);
    const [formData,setFormData] = useState({
        title : "",
        content :"",
    });
    const [errors,setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();

        const res = await fetch('/api/posts',{
          method:'post',
          headers : {
            Authorization:`Bearer ${token}`
          },
          body : JSON.stringify(formData)
        });
        
        const data = await res.json();
        if(data.errors){
          setErrors(data.errors);
        }else{
          navigate('/');
        }
        console.log(data);
        
    }
    useEffect(()=>{
      if(formData){
          console.log(formData);
      }
  },[formData]);

  return (
    <>
<div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl shadow-md space-y-6 my-10">
  <h1 className="text-3xl font-bold text-white text-center">Create a Post</h1>

  <form onSubmit={handleCreate} className="space-y-4">
    <div className="flex flex-col gap-1">
      <input 
        type="text" 
        placeholder="Post Title"
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        value={formData.title}
        onChange={(e)=>
            setFormData({ ...formData,title : e.target.value})
        }
      />
       {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
    </div>

    <div className="flex flex-col gap-1">
      <textarea 
        rows="5" 
        placeholder="Content"
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
        value={formData.content}
        onChange={(e)=>
            setFormData({ ...formData,content : e.target.value})
        }
      />
       {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content[0]}</p>}
    </div>

    <button 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all hover:shadow-lg font-medium"
    >
      Create
    </button>
  </form>
</div>


    </>
)
}

export default Create