import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Home extends Component {
  componentWillMount () {
    document.body.classList.add('home-body');

  }
  componentWillUnmount () {
    document.body.classList.remove('home-body');
  }
  render() {
    return (
      <div className="home-text">
        <h1> Welcome to Neu Resume.</h1>
        <h2> Type in your resume information and export it as a PDF document</h2>
        <h2> Resume themes can be updated without reformatting your content. </h2>
        <h2> No more trouble with formatting! </h2>
      </div>
    )
  }
}