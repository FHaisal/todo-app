import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListItem = ({ text, onDelete, style }) => {
  const [iconColor, setIconColor] = React.useState('#BE0000');

  return (
    <View style={{ ...styles.container, ...style }}>
      <Text style={styles.txt}>{ text }</Text>

      <Pressable
        onPress={onDelete}
        onPressIn={() => setIconColor('#EB0000')}
        onPressOut={() => setIconColor('#BE0000')}
      >
        <Icon name={'delete-forever'} size={32} color={iconColor} />
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
    width: 320,
    height: 60,
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
    flex: 1,
    color: '#707070',
    fontSize: 16,
  }
});

ListItem.defaultProps = {
  text: 'List item',
};

export default ListItem;
