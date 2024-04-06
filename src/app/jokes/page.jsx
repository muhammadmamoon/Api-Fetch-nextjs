"use client";
import React, { useEffect, useState } from "react";

function Page() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiData = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await apiData.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handlePreviousPost = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + posts.length) % posts.length
    );
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-11 ">
      <h1 className=" text-blue-500 text-2xl">Random Posts</h1>
      {posts.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <h2>{posts[currentIndex].title}</h2>
          <p>{posts[currentIndex].body}</p>

          <div className="gap-3 mt-5">
            <button
              onClick={handlePreviousPost}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Previous Post
            </button>
            <button
              onClick={handleNextPost}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Next Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
