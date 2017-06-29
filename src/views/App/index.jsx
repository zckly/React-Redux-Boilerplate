import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import AppHeader from './AppHeader';
import Calendar from './Calendar'

export default class App extends Component {
  render() {
    return (
      <Container text className='app'>
          <AppHeader/>
          <Calendar/>
        </Container>
      )
  }
}


