import React, {useEffect, useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {setBlockList} from "./blockListSlice";
import {store} from "./Store";
import {useSelector} from "react-redux";

const BlockListItem = () => {

    const [isData, setIsData] = useState(store.getState().blocklist.result)
    console.log("block",isData)

    const renderListItem = ({item, index}:{item:any, index: number}) => {

        return (
            <View style={Style.listContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between',padding:2}}>
                    <Text style={{fontSize: 16}}>ID: {item.id}</Text>
                </View>

                <Text style={{fontSize: 16}}>albumId: {item.albumId}</Text>
                <Text style={{fontSize: 18}}>Title:{item.title}</Text>
                <Image source={{uri: 'https://via.placeholder.com/600/e5109'}} style={Style.imageStyle} />

            </View>
        )
    }

        return (
            <SafeAreaView style={Style.containerStyle}>
                <FlatList data={isData} renderItem={renderListItem} keyExtractor={(item) => item.id.toString()}/>
                {/*<Image source={{uri: 'https://via.placeholder.com/600/e5109'}} style={Style.imageStyle} />*/}
            </SafeAreaView>
        )
}

export default BlockListItem;

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
})
