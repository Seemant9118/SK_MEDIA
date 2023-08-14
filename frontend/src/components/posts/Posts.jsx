import React, { useEffect} from 'react'
import {useParams} from 'react-router-dom';
import './Posts.css';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';

const Posts = () => {

  const disptach = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData);
  let {posts , loading} = useSelector((state) => state.PostReducer);
  const params = useParams();

  useEffect(() => {
    disptach(getTimelinePosts(user._id))
  },[])

  if(!posts) return "no posts";
  if(params.id) posts = posts.filter((post)=>post.userId === params.id)
  
  return (
    <div className="Posts">
        { loading ? "Fetching Posts ..." : 
          posts.map((post,id) => {
          return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts