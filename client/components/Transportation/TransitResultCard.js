import React, { Component } from 'react'
import { Linking } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Right, Left, Body, Text, H3, Button, Badge } from 'native-base'

const TransitResultCard = ({ destination, currentLocation }) => {

  const currentLat = currentLocation.coords.latitude
  const currentLng = currentLocation.coords.longitude

  const mapDirectionsTransit = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destination}&travelmode=transit`

  return (
    <Container>
      <Header />
      <Content>

        <H3>Where You're Going</H3>
        <Text>{destination}</Text>

        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require('../../img/cta_logo.jpg')} />
            </Left>
            <Body>
              <Text>CTA Transit <Badge success><Text>Best</Text></Badge> </Text>
              <Text note>$2.50 - Travel Time: 45 min</Text>
            </Body>
            <Right>
              <Button
                onPress={() => Linking.openURL(mapDirectionsTransit)}
                transparent>
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
        </List>

      </Content>
    </Container>
  )
}

export default TransitResultCard
