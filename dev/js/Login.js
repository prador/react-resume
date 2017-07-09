import React, { Component } from 'react'
import { login, resetPassword } from './auth'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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
    loginMessage: error
  }
}

export default class Login extends Component {
  state = {
    loginMessage: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.input.getValue(), this.pw.getValue())
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password.'))
      })
  }
  resetPassword = () => {
    resetPassword(this.input.getValue())
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.input.getValue()}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render() {
    return (
      <div className="login-form">
        <Paper style={style} zDepth={3} >
          <h1> Login To View Dashboard </h1>
          <form onSubmit={this.handleSubmit}>
            <TextField ref={(input) => this.input = input} floatingLabelText="Email" errorText="This field is required" />
            <TextField ref={(pw) => this.pw = pw} type="password" floatingLabelText="Password" errorText="This field is required" />
            {this.state.loginMessage &&
              <div className="error-login">
                {this.state.loginMessage}
              </div>
            }
            <button type="submit" className="submit-btn">Login</button>
            {
              this.state.loginMessage &&
              <div>
                <FlatButton label="Forgot Password?" primary={true} onClick={this.resetPassword} className="alert-link" />
              </div>
            }

          </form>
        </Paper>
      </div>
    )
  }
}
