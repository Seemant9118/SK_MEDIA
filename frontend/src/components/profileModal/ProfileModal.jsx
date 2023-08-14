import React, { useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/UserAction';
import { uploadImage } from '../../api/UploadReq';
import '../../pages/Auth/Auth.css';


function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();

    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null)
    const dispatch = useDispatch()
    const param = useParams();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            e.target.name === "profileImage" ?
                setProfileImage(img) :
                setCoverImage(img);
        }
    };

    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        let UserData = formData;
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append("name", fileName);
            data.append("file", profileImage);
            UserData.profilePicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("file", coverImage);
            UserData.coverPicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }

        dispatch(updateUser(param.id, UserData));
        setModalOpened(false);
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='100%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >   
            <form action="" className='infoForm'>
                <h3>Your info</h3>

                <div>
                    <input type="text" className="infoInput" name='firstname' placeholder='First Name' onChange={handleChange} value={formData.firstname} />
                    <input type="text" className="infoInput" name='lastname' placeholder='Last Name' onChange={handleChange} value={formData.lastname} />
                </div>

                <div>
                    <input type="text" className="infoInput" name='worksAt' placeholder='Works At' onChange={handleChange} value={formData.worksAt} />
                </div>

                <div>
                    <input type="text" className="infoInput" name='livesin' placeholder='Lives in' onChange={handleChange} value={formData.livesin} />
                    <input type="text" className="infoInput" name='country' placeholder='Country' onChange={handleChange} value={formData.country} />
                </div>

                <div>
                    <input type="text" className="infoInput" name='relationship' placeholder='Realtionship status' onChange={handleChange} value={formData.relationship} />
                </div>

                <div>
                    Profile Image
                    <input type="file" name='profileImage' onChange={onImageChange} />
                    Cover Image
                    <input type="file" name='coverImage' onChange={onImageChange} />
                </div>

                <button className='button infoButton' onClick={handleSubmit}>Update</button>
            </form>
        </Modal>
    );
}

export default ProfileModal