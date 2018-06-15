import React from 'react'
import { Header } from 'native-base'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import app from '../../../app.json'

const styles = {
  locationSearch: {
    container: {

    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 70,
      color: '#5d5d5d',
      fontSize: 16,
      top: -8
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
    listView: {
      backgroundColor: 'white'
    }
  }
}

const chicagoLocation = { latitude: 41.8781, longitude: -87.6298 }

const UserDestination  = (props) => {
  return (

    <GooglePlacesAutocomplete
      placeholder="Enter Destination"
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

  )
}

export default UserDestination
