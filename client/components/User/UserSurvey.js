import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Content, Button, Text, Footer } from 'native-base'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import { UserCurrentLocation, UserPriority, UserDestination } from './'
import { getCurrentLocation, getRoutePriorityType, getDestination } from '../../store'

const styles = StyleSheet.create({
  button: {
    marginTop: 50
  }
})

class UserSurvey extends Component {
  constructor(){
    super()
    this.state = {
    }
  }

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

  render() {
    return (
      <Container>

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


          <UserPriority
            active={this.props.priority}
            selection={this.handleSelect}
          />

          { this.props.errorMessage &&
            <Text>{this.props.errorMessage}</Text>
          }

          <Button style={styles.button}>
            <Text>Get Route Options</Text>
          </Button>

        </Content>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.UserReducer.currentLocation,
    errorMessage: state.UserReducer.errorMessage,
    priority: state.UserReducer.priority
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: (bool) => {
      dispatch(getCurrentLocation(bool))
    },
    getRoutePriorityType: (str) => {
      dispatch(getRoutePriorityType(str))
    },
    getDestination: (data) => {
      dispatch(getDestination(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSurvey)
