import * as UploadApi from '../api/UploadReq';


export const uploadImage = (data) => async (dispatch) =>{
    try {
        console.log("Image Uploaded");
        await UploadApi.uploadImage(data);
    } catch (error) {
        console.log(error)
    }
};


export const uploadPost = (data) => async (dispatch) => {
    dispatch({type: "UPLOAD_START"});
    try{
        const newPost = await UploadApi.uploadPost(data);
        dispatch({type: "UPLOAD_SUCCESS" , data: newPost.data});
    } catch(error) {
        console.log(error);
        dispatch({type: "UPLOAD_FAIL"});
    }
};