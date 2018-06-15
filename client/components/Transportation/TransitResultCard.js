import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking } from 'react-native'
import { getTransitTravelTime } from '../../store'
import { Container, Header, Content, List, ListItem, Thumbnail, Right, Left, Body, Text, H3, Button, Badge } from 'native-base'
import { convertSecondsToMin, convertCentsToDollar} from '../../utils/helpers'

class TransitResultCard extends Component {

  componentDidMount () {
    const origin = this.props.currentLocation
    const destination = this.props.destination
    this.props.getTransitTravelTime(origin, destination)
  }

  render(){

    const { travelTimeSeconds, costCents } = this.props
    const currentLat = this.props.currentLocation.coords.latitude
    const currentLng = this.props.currentLocation.coords.longitude

    const mapDirectionsTransit = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${this.props.destination}&travelmode=transit`

    return (
      <Container>
        <Header />
        <Content>

          <H3>Where You're Going</H3>
          <Text>{this.props.destination}</Text>

          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../img/cta_logo.jpg')} />
              </Left>
              <Body>
                <Text>CTA Transit <Badge success><Text>Best</Text></Badge> </Text>
                { this.props.travelTimeSeconds &&
                  <Content>
                    <Text note>
                      Cost: {convertCentsToDollar(costCents)}
                    </Text>
                    <Text note>
                      Travel Time: {'\n'} {convertSecondsToMin(travelTimeSeconds)}
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
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    travelTimeSeconds: state.TransitReducer.travelTimeSeconds,
    costCents: state.TransitReducer.costCents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransitTravelTime: (origin, destination) => {
      dispatch(getTransitTravelTime(origin, destination))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitResultCard)
