import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const CardView = ({ item, index, handleEnableItem, disabledItemsList, isEnabled }: any) => {
  return (
    <View
      key={index}
      style={{
        padding: 10,
        backgroundColor: "lightgrey",
        borderRadius: 10,
        margin: 10,
      }}
    >
      <Text>{`id: ${item.id}`}</Text>
      <Text>{`albumId: ${item.albumId}`}</Text>
      <Text>{`Title: ${item.title}`}</Text>
      <Image source={{ uri: item.url }} style={{ height: 80, width: 80 }} />
     {isEnabled && <Button
        onPress={() => handleEnableItem(item)}
        title={disabledItemsList?.includes(item) ? "Disable" : "Enable"}
      />}
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({});
