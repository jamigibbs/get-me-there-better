import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Content, Card, CardItem, Body, H3 } from 'native-base'
import { MapView } from 'expo'

const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundMap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: ScreenHeight
  }
})

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
    <MapView
      style={styles.backgroundMap}
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
  )
}

export default UserCurrentLocation
