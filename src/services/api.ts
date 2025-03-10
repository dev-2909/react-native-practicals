import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export  const fetchData = async ()=>{
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
        await AsyncStorage.setItem('data',JSON.stringify(response?.data));
        return response?.data;
    } catch (err){
        console.log(err,"error in fecthData api")
    }
}
