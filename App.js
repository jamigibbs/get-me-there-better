import React from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import store from './client/store'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Left, Right, Title, Body } from 'native-base'
import { UserSurvey, TestNav } from './client/components'

const RootStack = createStackNavigator(
  {
    Home: UserSurvey,
    Result: TestNav
  },
  {
    initialRouteName: 'Home'
  }
)

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
      <Provider store={store}>
        <Container>

          <Header>
            <Left/>
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>

          <RootStack />

          {/* <UserSurvey /> */}

        </Container>
      </Provider>
    )
  }
}
