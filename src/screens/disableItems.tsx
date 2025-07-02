import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CardView from "../component/CardView";

const disableItems = () => {
  const [disList, setDisList] = useState([]);

  useEffect(() => {
    const fetchDisableList = async () => {
      const data: any = await AsyncStorage.getItem("disabledItems");
      const resData = await JSON.parse(data);
      setDisList(resData);
    };
    fetchDisableList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={disList}
        renderItem={({ item, index }) => {
          return <CardView item={item} index={index} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{"No Items Found"}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default disableItems;

const styles = StyleSheet.create({});
