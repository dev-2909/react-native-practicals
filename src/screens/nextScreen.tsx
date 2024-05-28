import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
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

export const NextScreen = () => {
  const navigation = useNavigation();
  const lists = useSelector((state: any) => state.users.lists);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={lists?.filter((item: any) => item?.isToggle === false)}
        renderItem={({ item, index }) => <AlbumItem item={item} list={lists} />}
      />
    </SafeAreaView>
  );
};
