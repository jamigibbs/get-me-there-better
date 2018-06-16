import React, { Component } from 'react'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { getNearestDivvyStation, getTravelTime } from '../../store'
import { Content, ListItem, Thumbnail, Right, Left, Body, Text, Button } from 'native-base'
import { convertSecondsToMin } from '../../utils/helpers'

class BikingResultCard extends Component {

  componentDidMount (){
    const destination = this.props.destination
    const origin = this.props.currentLocation
    const current = origin.coords
    const lat = current.latitude
    const lng = current.longitude

    this.props.getNearestDivvyStation(lat, lng)
  }

  componentDidUpdate () {
    const nearestDivvy = this.props.nearestDivvy
    const origin = this.props.currentLocation
    const destination = this.props.destination

    this.props.getTimeToDivvyStation(origin, nearestDivvy.coord, 'walking', true)
    this.bikingTravelTime(destination)
  }

  bikingTravelTime = async (destination) => {
    const nearestDivvy = this.props.nearestDivvy
    await this.props.getBikingTravelTime(nearestDivvy.coord, destination, 'biking', true)
  }

  loadDivvyWalkingDirections = () => {
    const source = this.props.currentLocation.coords
    const divvyCoord = this.props.nearestDivvy.coord

    const currentLat = source.latitude
    const currentLng = source.longitude
    const divvyLat = divvyCoord.lat
    const divvyLng = divvyCoord.lng

    const mapDirectionsTransit = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${divvyLat},${divvyLng}&travelmode=walking`

    return Linking.openURL(mapDirectionsTransit)
  }

  render(){
    const { nearestDivvy, timeToStation, travelTimeSeconds } = this.props
    return (
      <Content>

      <ListItem avatar>
        <Left>
          <Thumbnail
            large square
            source={require('../../../assets/divvy_logo.png')}
          />
        </Left>
        <Body>
          <Text>Bike with Divvy</Text>
          {
            <Content>
              <Text note>
                Cost: ~$3.00
              </Text>
              { nearestDivvy &&
                <Text note>
                  Walk to Station: {'\n'} ~ {convertSecondsToMin(timeToStation)}
                </Text>
              }
              {
                travelTimeSeconds &&
                <Text note>
                  Travel time: {'\n'} ~ {convertSecondsToMin(travelTimeSeconds)}
                </Text>
              }
            </Content>
          }
        </Body>
        <Right>
          { this.props.nearestDivvy.coord &&
            <Button
              onPress={this.loadDivvyWalkingDirections}
              transparent>
              <Text>Divvy Station</Text>
            </Button>
          }
        </Right>
      </ListItem>

      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nearestDivvy: state.DirectionsReducer.biking.nearestDivvy,
    timeToStation: state.DirectionsReducer.biking.timeToStation,
    travelTimeSeconds: state.DirectionsReducer.biking.travelTimeSeconds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNearestDivvyStation: async (lat, lng) => {
      dispatch(await getNearestDivvyStation(lat, lng))
    },
    getTimeToDivvyStation: (origin, destination, mode, divvy) => {
      dispatch(getTravelTime(origin, destination, mode, divvy))
    },
    getBikingTravelTime: (divvyStation, destination, mode, divvy) => {
      dispatch(getTravelTime(divvyStation, destination, mode, divvy))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BikingResultCard)
