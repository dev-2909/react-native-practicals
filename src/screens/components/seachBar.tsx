import React, { useState } from "react";
import { TextInput, View } from "react-native";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          width: "95%",
          padding: 10,
          alignSelf: "center",
          marginBottom: 20,
        }}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default SearchBar;
