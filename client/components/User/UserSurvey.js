import React, { Component } from 'react'
import { Container, Content, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { UserCurrentLocation, UserPriority, UserDestination } from './'
import { getCurrentLocation, getRoutePriorityType, getDestination } from '../../store'

class UserSurvey extends Component {
  constructor(){
    super()
    this.state = {
    }
  }

  componentDidMount(){
    this.props.getCurrentLocation()
  }

  handleSelect = (str) => {
    this.props.getRoutePriorityType(str)
  }

  handleOnDestinationSearch = (data, details) => {
    this.props.getDestination(data)
  }

  render() {
    return (
      <Container>
        <Content>

          { this.props.currentLocation.coords &&
            <UserDestination
              onDestinationSearch={this.handleOnDestinationSearch}
              lat={this.props.currentLocation.coords.latitude}
              lng={this.props.currentLocation.coords.longitude}
            />
          }

          <UserPriority active={this.props.priority} selection={this.handleSelect} />

            { this.props.errorMessage &&
              <Text>{this.props.errorMessage}</Text>
            }

            { this.props.currentLocation.coords &&
              <Content>
                <UserCurrentLocation
                  lat={this.props.currentLocation.coords.latitude}
                  lng={this.props.currentLocation.coords.longitude}
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

const mapStateToProps = (state) => {
  return {
    currentLocation: state.UserReducer.currentLocation,
    errorMessage: state.UserReducer.errorMessage,
    priority: state.UserReducer.priority
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => {
      dispatch(getCurrentLocation())
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
