import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Switch,
} from "react-native";
import { SearchBar } from "react-native-paper";

export const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const fetchData = async () => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await resp.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      searchBar: {
        onChangeText: (event: any) => setSearchQuery(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  const renderItems = ({ item }) => {
    // console.log(item);
    return (
      <View
        style={{
          marginVertical: 15,
          width: "85%",
          borderRadius: 20,
          backgroundColor: "#fff",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            padding: 15,
            alignItems: "center",
          }}
        >
          <Text>{item.albumId}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>{item.id}.</Text>
            <Text style={{ paddingLeft: 5 }}>{item.title}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: item.url }}
              style={{ height: 30, width: 30, resizeMode: "contain" }}
            />
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={{ height: 30, width: 30, resizeMode: "contain" }}
            />
            <Switch
              trackColor={{ false: "#fff", true: "#cdf" }}
              thumbColor={isEnabled ? "#fff" : "#cdf"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text style={{ alignSelf: "center" }}>Fetch data from API</Text>
      <View style={{ height: 50 }}>
        <SearchBar
          placeholder={"search here..."}
          onChangeText={() => setSearchQuery}
          value={searchQuery}
          barTintColor={"#fff"}
          tintColor={"#000"}
        />
      </View>
      <View style={{ backgroundColor: "#0000" }}>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItems}
            bounces={false}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
