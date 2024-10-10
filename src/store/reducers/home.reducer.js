import {GET_ALBUM_DATA} from "../actions/home.action";

const initState = {
    albumData: [],
}

const HomeReducer = (state = initState, actions) => {
    switch (actions.type) {
        case GET_ALBUM_DATA:
            return {
                ...state,
                albumData: [...actions.payload]
            }

        default:
            return state;
    }
}

export default HomeReducer;