import React from 'react';
import { Store } from "../Provider";
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Pressable, Keyboard, Platform, StatusBar } from "react-native";
import Icon from '../components/Icon';
import Input from '../components/Input';
import Button from '../components/Button';

import {loginUser, registerUser, setErrors} from "../actions";

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const { state, dispatch } = React.useContext(Store);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar
        barStyle={'dark-content'}
      />

      <Pressable
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <SafeAreaView
          style={styles.inner}
        >
          <Icon
            style={{ marginBottom: 20 }}
          />

          <Input
            value={email}
            onChangeText={value => {
              if (state.errors.email) setErrors(dispatch, {
                ...state.errors,
                email: null,
              });

              onChangeEmail(value);
            }}
            title={'Email'}
            placeholder={'Enter your email...'}
            style={{ marginBottom: 20 }}
          />

          <Input
            value={password}
            onChangeText={value => {
              if (state.errors.password) setErrors(dispatch, {
                ...state.errors,
                password: null,
              });

              onChangePassword(value);
            }}
            title={'Password'}
            placeholder={'Enter your password...'}
            style={{ marginBottom: 30 }}
            secureTextEntry
          />

          <Button
            text={'Login'}
            style={{ marginBottom: 15 }}
            onPress={async () => {
              setErrors(dispatch);
              await loginUser({ email, password }, dispatch);
            }}
          />

          <Button
            text={'Register'}
            bgColor={'#707070'}
            bgColorPress={'#919191'}
            onPress={() => navigation.navigate('Register')}
          />
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Login;