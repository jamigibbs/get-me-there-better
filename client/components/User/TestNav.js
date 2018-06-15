import React from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'

const TestNav  = (props) => {
  const { navigation } = props
  const userState = navigation.getParam('userState', 'default value')
  return (
    <Container>
      <Content>
        <Text>
          This is Content Section
        </Text>
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

export default TestNav
