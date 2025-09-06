import React, { useState } from "react";
import { View, Text, Image, Switch, StyleSheet } from "react-native";

const PhotoCard = ({ photo, disabled, onToggle }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <View style={styles.cardView}>
      {imageError ? (
        <View style={styles.noImg}>
          <Text style={{ color: "#fff", fontSize: 8 }}>No Image</Text>
        </View>
      ) : (
        <Image
          source={{ uri: photo.thumbnailUrl }}
          style={styles.imgStyle}
          onError={() => setImageError(true)}
        />
      )}

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>ID: {photo.id}</Text>
        <Text>Album: {photo.albumId}</Text>
        <Text numberOfLines={1}>{photo.title}</Text>
      </View>
      <Switch value={!disabled} onValueChange={onToggle} />
    </View>
  );
};
const styles = StyleSheet.create({
  cardView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "98%",
  },
  noImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
});
export default React.memo(PhotoCard);
