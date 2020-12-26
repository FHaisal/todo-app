import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import Icon from '../components/Icon';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Icon />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Splash;