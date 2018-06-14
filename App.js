import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Left, Right, Title, Body } from 'native-base'
import { UserSurvey } from './client/components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Container>

        <Header>
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <UserSurvey />
        </Content>

      </Container>
    )
  }
}
