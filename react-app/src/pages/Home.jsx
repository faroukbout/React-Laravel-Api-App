import { useEffect, useState } from "react";


export default function Home() {

  const [posts,setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch('/api/posts');
    const data = await res.json();
    if(res.ok){
      setPosts(data);
    }
  }

  useEffect(()=>{
    getPosts();
  } ,[])
  
  return (
    <>
        <h1 className='text-center text-gray-900 pt-4 text-3xl font-bold'>latest posts</h1>

        {posts.length > 0 ? posts.map(post => (
          <div className="">
  <div 
    key={post.id} 
    className="bg-white shadow-md rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 mt-5"
  >
    <div className="mb-4 border-b border-gray-300 pb-3">
      <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
      <small className="text-gray-500 block mt-1">
        Created by <span className="font-medium text-gray-700">{post.user.name}</span> • {new Date(post.created_at).toLocaleTimeString()}
      </small>
    </div>

    <p className="text-gray-700 leading-relaxed">
      {post.content}
    </p>
  </div>
</div>

        ))

        : <p>No Posts Available</p> }
    </>
  )
}
