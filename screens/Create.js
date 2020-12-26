import React from 'react';
import { Store } from '../Provider';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Pressable, Keyboard, Platform, StatusBar } from "react-native";
import Icon from '../components/Icon';
import Input from '../components/Input';
import Button from '../components/Button';
import { saveTodoItem, setErrors } from "../actions";

const Create = ({ navigation }) => {
  const { state, dispatch } = React.useContext(Store);
  const [todo, setTodo] = React.useState('');

  const onCreate = async () => {
    await saveTodoItem(todo, dispatch);
    setTodo('');
  };

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
            text={'Create To-Do'}
            style={{ marginBottom: 20 }}
          />

          <Input
            value={todo}
            onChangeText={value => {
              if (state.errors.todo) setErrors(dispatch, {
                ...state.errors,
                todo: null
              });

              setTodo(value);
            }}
            title={'To-Do'}
            placeholder={'Enter a to-do...'}
            style={{ marginBottom: 20 }}
            error={state.errors.todo}
          />

          <Button
            text={'Create'}
            style={{ marginBottom: 15 }}
            onPress={onCreate}
          />

          <Button
            text={'Back'}
            bgColor={'#707070'}
            bgColorPress={'#919191'}
            onPress={() => navigation.navigate('Home')}
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

export default Create;