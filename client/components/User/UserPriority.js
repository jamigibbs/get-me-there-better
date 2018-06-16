import React from 'react'
import { Text, Body, Header, Left, Button, Segment, Right } from 'native-base'

const UserPriority  = (props) => {
  const active = true
  return (

    <Header hasSegment>
      <Left />
        <Body>
          <Segment>
            <Button
              first
              {...(props.active === 'cost' ? {active: true} : {})}
              onPress={() => props.selection('cost')}
            >
              <Text>Cost Weighted</Text>
            </Button>
            <Button
              last
              {...(props.active === 'time' ? {active: true} : {})}
              onPress={() => props.selection('time')}
            >
              <Text>Time Weighted</Text>
            </Button>
          </Segment>
        </Body>
      <Right />
    </Header>
  )
}

export default UserPriority
