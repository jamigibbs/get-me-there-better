import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Button, Text, List, Card, CardItem, H3 } from 'native-base'
import { TransitResultCard, WalkingResultCard, BikingResultCard, RidesharingCard } from '../Transportation'
import { UserPriority } from '../User'
import { getRoutePriorityType, setRecommendedRoute } from '../../store'

class RouteOptions extends Component {

  handleSelect = (str) => {
    this.props.setRoutePriorityType(str)

    if (str === 'cost'){
      this.routeCostAnalysis()
    } else if (str === 'time'){
      this.routeTimeAnalysis()
    }
  }

  getRouteData = () => {
    const { biking, walking, transit, rideShare } = this.props.routesInfo
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
        },
        rideShare: {
          costCents: rideShare.costCents,
          totalTime: rideShare.travelTimeSeconds + rideShare.waitTimeSeconds
        }
      }
    ]

    return data
  }

  routeCostAnalysis = () => {
    const data = this.getRouteData()
    let route = ''

    if (data[0].walking.totalTime < 1800) {
      route = 'walking'
    } else if (data[0].transit.totalTime < data[0].bikingDivvy.totalTime) {
      route = 'transit'
    } else if (data[0].bikingDivvy.totalTime < data[0].transit.totalTime && data[0].bikingDivvy.totalTime < data[0].walking.totalTime) {
      route = 'biking'
    }

    this.props.setRecommendedRoute(route)
  }

  routeTimeAnalysis = () => {
    const data = this.getRouteData()
    let route = ''

    if (data[0].rideShare.totalTime < data[0].transit.totalTime) {
      route = 'rideshare'
    } else if (data[0].transit.totalTime < data[0].rideShare.totalTime) {
      route = 'transit'
    } else if (data[0].bikingDivvy.totalTime < data[0].rideShare.totalTime){
      route = 'biking'
    } else if (data[0].walking.totalTime < data[0].rideShare.totalTime || data[0].walking.totalTime < data[0].transit.totalTime || data[0].walking.totalTime < data[0].bikingDivvy.totalTime) {
      route = 'walking'
    } else {
      route = 'biking'
    }

    this.props.setRecommendedRoute(route)
  }

  render () {

    const { navigation, isFetching, priority } = this.props
    const userState = navigation.getParam('userState', 'default value')

    const currentLocation = userState.currentLocation
    const address = userState.destination.description

  return (
    <Container style={{backgroundColor: 'white'}}>

      <UserPriority
        active={priority}
        selection={this.handleSelect}
      />

      <Content>

        <Card>
          <CardItem header>
            <H3>Where You're Going</H3>
          </CardItem>
          <CardItem>
            <Text>{address}</Text>
          </CardItem>
        </Card>

        <List>

          <TransitResultCard
            currentLocation={currentLocation}
            destination={address}
            priority={priority}
          />

          <WalkingResultCard
            currentLocation={currentLocation}
            destination={address}
            priority={priority}
          />

          <BikingResultCard
            currentLocation={currentLocation}
            destination={address}
            priority={priority}
          />

          <RidesharingCard
            currentLocation={currentLocation}
            destination={address}
            priority={priority}
          />

        </List>

      </Content>

    </Container>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    priority: state.UserReducer.priority,
    routesInfo: state.DirectionsReducer,
    isFetching: state.DirectionsReducer.isFetching,
    recommended: state.DirectionsReducer.recommended
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoutePriorityType: (str) => {
      dispatch(getRoutePriorityType(str))
    },
    setRecommendedRoute: (route) => {
      dispatch(setRecommendedRoute(route))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteOptions)
