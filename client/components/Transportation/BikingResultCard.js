import React, { Component } from 'react'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { getNearestDivvyStation } from '../../store'
import { Content, ListItem, Thumbnail, Right, Left, Body, Text, Button } from 'native-base'
import { convertSecondsToMin } from '../../utils/helpers'

class BikingResultCard extends Component {

  componentDidMount(){
    const current = this.props.currentLocation.coords
    const lat = current.latitude
    const lng = current.longitude
    this.props.getNearestDivvyStation(lat, lng)
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
    const travelTimeSeconds = 2000

    const { nearestDivvy } = this.props

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
              <Text note>
                Travel Time: {'\n'} ~ {convertSecondsToMin(travelTimeSeconds)}
              </Text>
            </Content>
          }
        </Body>
        <Right>
          { this.props.nearestDivvy.coord &&
            <Button
              onPress={this.loadDivvyWalkingDirections}
              transparent>
              <Text>View</Text>
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
    nearestDivvy: state.DirectionsReducer.biking.nearestDivvy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNearestDivvyStation: (lat, lng) => {
      dispatch(getNearestDivvyStation(lat, lng))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BikingResultCard)
