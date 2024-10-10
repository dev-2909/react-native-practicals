import React from 'react';
import {Text, StyleSheet, View, Image, Switch} from 'react-native';

const Card = ({item, onToggle}) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{uri: item?.url}} height={100} width={100} />
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardText} numberOfLines={2}>
                    {item?.title}
                </Text>
                <Text>
                    {`Album id: ${item?.albumId}`}
                </Text>
                <Text>
                    {`id: ${item?.id}`}
                </Text>
            </View>
            <Switch value={!item?.disabled} onValueChange={onToggle}/>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default Card;