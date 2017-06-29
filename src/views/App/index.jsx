import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import AppHeader from './AppHeader';

export default class App extends Component {
  render() {
    return (
      <Container text className='app'>
          <AppHeader/>
        </Container>
      )
  }
}


