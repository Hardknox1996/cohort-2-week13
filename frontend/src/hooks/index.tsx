import { useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../config';


export interface Blog {
  authorName?: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    ).then(response => {
      setBlogs(response.data.blog)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blogs
  }
}



export const useBlog = ({ id }: { id: string }) => {  
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    ).then(response => {
      setBlog(response.data.id)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blog
  }
}