import React, {useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, View, Image, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {fetchData} from "../services/api";
import {HomeContext} from "../context/HomeContext";
import {it} from "@jest/globals";
import ListItem from "../module/listItem";
import {Searchbar} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = ({navigation}) => {
    const {data,blockData,setBlockData,initState} = useContext(HomeContext);
    const [search, setSearch]=useState('');

    const handleSwitchPress= async (item) => {
        if(blockData?.length >0 ){
            await AsyncStorage.setItem('blockData',JSON.stringify([...blockData,item]));
            setBlockData([...blockData,item]);
        } else {
            await AsyncStorage.setItem('blockData',JSON.stringify([item]));
            setBlockData([item]);
        }
        initState()
    };

    const handleBlockListPress=()=>{
        navigation?.navigate('BlockList')
    }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={handleBlockListPress}>
            <Text style={styles.btnText}>Block List</Text>
        </TouchableOpacity>
        <Searchbar style={styles.search} value={search} onChangeText={(txt)=>setSearch(txt)} placeholder={'Search'} />
        <FlatList
            data={data?.filter((item)=>
                item?.title?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())
            )}
            contentContainerStyle={styles.list}
            renderItem={({item})=>(
                <ListItem item={item} onSwitchPress={(item)=>handleSwitchPress(item)} blockedList={blockData}  />
            )}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{flex:1,gap:16},
    btn:{backgroundColor:'purple',padding:10,alignSelf:'flex-end',marginHorizontal:16,borderRadius:12},
    btnText:{color:'white'},
    search:{marginHorizontal:16},
    list:{gap:16,overflow:'visible'},
})
