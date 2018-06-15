import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, ListItem, CheckBox, Text, Body, Card } from 'native-base'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 50
  },
  listItem: {
    backgroundColor: 'white',
    marginLeft: 0,
    paddingLeft: 20
  }
})

const UserPriority  = (props) => {

  return (
    <Card style={styles.container}>
      <ListItem style={styles.listItem}>
        <CheckBox
          checked={props.active === 'cost'}
          onPress={() => props.selection('cost')}
        />
        <Body>
          <Text>Cost</Text>
        </Body>
      </ListItem>
      <ListItem style={styles.listItem}>
      <CheckBox
          checked={props.active === 'time'}
          onPress={() => props.selection('time')}
        />
        <Body>
          <Text>Time</Text>
        </Body>
      </ListItem>
    </Card>
  )
}

export default UserPriority
