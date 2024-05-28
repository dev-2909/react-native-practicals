import { Image, Switch, Text, View } from "react-native";
import { globalStyle } from "../module/style/style";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { getDataList } from "../redux/reducer/usersReducer";
interface itemList {
  thumbnailUrl?: string;
  id?: number;
  title?: string;
  albumId?: number;
  url?: string;
  isToggle?: boolean;
}

interface AlbumItem {
  item?: any;
  list?: any;
  setList?: any;
}

const AlbumItem = ({ item, list, setList }: AlbumItem) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const dispatch = useDispatch();
  const toggleSwitch = async (value: boolean, id: number) => {
    let findIndex = list?.findIndex((item: itemList) => item?.id === id);
    list[findIndex].isToggle = value;
    await AsyncStorage.setItem("listData", JSON.stringify(list));
    setList(list);
    dispatch(getDataList(list));
  };
  return (
    <View style={globalStyle.cardItem}>
      <View style={globalStyle.cardRow}>
        <Image source={{ uri: item?.thumbnailUrl }} height={50} width={50} />
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Text style={globalStyle.titleStyle}>{item?.id}</Text>
          <Text style={globalStyle.titleStyle}>{item?.title}</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={item?.isToggle ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value: boolean) => toggleSwitch(value, item?.id)}
          value={item?.isToggle}
        />
      </View>
    </View>
  );
};

export default AlbumItem;
