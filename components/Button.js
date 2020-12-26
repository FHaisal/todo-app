import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const Button = ({ text, onPress, bgColor, bgColorPress, style }) => {
  const [bg, setBg] = React.useState(bgColor);

  return (
    <Pressable
      style={{ ...style, ...styles.btn, backgroundColor: bg }}
      onPress={onPress}
      onPressIn={() => setBg(bgColorPress)}
      onPressOut={() => setBg(bgColor)}
    >
      <Text style={styles.txt}>{ text }</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  txt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600'
  }
});

Button.defaultProps = {
  text: 'Button',
  onPress: () => null,
  bgColor: '#cb84ff',
  bgColorPress: '#d199ff',
};

export default Button;