import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking } from 'react-native'
import { getTravelTime } from '../../store'
import { Spinner, Content, ListItem, Thumbnail, Right, Left, Body, Text, Button, Badge } from 'native-base'
import { convertSecondsToMin, convertCentsToDollar } from '../../utils/helpers'

class RidesharingCard extends Component {

  componentDidMount () {
    const origin = this.props.currentLocation
    const destination = this.props.destination
    this.props.getRideshareTravelTime(origin, destination, 'rideshare')
  }

  render(){
    const { travelTimeSeconds, costCents, isFetching, timeRecommended, priority, recommended } = this.props
    const currentLat = this.props.currentLocation.coords.latitude
    const currentLng = this.props.currentLocation.coords.longitude

    const mapDirectionsTransit = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${this.props.destination}&travelmode=driving`

    if ( isFetching ) {
      return <Spinner />
    }

    return (
        <Content>

            <ListItem>
              <Left>
                <Thumbnail square large source={require('../../../assets/lyft_logo.png')} />
              </Left>
              <Body>
                <Text>Rideshare
                { recommended === 'rideshare' &&
                  <Badge success>
                    <Text>Best</Text>
                  </Badge>
                }
                </Text>
                { this.props.travelTimeSeconds &&
                  <Content>
                    <Text note>
                      Cost: {convertCentsToDollar(costCents)}
                    </Text>
                    <Text note>
                      Travel Time: {'\n'} ~ {convertSecondsToMin(travelTimeSeconds)}
                    </Text>
                  </Content>
                }
              </Body>
              <Right>
                <Button
                  onPress={() => Linking.openURL(mapDirectionsTransit)}
                  transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>

        </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    travelTimeSeconds: state.DirectionsReducer.rideShare.travelTimeSeconds,
    costCents: state.DirectionsReducer.rideShare.costCents,
    isFetching: state.DirectionsReducer.isFetching,
    recommended: state.DirectionsReducer.recommended
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRideshareTravelTime: (origin, destination, mode) => {
      dispatch(getTravelTime(origin, destination, mode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesharingCard)
