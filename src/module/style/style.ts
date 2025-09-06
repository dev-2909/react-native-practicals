import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";

export const globalStyle = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noDataView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  searchView: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
});
