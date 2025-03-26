import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function Layout() {

  const {user,token,setUser,setToken} = useContext(AppContext)
  const navigate = useNavigate();
  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout",{
      method:'post',
      headers : {
        Authorization: `Bearer ${token}`,
    },
    });
    const data = await res.json();
    console.log(data);
    if(res.ok){
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate('/');

    }
  }

  return (
    <>
    <header className='bg-gray-900'>
        <nav className=" text-white p-4 flex justify-between items-center container mx-auto">
            <Link to="/" className='  hover:bg-gray-700 p-2 hover:rounded-md ' >Home</Link>
            {
              user ? (
                <div className='space-x-4'>
                  <p className='inline text-white t p-4'> {user.name}</p>
                  <form onSubmit={handleLogout} className='inline'>
                    <button className='  hover:bg-gray-700 p-2 hover:rounded-md'>Logout</button>
                  </form>
                </div>
              ) :(
                <div className='space-x-4'>
                    <Link to='/register' className='  hover:bg-gray-700 p-2 hover:rounded-md'>Register</Link>
                    <Link to='/login' className='  hover:bg-gray-700 p-2 hover:rounded-md'>Login</Link>

                </div>
              )
            }

        </nav>
    </header>
    <main>
        <Outlet/>
    </main>
    </>
  )
}
