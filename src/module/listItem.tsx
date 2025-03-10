import React from "react";
import {Image, StyleSheet, Switch, Text, View} from "react-native";

const ListItem = ({
    item,
    blockedList,
    onSwitchPress,
}: {
    item: any;
    blockedList: any[];
    onSwitchPress?: (item: any) => void;
}) => {
    const isDisabled = blockedList?.some(
        (i) => i?.albumId === item?.albumId && i?.id === item?.id
    );
    return (
        <View style={styles.item}>
            <Image source={{uri: item?.thumbnailUrl}} style={styles.img}/>
            <View style={styles.detailsContainer}>
                <Text>{`Id: ${item?.id}`}</Text>
                <Text style={styles.title}>{item?.title}</Text>
                <Text>{`Album id: ${item?.albumId}`}</Text>
                {onSwitchPress && <Switch value={!isDisabled} onValueChange={() => onSwitchPress(item)}/>}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    item:{flexDirection:'row',alignItems:'center',gap:12,flex:1,width:'100%',shadowColor:'black',shadowRadius:3,backgroundColor:'white',shadowOpacity:0.3},
    img:{height:150,width:150,backgroundColor:'red'},
    detailsContainer:{gap:8},
    title:{flexWrap:'wrap',maxWidth:'80%'}
});

export default ListItem;
