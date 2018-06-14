import React from 'react'
import { Container, Content, ListItem, CheckBox, Text, Body, H3 } from 'native-base'

const UserPreference  = (props) => {

  return (
    <Container style={{ height: 200}}>
    <H3 style={{marginTop: 50}}>Priority</H3>
    <Content>
      <ListItem>
        <CheckBox
          checked={props.active === 'cost'}
          onPress={() => props.selection('cost')}
        />
        <Body>
          <Text>Cost</Text>
        </Body>
      </ListItem>
      <ListItem>
      <CheckBox
          checked={props.active === 'time'}
          onPress={() => props.selection('time')}
        />
        <Body>
          <Text>Time</Text>
        </Body>
      </ListItem>
    </Content>
    </Container>
  )
}

export default UserPreference
