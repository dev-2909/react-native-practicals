import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, TextInput, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";

import {getAlbumData, setDisabledData} from "../store/actions/home.action";
import Card from "../components/Card";

export const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const albumData = useSelector((state) => state.home.albumData);

    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(albumData || []);

    useEffect(() => {
        dispatch(getAlbumData())
    }, []);

    useEffect(() => {
       setSearchData([...albumData])
    }, [albumData]);

    useEffect(() => {
        if (albumData?.length && searchValue?.length){
            getSearchData();
        }
    }, [searchValue, albumData]);

    const getSearchData = () => {
        const data = searchData.filter((i) => i.title.includes(searchValue))
        setSearchData([...data])
    }

    const onToggle = (val, item) => {
        dispatch(setDisabledData(!val, item))
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.disableBtn}
                onPress={() => navigation.navigate('DisabledScreen')}
            >
                <Text>Get Disabled</Text>
            </TouchableOpacity>
            <TextInput
                onChangeText={(val) => setSearchValue(val)}
                value={searchValue}
                placeholder={'Search'}
                style={styles.searchContainer}
            />
            <View style={{flex: 1}}>
                {(!searchData?.length && searchValue) &&
                    <Text>No data found</Text>
                }
                <FlatList
                    data={searchData}
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
    disableBtn: {
        alignSelf: 'flex-end',
        marginBottom: 10,
        borderColor: '#073bf5',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 5
    },
    searchContainer: {
        borderColor: '#a3a3a3',
        borderWidth: 1,
        borderRadius: 10,
    },
    cardContainer: {
        marginTop:15,
        padding: 10,
        borderColor: '#adada5',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
    },
    cardTextContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    cardText: {
        fontWeight: '500',
        color: '#212120',
        fontSize: 16,
    },
})