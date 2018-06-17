import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
// import DeviceInfo from 'react-native-device-info'
import { Content, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import Expo from 'expo'
import { UserCurrentLocation, UserDestination } from './'
import { getCurrentLocation, getDestination, setRecommendedRoute, getRoutePriorityType } from '../../store'

const styles = StyleSheet.create({
  button: {
    marginTop: 50
  }
})

class UserHome extends Component {

  componentDidMount (){
    let bool = false
    let deviceSerial = 0

    try {
      console.log('Expo.Constants.appOwnership', Expo.Constants.appOwnership)
      if (Expo.Constants.appOwnership == 'expo') {
        console.log('Running in expo')
        bool = !bool
        deviceSerial = Expo.Constants.deviceId;
      } else {
        var DeviceInfo = require('react-native-device-info')
        deviceSerial = DeviceInfo.getUniqueID()
      }
      console.log('DEVICE ID FOUND: ', deviceSerial);
    } catch (e) {
      console.log('error reading device ID');
      deviceSerial = 1
    }

    this.props.getCurrentLocation(bool)
  }

  handleSelect = (str) => {
    this.props.getRoutePriorityType(str)
  }

  handleOnDestinationSearch = (data, details) => {
    this.props.getDestination(data)
  }

  handleSubmit = () => {
    this.props.setRecommendedRoute('')
    this.props.setRoutePriority('')

    this.props.navigation.navigate('RouteOptions', {
      userState: this.props.userState
    })
  }

  render() {
    return (

      <Content>

        { this.props.currentLocation.coords &&
            <UserCurrentLocation
              lat={this.props.currentLocation.coords.latitude}
              lng={this.props.currentLocation.coords.longitude}
            />
        }

        { this.props.currentLocation.coords &&
          <UserDestination
            onDestinationSearch={this.handleOnDestinationSearch}
            lat={this.props.currentLocation.coords.latitude}
            lng={this.props.currentLocation.coords.longitude}
          />
        }

        { this.props.errorMessage &&
          <Text>{this.props.errorMessage}</Text>
        }

        <Button
          full info
          onPress={this.handleSubmit}
          style={styles.button}
        >
          <Text>Get Route Options</Text>
        </Button>

      </Content>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.UserReducer.currentLocation,
    errorMessage: state.UserReducer.errorMessage,
    userState: state.UserReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: (bool) => {
      dispatch(getCurrentLocation(bool))
    },
    getDestination: (data) => {
      dispatch(getDestination(data))
    },
    setRecommendedRoute: (route) => {
      dispatch(setRecommendedRoute(route))
    },
    setRoutePriority: (str) => {
      dispatch(getRoutePriorityType(str))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
