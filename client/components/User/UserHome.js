import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Content, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { UserCurrentLocation, UserDestination } from './'
import { getCurrentLocation, getDestination } from '../../store'

const styles = StyleSheet.create({
  button: {
    marginTop: 50
  }
})

class UserSurvey extends Component {

  componentDidMount (){
    const isSimulator = true;
    this.props.getCurrentLocation(isSimulator)
  }

  handleSelect = (str) => {
    this.props.getRoutePriorityType(str)
  }

  handleOnDestinationSearch = (data, details) => {
    this.props.getDestination(data)
  }

  // isSimulator = () => {
  //   return DeviceInfo.isEmulator();
  // }

  handleSubmit = () => {
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
          block info
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSurvey)
