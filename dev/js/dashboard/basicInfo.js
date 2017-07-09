import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class BasicInfo extends Component {
    state = {
    value: 1
  };

  handleChange = (event, index, value) => this.setState({ value });
  render() {
    return (
      <div className="dashboard-main">
        <TextField
          floatingLabelText="Name"
          id="name-input" className="name-input"
          floatingLabelFixed={true} />
        <SelectField
          floatingLabelText="Designation"
          id="role-select" className="role-select"
          value={this.state.value}
          onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Associate Consultant" />
          <MenuItem value={2} primaryText="Consultant" />
          <MenuItem value={3} primaryText="Senior Consultant" />
          <MenuItem value={4} primaryText="Principal Consultant" />
          <MenuItem value={5} primaryText="Engagement Manager" />
        </SelectField>
        <TextField
          hintText="Describe yourself briefly"
          floatingLabelText="Summary"
          floatingLabelFixed={true}
          multiLine={true}
          fullWidth={true}
          id="summary-text" className="summary-text"
          rows={2} />
      </div>
    );
  }
}