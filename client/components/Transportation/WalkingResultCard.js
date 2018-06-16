import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking } from 'react-native'
import { getTravelTime } from '../../store'
import { Spinner, Content, ListItem, Thumbnail, Right, Left, Body, Text, Button, Badge } from 'native-base'
import { convertSecondsToMin } from '../../utils/helpers'

class WalkingResultCard extends Component {

  componentDidMount () {
    const origin = this.props.currentLocation
    const destination = this.props.destination
    this.props.getWalkingTravelTime(origin, destination, 'walking')
  }

  render(){
    const { travelTimeSeconds, costCents, isFetching, timeRecommended, priority, recommended } = this.props
    const currentLat = this.props.currentLocation.coords.latitude
    const currentLng = this.props.currentLocation.coords.longitude

    const mapDirectionsTransit = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${this.props.destination}&travelmode=walking`

    if ( isFetching ) {
      return <Spinner />
    }

    return (
        <Content style={{marginBottom: 20}}>

            <ListItem avatar>
              <Left>
                <Thumbnail
                  square
                  small
                  source={require('../../../assets/walking_logo.png')}
                />
              </Left>
              <Body>
                <Text>Walking
                { recommended === 'walking' &&
                  <Badge success>
                    <Text>Best</Text>
                  </Badge>
                }
                </Text>
                { this.props.travelTimeSeconds &&
                  <Content>
                    <Text note>
                      Cost: Free
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
                  <Text>View Route</Text>
                </Button>
              </Right>
            </ListItem>

        </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    travelTimeSeconds: state.DirectionsReducer.walking.travelTimeSeconds,
    isFetching: state.DirectionsReducer.isFetching,
    recommended: state.DirectionsReducer.recommended
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWalkingTravelTime: (origin, destination, mode) => {
      dispatch(getTravelTime(origin, destination, mode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkingResultCard)
