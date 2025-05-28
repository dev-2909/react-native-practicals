import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Switch,
  Image,
  Button,
} from "react-native";
import SearchBar from "./components/seachBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myArray');
      if (jsonValue !== null) {
        setData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())

      .then(async(json) => {
        await AsyncStorage.setItem('myArray', JSON.stringify(json.map((item) => ({ ...item, isSelected: item?.isSelected }))));
        setData(json.map((item) => ({ ...item, isSelected: true })));
        
      })
      .catch((error) => console.error(error));
  }, []);

  const toggleSwitch = async(id) => {
    const updateData = data.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setData(updateData);
    await AsyncStorage.setItem('myArray', JSON.stringify(updateData));
  };

  const handleSearch = (searchText) => {
    const filtered = data.filter((item) =>
      item.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <FlatList
          data={filteredData?.length>0 ? filteredData : data?.filter((item)=>item?.isSelected)}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ marginTop: 20 }} />}
          renderItem={({ item }) => {
            // console.log(item?.thumbnailUrl);
            return (
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  padding: 20,
                  borderWidth: 1,
                }}
              >
                <Image
                  source={{ uri: item?.thumbnailUrl }}
                  style={{ height: 50, width: 50, backgroundColor: "red" }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 18, textAlign: "center" }}>
                        id:
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {item?.id}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 18, textAlign: "center" }}>
                        albumId:
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {item?.albumId}
                      </Text>
                    </View>
                  </View>

                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={item?.isSelected ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch(item?.id)}
                    value={item?.isSelected}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                    title:
                  </Text>
                  <Text style={{ marginLeft: 10, fontSize: 18, flex: 1 }}>
                    {item?.title}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Button
          title="Disable Data"
          onPress={() => navigation.navigate("DisableDataScreen",{data})}
        />
      </View>
    </View>
  );
};
