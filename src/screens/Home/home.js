import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { style } from "./styles";
import { fetchPhotosData } from "../../api/fetchPhotos";
import { useDispatch } from "react-redux";
import { addPhotos } from "../../redux/action";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

export const Home = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.Photos);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  let filterEnabledData = [];
  useEffect(() => {
    if (searchQuery === "") {
      const newData = photos?.filter((item) => {
        return item?.isEnabled === true;
      });
      setFilteredData(newData);
    } else {
      const newData = photos?.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = searchQuery.toUpperCase();
        return itemData?.includes(textData) && item.isEnabled === true;
      });
      setFilteredData(newData);
    }
  }, [searchQuery]);
  useEffect(() => {
    fetchPhotosFromAPI();
  }, []);

  const fetchPhotosFromAPI = async () => {
    let updatedPhotos = [];
    if (photos.length === 0) {
      const allPhotos = await fetchPhotosData();
      updatedPhotos = allPhotos.map((photo) => ({
        ...photo,
        isEnabled: true,
      }));
    }else{
      updatedPhotos = photos?.filter((item) => {
        return item.isEnabled === true;
      });
    }
    dispatch(addPhotos(updatedPhotos));
    setFilteredData(updatedPhotos);
  };

  const onEnabledPress = ({ item }) => {
    console.log("onEnabledPres", item);
    filterEnabledData = photos.map((photo) => {
      if (item.id === photo.id && item.albumId === photo.albumId) {
        return {
          ...photo,
          isEnabled: false,
        };
      }
    });
    dispatch(addPhotos(filterEnabledData));
  };
  const renderPhotos = ({ item }) => {
    return (
      <View style={style.cardContainer}>
        <View style={style.imageView}>
          <FastImage
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: item.url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={style.dataView}>
          <View style={{ flexDirection: "row" }}>
            <View style={style.leftView}>
              <Text>{`Id: ${item.id}`}</Text>
              <Text>{`Album Id: ${item.albumId}`}</Text>
            </View>
            <View style={style.leftView}>
              {item.isEnabled ? (
                <TouchableOpacity
                  style={style.buttonView}
                  onPress={() => onEnabledPress({ item })}
                >
                  <Text style={{ color: "white" }}>Enabled</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          <Text>{`Title: ${item.title}`}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      <TextInput
        style={style.searchInput}
        placeholder="Search by title..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        clearButtonMode="always"
      />
      <FlatList
        style={style.listStyle}
        data={filteredData}
        renderItem={renderPhotos}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};
