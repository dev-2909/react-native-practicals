import { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CardView from "../component/CardView";

export const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [disabledItemsList, setDisabledItemsList] = useState<any[]>([]);

  const fetchData = async () => {
    const disabledItems = await AsyncStorage.getItem("disabledItems");
    const allDisabledItems = disabledItems
      ? await JSON.parse(disabledItems)
      : [];

    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=10"
    );
    const response = await res.json();
    const secondId = allDisabledItems.map((item: any) => item.id);
    const onlyEnableList: any = response.filter(
      (item: any) => !secondId.includes(item.id)
    );
    if (secondId.length !== null) {
      setData(onlyEnableList);
    } else {
      setData(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilterFunction = (text: string) => {
    if (text.length !== null) {
      const newData = data.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearchText(text);
    } else {
      setData(data);
      setSearchText(text);
    }
  };

  const handleEnableItem = async (item: any) => {
    const disabledItems = await AsyncStorage.getItem("disabledItems");

    if (disabledItemsList.includes(item)) {
      const restList = disabledItemsList.filter((_, index) => _ !== item);
      setDisabledItemsList(restList);

      await AsyncStorage.setItem("disabledItems", JSON.stringify(restList));
    } else {
      const allDisabledItems = disabledItems
        ? await JSON.parse(disabledItems)
        : [];
      const newItem = [...allDisabledItems, item];
      await AsyncStorage.setItem("disabledItems", JSON.stringify(newItem));
      setDisabledItemsList((prev) => [...prev, item]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <TextInput
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "black",
            height: 45,
            padding: 10,
          }}
          value={searchText}
          onChangeText={(text) => {
            if (text.length === 0) {
              fetchData();
            }
            searchFilterFunction(text);
          }}
          placeholder="Search here..."
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <CardView
              item={item}
              index={index}
              handleEnableItem={handleEnableItem}
              disabledItemsList={disabledItemsList}
              isEnabled
            />
          );
        }}
      />

      <Pressable
        onPress={() => navigation.navigate("DisableItems" as never)}
        style={{
          backgroundColor: "coral",
          margin: 10,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          padding: 10,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <Text>{"Go to Disable Items"}</Text>
      </Pressable>
    </SafeAreaView>
  );
};
