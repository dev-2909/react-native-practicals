import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchData} from "../services/api";

export  const HomeContext = createContext(null);

export  const HomeContextProvider =({children})=>{
    const [data,setData] = useState([]);
    const [blockData,setBlockData] = useState([]);
    useEffect(() => {
        initState();
    }, []);

    const initState =async ()=>{
        const localData = await AsyncStorage.getItem('data');
        const blockData = await  AsyncStorage.getItem('blockData')

        if(blockData !== null){
            const blockDataArr = JSON.parse(blockData ?? '');
            setBlockData(blockDataArr ?? [])
            console.log(blockDataArr,"blockDataArr")
            if(localData !== null){
                const localDataArr = JSON.parse(localData ?? '');
                const updatedData = localDataArr.filter((item: any)=> !blockDataArr?.some(
                    (i: any) => i?.albumId === item?.albumId && i?.id === item?.id
                ))
                setData(updatedData);
            } else {
                const apiData = await fetchData();
                const updatedData = apiData.filter((item: any)=> !blockDataArr?.some(
                    (i: any) => i?.albumId === item?.albumId && i?.id === item?.id
                ))
                setData(updatedData);
            }
        } else {
            if (localData !== null) {
                const localDataArr = JSON.parse(localData ?? '');
                setData(localDataArr);
            } else {
                const apiData = await fetchData();
                setData(apiData);
            }
        }
    }

    return (
        <HomeContext.Provider value={{
            data,setData, blockData,setBlockData,initState
        }}>{children}</HomeContext.Provider>
    )
}
