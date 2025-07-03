import { ADD_PHOTOS } from "../types";

const initiaState = {
  Photos: [],
};

export const PhotosReducer = (state = initiaState, action) => {
  switch (action.type) {
    case ADD_PHOTOS:
      return {
        ...state,
        Photos: action.payload
      };
    default:
        return state
  }
};
