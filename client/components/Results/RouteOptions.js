import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Button, Text, List, H3, Spinner } from 'native-base'
import { TransitResultCard, WalkingResultCard, BikingResultCard } from '../Transportation'
import { UserPriority } from '../User'
import { getRoutePriorityType } from '../../store'

class RouteOptions extends Component {

  handleSelect = (str) => {
    this.props.setRoutePriorityType(str)
  }

  getRouteData = () => {
    const { biking, walking, transit } = this.props.routesInfo
    const data = [
      {
        bikingDivvy: {
          totalTime: biking.timeToStation + biking.travelTimeSeconds,
          cost: biking.costCents
        },
        walking: {
          totalTime: walking.travelTimeSeconds,
          cost: walking.costCents
        },
        transit: {
          totalTime: transit.travelTimeSeconds,
          cost: transit.costCents
        }
      }
    ]


    if (data[0].walking.totalTime < 1800) {
      return 'walking is best choice'
    }

    if (data[0].transit.totalTime < data[0].bikingDivvy.totalTime) {
      return 'transit is the best choice'
    }

    if (data[0].bikingDivvy.totalTime < data[0].transit.totalTime && data[0].bikingDivvy.totalTime < data[0].walking.totalTime) {
      return 'biking is the best choice'
    }
  }

  render () {

    const { navigation, isFetching } = this.props
    const userState = navigation.getParam('userState', 'default value')
    const currentLocation = userState.currentLocation
    const address = userState.destination.description

  return (
    <Container style={{backgroundColor: 'white'}}>

      <UserPriority
        active={this.props.priority}
        selection={this.handleSelect}
      />

      <Content>

        <H3>Where You're Going</H3>
        <Text>{address}</Text>

        <List>

          <TransitResultCard
            currentLocation={currentLocation}
            destination={address}
          />

          <WalkingResultCard
            currentLocation={currentLocation}
            destination={address}
          />

          <BikingResultCard
            currentLocation={currentLocation}
            destination={address}
          />

        </List>

      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    priority: state.UserReducer.priority,
    routesInfo: state.DirectionsReducer,
    isFetching: state.DirectionsReducer.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoutePriorityType: (str) => {
      dispatch(getRoutePriorityType(str))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteOptions)
