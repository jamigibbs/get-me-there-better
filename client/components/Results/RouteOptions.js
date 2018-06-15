import React from 'react'
import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base'
import { TransitResultCard } from '../Transportation'

const RouteOptions  = (props) => {
  const { navigation } = props
  const userState = navigation.getParam('userState', 'default value')
  const currentLocation = userState.currentLocation
  const address = userState.destination.description

  return (
    <Container>
      <Content>
        <TransitResultCard
          currentLocation={currentLocation}
          destination={address}
        />
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default RouteOptions
