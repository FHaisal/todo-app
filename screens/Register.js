import React from 'react';
import { Store } from '../Provider';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Pressable, Keyboard, Platform, StatusBar } from "react-native";
import Icon from '../components/Icon';
import Input from '../components/Input';
import Button from '../components/Button';

import { registerUser, setErrors } from "../actions";

const Register = ({ navigation }) => {
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
            text={'Register'}
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
            error={state.errors.email}
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
            error={state.errors.password}
          />

          <Button
            text={'Register'}
            style={{ marginBottom: 15 }}
            onPress={async () => {
              setErrors(dispatch);
              await registerUser({ email, password }, dispatch);
            }}
          />

          <Button
            text={'Back'}
            bgColor={'#707070'}
            bgColorPress={'#919191'}
            onPress={() => navigation.navigate('Login')}
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

export default Register;