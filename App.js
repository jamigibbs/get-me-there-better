import React from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import store from './client/store'
import { Container, Header, Left, Body, Title, Right  } from 'native-base'
import { UserHome, RouteOptions } from './client/components'

const RootStack = createStackNavigator(
  {
    Home: UserHome,
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

          <RootStack />

        </Container>
      </Provider>
    )
}

export default App
