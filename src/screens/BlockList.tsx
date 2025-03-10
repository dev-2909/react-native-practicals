import React, {useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, View, Image, StyleSheet, Switch} from 'react-native';
import {fetchData} from "../services/api";
import {HomeContext} from "../context/HomeContext";
import {it} from "@jest/globals";
import ListItem from "../module/listItem";

export const BlockList = () => {
    const {blockData} = useContext(HomeContext);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={blockData}
                contentContainerStyle={styles.list}
                renderItem={({item})=>(
                    <ListItem item={item} blockedList={[]}/>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{flex:1},
    list:{gap:16,overflow:'visible'},
})
