import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard, { BasicInfo }  from './Dashboard'
import { logout } from './auth'
import { firebaseAuth } from './fbconfig'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import '../scss/App.scss'

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    landing: true,
    username: ""
  }
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <BrowserRouter>
          <div>
            <nav className={"navbar" + (this.state.landing ? ' home-navbar' : ' ')}>
              <div className="container">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand">Neu Resume</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/" className="navbar-brand">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                  </li>
                  <li className="pull-right">
                    {this.state.authed
                      ? <Link to="/login"
                        style={{ border: 'none', background: 'transparent' }}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</Link>
                      : <span>
                        <Link to="/login" className="navbar-brand">Log In</Link>
                        <Link to="/register" className="navbar-brand">Sign Up</Link>
                      </span>}
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/' exact component={Home} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                  <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
