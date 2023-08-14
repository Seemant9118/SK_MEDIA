import React, { useState, useRef } from 'react'
import './PostShare.css'
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
import {Link} from 'react-router-dom';

const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const loading = useSelector((state) => state.PostReducer.uploading);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const desc = useRef();
    const { user } = useSelector((state) => state.authReducer.authData)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    }

    const imageRef = useRef();


    const resetShare = () => {
        setImage(null);
        desc.current.value = ""
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        // if user want to upload image
        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name;
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename;
            console.log(newPost);

            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        console.log(newPost)
        resetShare();
    }


    return (
        <div className="PostShare">
            <Link to={`/profile/${user._id}`} className='profile'> <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"} alt="" /> </Link>
            <div>
                <input ref={desc} required type="text" placeholder="What's happening" />
                <div className="postOptions">
                    <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option" style={{ color: "var(--video)" }}>
                        <UilPlayCircle disabled/>
                        Video
                    </div>
                    <div className="option" style={{ color: "var(--location)" }}>
                        <UilLocationPoint disabled/>
                        Location
                    </div>
                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <UilSchedule disabled/>
                        Schedule
                    </div>

                    <button className='button ps-button' onClick={handleSubmit} disabled={loading} >
                        {loading ? "Uploading..." : "Share"}
                    </button>

                    <div style={{ display: "none" }}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>

                {image &&
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default PostShare