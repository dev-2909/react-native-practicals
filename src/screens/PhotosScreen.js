import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Button,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../redux/slice/photosThunks";
import { togglePhoto, setSearch } from "../redux/slice/photosSlice";
import PhotoCard from "../components/PhotoCard";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "../module/style/style";

const PAGE_SIZE = 20;

const PhotosScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { all, disabled, search, loading } = useSelector(
    (state) => state.photos
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const filteredPhotos = useMemo(() => {
    return all.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [all, search]);

  const paginatedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, page * PAGE_SIZE);
  }, [filteredPhotos, page]);

  const handleLoadMore = useCallback(() => {
    if (page * PAGE_SIZE < filteredPhotos.length) {
      setPage((prev) => prev + 1);
    }
  }, [page, filteredPhotos.length]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search by title..."
        value={search}
        onChangeText={(text) => {
          dispatch(setSearch(text));
          setPage(1);
        }}
        style={globalStyle.searchView}
      />

      <Button
        title="Navigate To DisabledPhotosScreen"
        onPress={() => {
          navigation.navigate("DisabledPhotosScreen");
        }}
      />
      <FlatList
        data={paginatedPhotos}
        keyExtractor={(item) => `${item.albumId}-${item.id}`}
        renderItem={({ item }) => (
          <PhotoCard
            photo={item}
            disabled={!!disabled[`${item.albumId}-${item.id}`]}
            onToggle={() =>
              dispatch(togglePhoto({ albumId: item.albumId, id: item.id }))
            }
          />
        )}
        contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View style={globalStyle.noDataView}>
              <Text style={globalStyle.noDataText}>No data Found</Text>
            </View>
          );
        }}
        ListFooterComponent={() =>
          page * PAGE_SIZE < filteredPhotos.length ? (
            <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
          ) : null
        }
      />
    </View>
  );
};

export default PhotosScreen;
