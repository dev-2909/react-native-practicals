import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GET_ALBUM_DATA = "GET_ALBUM_DATA";

export const getAlbumData = () => {
    return async dispatch => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/photos');

            const albumData = res?.data?.map((i) => ({...i, disabled: false}))

            const item = await AsyncStorage.getItem('disabledData');
            let data = albumData

            if (item) {
                const disabledData = JSON.parse(item)
                data = albumData?.map(i => {
                    return disabledData?.find((j) => {
                        if (j?.id === i?.id && j?.albumId === i?.albumId) {
                            return {...j}
                        }
                    }) || {...i}
                })
            }

            return dispatch({
                type: GET_ALBUM_DATA,
                payload: [...data]
            })
        } catch (e) {
            console.error('Error in getAlbumData: ', e);
        }
    }
}

export const setDisabledData = (val, item) => {
    return async (_, getState) => {
        try {
            const albumData = getState()?.home?.albumData;

            let data = albumData?.find(i => {
                if (item?.id === i?.id && item?.albumId === i?.albumId) {
                    return {...i}
                }
            })
            let findVal = {...data, disabled: val}

            if (findVal)
            {
                const prevData = await AsyncStorage.getItem('disabledData');

                if (prevData) {
                    findVal = [...(JSON.parse(prevData)), findVal]
                } else {
                    findVal = [findVal]
                }

                await AsyncStorage.setItem('disabledData', JSON.stringify(findVal));
            }
        } catch (e) {
            console.error('Error in setDisabledData: ', e);
        }
    }
}