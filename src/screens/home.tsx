import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  View,
} from "react-native";
import AlbumItem from "../component/AlbumItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyle } from "../module/style/style";
import { debounce, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getDataList } from "../redux/reducer/usersReducer";
import { useNavigation } from "@react-navigation/native";

interface itemList {
  thumbnailUrl: string;
  id: number;
  title: string;
  albumId: number;
  url: string;
  isToggle: boolean;
}

export const Home = () => {
  const navigation = useNavigation();
  const [list, setList] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const lists = useSelector((state: any) => state.users.lists);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!isEmpty(lists)) {
      setList(lists);
    } else {
      axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((response) => {
          setList(
            response?.data.map((item: any) => {
              return { ...item, isToggle: true };
            })
          );
          dispatch(
            getDataList(
              response?.data.map((item: any) => {
                return { ...item, isToggle: true };
              })
            )
          );
          AsyncStorage.setItem(
            "listData",
            JSON.stringify(
              response?.data?.map((item: any) => {
                return { ...item, isToggle: true };
              })
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  };

  const fetchData = (searchTerm: string) => {
    setList(
      list?.filter((item: any) =>
        item.title.toLowerCase().match(searchTerm?.toLowerCase())
      )
    );
  };
  const debounced = React.useCallback(debounce(fetchData, 2000), []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Next")}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TextInput
        style={globalStyle.input}
        placeholder="Search..."
        onChangeText={(text) => {
          if (text !== "") {
            setSearchTerm(text);
            debounced(text);
          } else {
            setSearchTerm("");
            setList(lists);
          }
        }}
        value={searchTerm}
      />
      <FlatList
        data={list?.filter((item: any) => item?.isToggle === true)}
        renderItem={({ item, index }) => (
          <AlbumItem item={item} list={list} setList={setList} />
        )}
      />
    </SafeAreaView>
  );
};
