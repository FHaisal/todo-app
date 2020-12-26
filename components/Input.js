import React from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ title, value, onChangeText, placeholder, style, secureTextEntry, error }) => {
  const colorStyle = error ? styles.error : styles.regular;

  return (
    <View style={style}>
      <Text style={{ ...styles.title, ...colorStyle }}>{ title }</Text>

      <TextInput
        style={{ ...styles.input, ...colorStyle }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={error ? '#ac0003' : undefined}
      />

      {
        error
        &&
        <Text style={styles.error}>{ error }</Text>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: 280,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    color: '#707070'
  },
  error: {
    marginTop: 5,
    color: '#ac0003',
    shadowColor: '#ac0003'
  },
  regular: {
    color: '#707070',
    shadowColor: '#000'
  }
});

Input.defaultProps = {
  title: 'Title',
  placeholder: 'Placeholder...',
  secureTextEntry: false,
};

export default Input;