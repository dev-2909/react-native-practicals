import { ADD_PHOTOS } from "../types";

export const addPhotos = (data) =>{
    return{
        type: ADD_PHOTOS,
        payload: data
    }
}