import React, { Component } from 'react'
import { Container, Content, Button, Text } from 'native-base'
import DeviceInfo from 'react-native-device-info'
import { Location, Permissions } from 'expo'
import { UserCurrentLocation, UserPreference, UserDestination } from './'

const demoFSA = {
  coords:  {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 41.895266,
    longitude: -87.639035,
    speed: -1,
  },
  timestamp: 1528996324016.522
}

export default class UserSurvey extends Component {
  constructor(){
    super()
    this.state = {
      currentLocation: demoFSA,
      errorMessage: null,
      priority: '',
      destination: {}
    }
  }

  componentDidMount(){
    if (!this.isSimulator) {
      this.getLocationAsync()
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ currentLocation: location });
  }

  isSimulator() {
    return DeviceInfo.isEmulator();
  }

  handleSelect = (str) => {
    this.setState({
      priority: str
    })
  }

  handleOnDestinationSearch = (data, details) => {
    this.setState({
      destination: data
    })
  }

  render() {
    return (
      <Container>
        <Content>

          { this.state.currentLocation.coords &&
            <UserDestination
              onDestinationSearch={this.handleOnDestinationSearch}
              lat={this.state.currentLocation.coords.latitude}
              lng={this.state.currentLocation.coords.longitude}
            />
          }

          <UserPreference active={this.state.priority} selection={this.handleSelect} />

            { this.state.errorMessage &&
              <Text>{this.state.errorMessage}</Text>
            }

            { this.state.currentLocation.coords &&
              <Content>
                <UserCurrentLocation
                  lat={this.state.currentLocation.coords.latitude}
                  lng={this.state.currentLocation.coords.longitude}
                />
              </Content>
            }

          <Content>

            <Button full info style={{ marginTop: 20}}>
              <Text>Get Route Options</Text>
            </Button>

          </Content>

        </Content>

      </Container>
    );
  }
}
