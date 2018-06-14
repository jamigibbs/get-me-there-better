import React from 'react'
import { Container, Content, Item, Input, H3 } from 'native-base'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import app from '../../../app.json'

const styles = {
  locationSearch: {
    container: {
      position: 'relative'
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
    listView: {
      // position: 'absolute',
      // height: 300
    }
  }
}

const chicagoLocation = { latitude: 41.8781, longitude: -87.6298 }

const UserDestination  = (props) => {
  return (
    <Content>
      <H3 style={{marginTop: 20, marginBottom: 20}}>Where to?</H3>
      {/* <Item regular>
        <Input placeholder="Destination" />
      </Item> */}

      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        returnKeyType="default"
        fetchDetails={false}
        definesPresentationContext={false}
        query={{
          key: app.expo.ios.config.googlePlacesApiKey,
          location: chicagoLocation,
          language: 'en',
          types: 'address'
        }}
        onPress={(data, details = null) => {
          props.onDestinationSearch(data, details)
        }}
        styles={styles.locationSearch}
        currentLocation={false}
      />

    </Content>
  )
}

export default UserDestination
