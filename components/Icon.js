import React from 'react';
import { Text, Image, View, StyleSheet } from "react-native";

const Icon = ({ text, style }) => {
  return (
    <View style={{ ...style, ...styles.container }}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.img}
      />

      <Text style={styles.txt}>{ text }</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 128,
    height: 128
  },
  txt: {
    color: '#cb84ff',
    fontSize: 32,
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
  }
});

Icon.defaultProps = {
  text: 'To-Do App'
};

export default Icon;