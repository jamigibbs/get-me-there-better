import React from 'react'
import { StyleSheet } from 'react-native'
import { Content, Card, CardItem, Body, H3 } from 'native-base'
import { MapView } from 'expo'

const UserCurrentLocation  = (props) => {
  const { lat, lng } = props
  const { Marker } = MapView

  const location = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0,
    longitudeDelta: 0.0221
  }

  return (
    <Content>
      <H3>Current Location</H3>
      <Card>
        <CardItem>
          <Body>
            <MapView
              style={{ flex: 1, alignSelf: 'stretch', height: 150 }}
              region={location}
              provider={MapView.PROVIDER_GOOGLE}
            >
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
                title="Your Current Location"
              />
            </MapView>
          </Body>
        </CardItem>
      </Card>
    </Content>
  )
}

export default UserCurrentLocation
