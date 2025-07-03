import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    width: "100%",
    height: 100,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  imageView: {
    width: "30%",
    height: "95%",
    backgroundColor: "lightgray",
  },
  dataView: {
    width: "70%",
    height: "95%",
    paddingHorizontal: 10,
  },
  listStyle: {
    paddingTop: 10,
  },
  leftView: {
    width: "50%",
  },
  buttonView: {
    backgroundColor: "#3944BC",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
