// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// const Home = () => {
//   const [DATA, setData] = useState([]);
//   const [activeItems, setActiveItems] = useState({});

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/photos')
//       .then(function (response) {
//         if (response.status == 200) {
//           setData(response.data);
//           // Initialize active state for each item
//           const initialActiveState = {};
//           response.data.forEach(item => {
//             initialActiveState[item.id] = false;
//           });
//           setActiveItems(initialActiveState);
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   const handleToggle = (id) => {
//     setActiveItems(prevState => ({
//       ...prevState,
//       [id]: !prevState[id],
//     }));
//   };

//   const Item = ({ title, description, images, id }) => (
//     <View style={styles.flatlist}>
//       <View style={{ flexDirection: 'row' }}>
//         <Image source={{ uri: images }} style={{ height: 50, width: 50, resizeMode: 'cover' }} />
//         <Text style={{ marginStart: 20, fontSize: 18, color: '#000', alignSelf: 'center' }}>id: {id} </Text>
//       </View>
//       <Text style={styles.title}>Title: {title} </Text>
//       <TouchableOpacity onPress={() => handleToggle(id)}>
//         <Text>{activeItems[id] ? 'Active' : 'InActive'}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderItem = ({ item }) => (
//     <Item
//       title={item.title}
//       description={item.description}
//       images={item.thumbnailUrl}
//       id={item.id}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   title: {
//     fontSize: 20,
//     color: '#000',
//     fontWeight: '500', marginTop: 5
//   },
//   flatlist: {
//     borderWidth: 1,
//     borderColor: 'lightgrey',
//     marginHorizontal: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 8
//   }
// });

// export default Home;

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Home = () => {
  const [DATA, setData] = useState([]);
  const [activeItems, setActiveItems] = useState({});

  useEffect(() => {
    const loadActiveItems = async () => {
      try {
        const activeItemsData = await AsyncStorage.getItem('activeItems');
        if (activeItemsData !== null) {
          setActiveItems(JSON.parse(activeItemsData));
        }
      } catch (error) {
        console.error('Error loading active items:', error);
      }
    };

    loadActiveItems();

    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(function (response) {
        if (response.status == 200) {
          setData(response.data);
          const initialActiveState = {};
          response.data.forEach(item => {
            initialActiveState[item.id] = true; // By default, toggle button is enabled
          });
          setActiveItems(initialActiveState);
          // Save active items to AsyncStorage
          AsyncStorage.setItem('activeItems', JSON.stringify(initialActiveState));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const handleToggle = (id) => {
  //   setActiveItems(prevState => {
  //     const newState = { ...prevState, [id]: !prevState[id] };
  //     // Save updated active items to AsyncStorage
  //     AsyncStorage.setItem('activeItems', JSON.stringify(newState));
  //     return newState;
  //   });
  // };

  const handleToggle = (id) => {
    setActiveItems(prevState => {
      const newState = { ...prevState, [id]: !prevState[id] }
      // if (newState[id]) {
      //   AsyncStorage.setItem('activeItems', JSON.stringify(newState));
      // } else {
      //   delete newState[id];
      //   AsyncStorage.setItem('activeItems', JSON.stringify(newState));
      // }
      return newState;
    });
  };

  const Item = ({ title, images, id }) => {
    if (!activeItems[id]) {
      return null;
    }

    return (
      <View style={styles.flatlist}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: images }} style={{ height: 50, width: 50, resizeMode: 'cover' }} />
          <Text style={{ marginStart: 20, fontSize: 18, color: '#000', alignSelf: 'center' }}>id: {id} </Text>
        </View>
        <Text style={styles.title}>Title: {title} </Text>
        <TouchableOpacity onPress={() => handleToggle(id)}>
          <View style={{ borderWidth: 1, width: 80, alignSelf: 'center' }}>
            <Text style={{ alignSelf: 'center', margin: 5 }}>{activeItems[id] ? 'Active' : 'InActive'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      description={item.description}
      images={item.thumbnailUrl}
      id={item.id}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    marginTop: 5
  },
  flatlist: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8
  }
});

export default Home;
