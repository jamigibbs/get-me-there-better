import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking } from 'react-native'
import { getTravelTime } from '../../store'
import { Spinner, Content, List, ListItem, Thumbnail, Right, Left, Body, Text, H3, Button, Badge } from 'native-base'
import { convertSecondsToMin, convertCentsToDollar} from '../../utils/helpers'

class TransitResultCard extends Component {

  componentDidMount () {
    const origin = this.props.currentLocation
    const destination = this.props.destination
    this.props.getTransitTravelTime(origin, destination, 'transit')
  }

  render(){

    const { travelTimeSeconds, costCents, isFetching } = this.props
    const currentLat = this.props.currentLocation.coords.latitude
    const currentLng = this.props.currentLocation.coords.longitude

    const mapDirectionsTransit = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${this.props.destination}&travelmode=transit`

    if ( isFetching ) {
      return <Spinner />
    }

    return (
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail square large source={require('../../../assets/cta_logo.jpg')} />
              </Left>
              <Body>
                <Text>CTA Transit <Badge success><Text>Best</Text></Badge> </Text>
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
          </List>

        </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    travelTimeSeconds: state.DirectionsReducer.transit.travelTimeSeconds,
    costCents: state.DirectionsReducer.transit.costCents,
    isFetching: state.DirectionsReducer.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransitTravelTime: (origin, destination, mode) => {
      dispatch(getTravelTime(origin, destination, mode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitResultCard)
