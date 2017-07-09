import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { observer, inject } from 'mobx-react'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}>
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}
SelectableList = wrapState(SelectableList);
@inject('store')
@observer
export default class Sidebar extends Component {
  state = {
    open: true,
    value: 3,
    list: [],
    key:0,
    listVal:1,
    listSize:1
  }
  constructor(props) {
    super(props);
    const st = this.props.store.projects;
    var l = st.length - 1;
    for (var i = 0; i<=l; i++) {
      var a = 4 + i;
      this.state.list.push(
          <ListItem
            value={a}
            primaryText={st[i].name}
            onClick={() => this.handleList()}
          />)
    }
  }
  
  componentWillUpdate(){
    const st = this.props.store.projects;
    var l = st.length - 1;
    if (l !== this.state.listSize) {
      for (var i = 0; i<=l; i++) {
        var a = 4 + i;
        this.state.list.push(
            <ListItem
              value={a}
              primaryText={st[i].name}
              onClick={() => this.handleList()}
            />)
        this.forceUpdate();
        this.setState({
          listVal: a,
          listSize: l
        });
      }
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleChange = (event, index, value) => this.setState({ value });    
  handleList = () => {
    let listV = document.getElementById("list-h1").nextSibling.getAttribute("value");
    this.props.store.changePage(listV);
    
  };    

  render() {
    const st = this.props.store;
    return (
      <Drawer open={this.state.open} className="sidenav" onChange={()=> this.handleChange()}>
        <h1 id="list-h1"> Welcome {st.name} </h1>
        <SelectableList defaultValue={1}>
          <ListItem
            value={1}
            primaryText="Basic Info"
            id="list-item"
            onClick={() => this.handleList()}
          />
          <ListItem
            value={2}
            primaryText="Skills"
            id="list-item"
            onClick={() => this.handleList()}
          />
          <ListItem
            value={3}
            primaryText="Project List"
            id="list-item"
            initiallyOpen={true}
            onClick={() => this.handleList()}
            nestedItems={this.state.list}
          />
        </SelectableList>
      </Drawer >
    );
  }
}