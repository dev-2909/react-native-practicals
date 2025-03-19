import React, {useEffect, useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./Store";
import {setBlockList} from "./blockListSlice";

const ListItem = () => {

    const [listItem, setListItem] = useState([])
    const [isBlock, setIsBlock] = useState(false)
    const [isSelected, setIsSelected] = useState<any>()
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()
    const result = useSelector((state:RootState) => state.blocklist)
    console.log(result)
    const fetchData = () => {
        return  fetch('https://jsonplaceholder.typicode.com/photos').then((response) =>
            response.json()).then((res) =>
            setListItem(res)
        ).catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchData()
    }, []);

    const renderItem = ({item, index}:{item:any, index: number}) => {

        return (
            <View style={Style.listContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between',padding:2}}>
                    <Text style={{fontSize: 16}}>ID: {item.id}</Text>
                    <TouchableOpacity style={Style.enableBtn} onPress={() => {
                        setIsSelected(index)
                        dispatch(setBlockList(item))
                    }}>
                        <Text style={{fontSize: 16, color:'black'}}>{isSelected == index ? 'Unblock' : 'Block'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{fontSize: 16}}>albumId: {item.albumId}</Text>
                <Text style={{fontSize: 18}}>Title: {item.title}</Text>
                <Image source={{uri: 'https://via.placeholder.com/600/e5109'}} style={Style.imageStyle} />

            </View>


        )
    }

    return (
        <SafeAreaView style={Style.containerStyle}>
            <Button title={'BloctList'} onPress={() => navigation.navigate('BlockListItem')}/>
                <FlatList data={listItem} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}/>
            {/*<Image source={{uri: 'https://via.placeholder.com/600/e5109'}} style={Style.imageStyle} />*/}

        </SafeAreaView>
    )
}

export default ListItem

const Style = StyleSheet.create({
    containerStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 4
    },
    listContainer: {
        paddingVertical: 3,
        paddingHorizontal: 3,
        backgroundColor: '#8AB2A6',
        borderRadius: 3,
        borderColor: 'black',
        marginBottom: 2,
        borderWidth: 1
    },
    imageStyle: {
        width: 30,
        height: 30,
        resizeMode :'contain'
    },
    enableBtn: {
        backgroundColor: 'pink',paddingHorizontal: 3, paddingVertical: 3, alignItems:'center'
    }
})
