import React from 'react'
import { Container, Content, Footer, FooterTab, Button, Text, List, H3 } from 'native-base'
import { TransitResultCard, WalkingResultCard } from '../Transportation'

const RouteOptions  = (props) => {
  const { navigation } = props
  const userState = navigation.getParam('userState', 'default value')
  const currentLocation = userState.currentLocation
  const address = userState.destination.description

  return (
    <Container>
      <Content>

          <H3>Where You're Going</H3>
          <Text>{address}</Text>

          <List>

            <TransitResultCard
              currentLocation={currentLocation}
              destination={address}
            />

            <WalkingResultCard
              currentLocation={currentLocation}
              destination={address}
            />

          </List>

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
