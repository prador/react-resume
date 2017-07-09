import React, { Component } from 'react'
import Sidebar from './dashboard/Sidebar'
import BasicInfo from './dashboard/basicInfo'
import Skills from './dashboard/skills'
import Project from './dashboard/project'
import ProjectList from './dashboard/ProjectList'
import firebase from 'firebase'
import { firebaseAuth } from './fbconfig'
import { observer, inject } from 'mobx-react'

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
  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);
    this.handlerP = this.handlerP.bind(this);

    // Set some state
    this.state = {
      CompShown: "1"
    };
    this.props.store.logging(email);
  }
  handler(val) {
    this.setState({
      CompShown: val
    });
  }
  handlerP(val) {
    this.setState({
      CompShown: val
    });
  }
  render() {
    let displayDiv;
    let st = this.props.store;
    if ( st.page === "1" ) {
      displayDiv = <BasicInfo />;
    } else if ( st.page === "2" ){
      displayDiv = <Skills />;
    } else if ( st.page === "3" ){
      displayDiv = <ProjectList action={this.handlerP}/>;
    } else if ( st.page >= "4" ){
        displayDiv = <Project proj={st.page - 4}/>;
    }
    return (
      <div className="dashboard-page">
        <Sidebar action={this.handler} />
        {displayDiv}
      </div>
    )
  }
}