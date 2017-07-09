import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input'
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { observer, inject } from 'mobx-react';
import Paper from 'material-ui/Paper';

@inject('store')
@observer
export default class Skills extends Component {
    state = {
        chips: []
    }

    handleRequestDelete() {
        alert('You clicked the delete button.');
    }

    handleUpdateInput = (value) => {
        this.props.store.newSkill(value);
    }
    handleClick(){
        this.state.chips.push(
            <Paper zDepth={3} className="skillset">
                <TextField
                    floatingLabelText="Skill Category"
                    floatingLabelFixed={true}
                    multiLine={true}
                    id="skill-label" className="skill-label" />
                <ChipInput
                    defaultValue={[]}
                    floatingLabelText="Skills"
                    floatingLabelFixed={true}
                    onRequestDelete={this.handleRequestDelete}
                    dataSource={this.props.store.autoList}
                    onUpdateInput={this.handleUpdateInput}
                    filter={AutoComplete.noFilter}
                    id="skill-chip" className="skill-chip" />
            </Paper>)
        this.forceUpdate();
    }
    render() {
        const children = [];
        return (
            <div className="dashboard-main">
                <Paper zDepth={3} className="skillset">
                    <TextField
                        hintText="Enter a Skill Category"
                        floatingLabelText="Skill Category"
                        floatingLabelFixed={true}
                        multiLine={true}
                        id="skill-label" className="skill-label" />
                    <ChipInput
                        defaultValue={['HTML', 'CSS']}
                        floatingLabelText="Skills"
                        hintText="enter skills"
                        onRequestDelete={this.handleRequestDelete}
                        dataSource={this.props.store.autoList}
                        onUpdateInput={this.handleUpdateInput}
                        filter={AutoComplete.noFilter} 
                        id="skill-chip" className="skill-chip" />
                </Paper>
                {this.state.chips}

                <FloatingActionButton className="skillFab" onClick={(e) => this.handleClick(e)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}