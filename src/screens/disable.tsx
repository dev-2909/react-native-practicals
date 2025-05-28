import React from "react";
import { Text, View, FlatList, Image } from "react-native";

export const DisableDataScreen = ({route}) => {
  const data = route?.params?.data;
  console.log(data)

  return (
    <View style={{ flex: 1, padding: 24 }}>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
          }}
        >
          <FlatList
            data={data?.filter((item)=>!item?.isSelected)}
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
