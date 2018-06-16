import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Button, Text, List, H3 } from 'native-base'
import { TransitResultCard, WalkingResultCard, BikingResultCard } from '../Transportation'
import { UserPriority } from '../User'
import { getRoutePriorityType } from '../../store'

class RouteOptions extends Component {

  handleSelect = (str) => {
    this.props.setRoutePriorityType(str)
  }

  render () {

  const { navigation } = this.props
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
    priority: state.UserReducer.priority
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
