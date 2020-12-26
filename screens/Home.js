import React from 'react';
import { Store } from '../Provider';
import { SafeAreaView, View, StyleSheet, FlatList, Pressable, StatusBar, Text } from "react-native";
import ListItem from '../components/ListItem';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import { logoutUser, getTodoItems, deleteTodoItem } from "../actions";
import isEmpty from "../utils/isEmpty";

const Home = ({ navigation }) => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    getTodoItems(dispatch);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable style={{ marginLeft: 25 }} onPress={async () => {
          await logoutUser(dispatch);
          await getTodoItems(dispatch);
        }}>
          <Icon
            name={'logout'}
            color={'#fff'}
            size={24}
            style={styles.logoutIcon}
          />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: '#cb84ff',
      },
      headerTitleStyle: {
        color: '#fff'
      }
    })
  });

  const renderItem = ({ item }) => (
    <ListItem
      text={item.title}
      style={styles.listItem}
      onDelete={async () => await deleteTodoItem(item, dispatch)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
      />

      {
        !isEmpty(state.todoItems)
          ?
          <View style={styles.container}>
            <FlatList
              contentContainerStyle={styles.list}
              data={state.todoItems}
              renderItem={renderItem}
              keyExtractor={(item, i) => `${item._id}`}
            />
          </View>
          :
          <View style={styles.noTodosView}>
            <Text style={styles.noTodosTxt}>No to-do's, go create some!</Text>
          </View>
      }

      <View style={styles.btnContainer}>
        <Button
          text={'Add Item'}
          onPress={() => navigation.navigate('Create')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    alignItems: 'center',
    paddingTop: 30,
  },
  listItem: {
    marginBottom: 15,
  },
  btnContainer: {
    paddingTop: 15,
    marginBottom: 20,
    alignItems: 'center'
  },
  logoutIcon: {
    transform: [{ rotate: '180deg' }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  noTodosView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noTodosTxt: {
    color: '#cb84ff',
    fontSize: 20,
    fontWeight: '600'
  }
});

export default Home;