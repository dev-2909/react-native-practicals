import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Switch, Image } from "react-native";

export const DisableDataScreen = () => {
  const [data, setData] = useState([]);
  const toggleSwitch = (id) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setData(updatedData);
  };
  console.log(data)

  useEffect(() => {
    const data = fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      
      .then((json) => {
        setData(json.map((item)=>({ ...item, isSelected: true })))
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ marginTop: 20 }} />}
            renderItem={({ item }) => {
              // console.log(item?.thumbnailUrl);
              return(
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  padding: 20,
                  borderWidth: 1,
                }}
              >
                <Image
                  source={{ uri: item?.thumbnailUrl }}
                  style={{ height: 50, width: 50,backgroundColor:'red' }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 18, textAlign: "center" }}>
                        id:
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {item?.id}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 18, textAlign: "center" }}>
                        albumId:
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {item?.albumId}
                      </Text>
                    </View>
                  </View>

                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={item?.isSelected ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>toggleSwitch(item?.id)}
                    value={item?.isSelected}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                    title:
                  </Text>
                  <Text style={{ marginLeft: 10, fontSize: 18, flex: 1 }}>
                    {item?.title}
                  </Text>
                </View>
              </View>
            )}}
          />
        </View>
    </View>
  );
};
