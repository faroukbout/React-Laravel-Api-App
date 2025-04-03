import React, { useContext, useEffect, useState , } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

export default function Show() {
    const {id} = useParams();
    const {user,token} = useContext(AppContext);
    const [post,setPost] = useState(null);
    const navigate = useNavigate();
    async function getPost() {

        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        console.log(data);
        if(res.ok){
            setPost(data.post);
          }       
    }

    async function handleDelete(e) {
      e.preventDefault();
      console.log('1');
      
      if(user && user.id === post.user_id){
        console.log('2');
         const res = await fetch(`/api/posts/${id}`,{
        method : "delete",
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      console.log('3');
      const data = await res.json();
      if (res.ok) {
        navigate("/")
      }
      console.log(data);
      }
     
      
    }

    useEffect(()=>{
        getPost();
    },[]);
  return (
    <>
    {post ?(
        <div 
        key={post.id}
        className="container mx-auto max-w-3xl px-6 py-10">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
          <p className="text-gray-600 text-sm mb-4">
            Created by <span className="font-medium text-gray-800">{post.user.name}</span> • {new Date(post.created_at).toLocaleString()}
          </p>
        
          <div className="text-gray-700 leading-relaxed text-lg">{post.content}</div>
          { user && user.id === post.user_id &&         <div className="mt-6">
            <Link to={`/posts/update/${post.id}`} className='inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all'>Update Post</Link>
            <form onSubmit={handleDelete} className='inline'>
              <button type='submit' className='inline-block bg-red-600 ml-2 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all'>
                Delete
              </button>
            </form>
          </div>          
          }
  
        </div>
        </div>
) : 
    <p>This Post does not Exist</p>
}

    </>
    
  )
}
