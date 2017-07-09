import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input'
import AutoComplete from 'material-ui/AutoComplete';
import { observer, inject } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const style = {
    marginRight: 20,
};

@inject('store')
@observer
export default class ProjectList extends Component {
    state = {
        projects: [],
        key:0,
        open :false
    };
    componentWillMount() {
        const st = this.props.store.projects;
        var l = st.length - 1;
        var k = this.state.key + 1;
        for (var i = 0;i<=l;i++) {
            this.state.projects.push(
                <TableRow key={k}>
                    <TableRowColumn>{k}</TableRowColumn>
                    <TableRowColumn>{st[i].name}</TableRowColumn>
                    <TableRowColumn>{st[i].time}</TableRowColumn>
                </TableRow>)
            this.setState({
                key: k++
            });
        }
    }
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClick = () => {
        console.log("no");
    };
    handleClose = () => {
        this.setState({open: false});
    };
    handleSubmit= () => {
        var proj = { key: this.state.key,
                    name: this.pn.getValue(),
                    time: this.pd.getValue(),
                    summary: "",
                    contribution: "",
                    impact: "",
                    tools: [""]
                };
        this.props.store.addProject(proj);
        this.addProj();
    }
    addProj= () => {
        var i = this.state.key;
        var k = this.state.key + 1;
        this.state.projects.push(
        <TableRow key={k}>
            <TableRowColumn>{k}</TableRowColumn>
            <TableRowColumn>{this.props.store.projects[i].name}</TableRowColumn>
            <TableRowColumn>{this.props.store.projects[i].time}</TableRowColumn>
        </TableRow>)
        this.setState({open: false, key:k});
    }
    render() {
        const actions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onTouchTap={this.handleClose}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.handleSubmit}
        />,
        ];
        return (
            <div className="dashboard-main">
                <Dialog
                    title="Add New Project"
                    actions={actions}
                    modal={true}
                    open={this.state.open} >
                <TextField
                    floatingLabelText="Project Name"
                    floatingLabelFixed={true}
                    ref={(pn) => this.pn = pn}
                    id="skill-label" className="skill-label" />
                <TextField
                    floatingLabelText="Project Duration"
                    floatingLabelFixed={true}
                    ref={(pd) => this.pd = pd}
                    id="skill-label" className="skill-label" />
                </Dialog>
                <Table onCellClick={this.handleClick}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Project #</TableHeaderColumn>
                            <TableHeaderColumn>Project Name</TableHeaderColumn>
                            <TableHeaderColumn>Duration </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.projects}
                    </TableBody>
                </Table>
                
                <FloatingActionButton className="skillFab" onTouchTap={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}