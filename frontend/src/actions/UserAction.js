import * as UserApi from "../api/UserReq"

export const updateUser = (id,formData) => async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id,formData);
        dispatch({type: "UPDATING_SUCCESS" , data: data})
    }
    catch(err) {
        dispatch({type: "UPDATING_FAIL"})
    }
};

export const followUser = (id,data) => async(dispatch)=> {
    dispatch({type: "FOLLOW_USER"})
    UserApi.followUser(id,data)
};

export const unFollowUser = (id,data) => async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER"})
    UserApi.unFollowUser(id,data)
};
