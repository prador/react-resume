import React, { Component } from 'react'
import { auth } from './auth'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const style = {
  height: 400,
  width: 350,
  margin: 0,
  padding: '50px 0px',
  textAlign: 'center',
  display: 'inline-block',
};

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = {
    registerError: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.input.getValue(), this.pw.getValue())
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render() {
    return (
      <div className="login-form">
        <Paper style={style} zDepth={3} >
          <h1>Sign Up with a valid Email ID</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField ref={(input) => this.input = input} floatingLabelText="Email" errorText="This field is required" />
            <TextField ref={(pw) => this.pw = pw} type="password" floatingLabelText="Password" errorText="This field is required" />
            {
              this.state.registerError &&
              <div className="error-login" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.registerError}
              </div>
            }
            <button type="submit" className="submit-btn">Register</button>
          </form>
        </Paper>
      </div>
    )
  }
}
