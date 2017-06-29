import React, { Component } from 'react';
import $ from 'jquery';
export default class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    var that = this
    $.ajax({
      url: '/schedule/week',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json'
    })
    .then(function(data) {
      that.setState({ data: data })
    })
  }
  render () {
    console.log('yeehaw', this.state)
    return (
      <div className="calendar">nub</div>
    )
  }
}