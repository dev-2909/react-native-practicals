import React, { useMemo, useState, useCallback } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { togglePhoto } from "../redux/slice/photosSlice";
import PhotoCard from "../components/PhotoCard";
import { globalStyle } from "../module/style/style";

const PAGE_SIZE = 20;

const DisabledPhotosScreen = () => {
  const dispatch = useDispatch();
  const { all, disabled } = useSelector((state) => state.photos);

  const [page, setPage] = useState(1);

  const disabledPhotos = useMemo(() => {
    return all.filter((p) => disabled[`${p.albumId}-${p.id}`]);
  }, [all, disabled]);

  const paginatedPhotos = useMemo(() => {
    return disabledPhotos.slice(0, page * PAGE_SIZE);
  }, [disabledPhotos, page]);

  const handleLoadMore = useCallback(() => {
    if (page * PAGE_SIZE < disabledPhotos.length) {
      setPage((prev) => prev + 1);
    }
  }, [page, disabledPhotos.length]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={paginatedPhotos}
        keyExtractor={(item) => `${item.albumId}-${item.id}`}
        renderItem={({ item }) => (
          <PhotoCard
            photo={item}
            disabled={true}
            onToggle={() =>
              dispatch(togglePhoto({ albumId: item.albumId, id: item.id }))
            }
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => (
          <View style={globalStyle.noDataView}>
            <Text style={globalStyle.noDataText}>No data found</Text>
          </View>
        )}
        ListFooterComponent={() =>
          page * PAGE_SIZE < disabledPhotos.length ? (
            <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
          ) : null
        }
      />
    </View>
  );
};

export default DisabledPhotosScreen;
