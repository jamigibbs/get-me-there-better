import React from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import store from './client/store'
import { StyleSheet } from 'react-native'
import { Container, Header, Left, Right, Title, Body } from 'native-base'
import { UserSurvey, RouteOptions } from './client/components'

const RootStack = createStackNavigator(
  {
    Home: UserSurvey,
    RouteOptions: RouteOptions
  },
  {
    initialRouteName: 'Home'
  }
)

const App = () =>  {
    return (
      <Provider store={store}>
        <Container>

          <Header>
            <Left />
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>

          <RootStack />

        </Container>
      </Provider>
    )
}

export default App
