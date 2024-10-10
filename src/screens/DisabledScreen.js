import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";

import {setDisabledData} from "../store/actions/home.action";
import Card from "../components/Card";

export const DisabledScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const item = await AsyncStorage.getItem('disabledData');
        setData(JSON.parse(item))
    }

    const onToggle = (val, item) => {
        dispatch(setDisabledData(!val, item))
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}>
                {!data?.length &&
                    <Text>No data found</Text>
                }
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={true}
                    renderItem={({item, index}) => {
                        return (
                            <Card item={item} onToggle={(val) => onToggle(val, item)} key={index}/>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    backBtn: {
        marginBottom: 10,
        borderColor: '#073bf5',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 5,
        width: 100,
        alignItems: 'center'
    },
})