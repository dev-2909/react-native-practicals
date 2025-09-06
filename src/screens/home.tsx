import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import PhotosScreen from './PhotosScreen';

export const Home = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <PhotosScreen />
    </SafeAreaView>
  );
};
