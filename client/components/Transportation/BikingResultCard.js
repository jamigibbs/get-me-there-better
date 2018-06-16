import React, { Component } from 'react'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { getNearestDivvyStation, getTravelTime } from '../../store'
import { Spinner, Content, ListItem, Thumbnail, Right, Left, Body, Text, Button } from 'native-base'
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

  componentDidUpdate (prevProps) {
    if (prevProps.nearestDivvy !== this.props.nearestDivvy) {
      const nearestDivvy = this.props.nearestDivvy
      const origin = this.props.currentLocation
      const destination = this.props.destination

      this.props.getTimeToDivvyStation(origin, nearestDivvy.coord, 'walking', true)
      this.bikingTravelTime(destination)
    }
  }

  bikingTravelTime = async (destination) => {
    const nearestDivvy = this.props.nearestDivvy
    await this.props.getBikingTravelTime(nearestDivvy.coord, destination, 'bicycling', true)
  }

  loadDivvyWalkingDirections = () => {
    const source = this.props.currentLocation.coords
    const divvyCoord = this.props.nearestDivvy.coord
    const origin = `${source.latitude}, ${source.longitude}`
    const destination = `${divvyCoord.lat}, ${divvyCoord.lng}`

    const mapDirectionsWalking = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`

    return Linking.openURL(mapDirectionsWalking)
  }

  loadDivvyBikingDirections = () => {
    const source = this.props.nearestDivvy.coord
    const origin = `${source.lat}, ${source.lng}`
    const destination = this.props.destination

    const mapDirectionsBiking = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=bicycling`

    return Linking.openURL(mapDirectionsBiking)
  }

  render(){
    const { nearestDivvy, timeToStation, travelTimeSeconds, isFetching } = this.props

    if ( isFetching ) {
      return <Spinner />
    }

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
            <Content>
              <Button
                onPress={this.loadDivvyWalkingDirections}
                transparent>
                <Text>To Divvy Station</Text>
              </Button>
              <Button
              onPress={this.loadDivvyBikingDirections}
              transparent>
                <Text>Biking Route</Text>
              </Button>
            </Content>
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
    travelTimeSeconds: state.DirectionsReducer.biking.travelTimeSeconds,
    isFetching: state.DirectionsReducer.isFetching
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
