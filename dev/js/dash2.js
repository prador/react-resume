import React, { Component } from 'react'
import Sidebar from './dashboard/Sidebar'
import BasicInfo from './dashboard/basicInfo'
import Skills from './dashboard/skills'
import Project from './dashboard/project'
import ProjectList from './dashboard/ProjectList'
import firebase from 'firebase'
import { firebaseAuth } from './fbconfig'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx';

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
}

@inject('store')
@observer
export default class Dashboard extends Component {
  state ={
    CompShown: 1
  }
  componentDidUpdate(){
    var stp = this.props.store.page;
    console.log(stp);
    this.setState({
      CompShown: stp
    });
    this.forceUpdate();
  }
  render() {
    var displayDiv;
    if ( this.state.CompShown === 1 ) {
      displayDiv = <BasicInfo />;
    } else if ( this.state.CompShown === 2 ){
      displayDiv = <Skills />;
    } else if ( this.state.CompShown === 3 ){
      displayDiv = <ProjectList />;
    } else if ( this.state.CompShown >= 4 ){
      displayDiv = <Project />;
    }
    return (
      <div className="dashboard-page">
        <Sidebar />
        {displayDiv}
      </div>
    )
  }
}