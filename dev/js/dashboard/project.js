import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import ChipInput from 'material-ui-chip-input'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'
import { observer, inject } from 'mobx-react'

const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};

@inject('store')
@observer
export default class Project extends Component {
    constructor(props) {
        super(props);

        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
            minDate: minDate,
            maxDate: maxDate,
            autoOk: false,
            disableYearSelection: false,
            project: this.props.proj
        };
    }

    handleName(e) {
        if (e.which === 13) {
            this.props.store.changeName(this.state.project,e.target.value);
        }
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            minDate: date,
        });
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            maxDate: date,
        });
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleRequestDelete() {
        alert('You clicked the delete button.');
    };

    handleUpdateInput = (value) => {
        this.props.store.newSkill(value);
    };
    render() {
        return (
            <div className="dashboard-main">
                <TextField
                    floatingLabelText="Client Name"
                    id="client-input" className="client-input"
                    floatingLabelFixed={true} 
                    defaultValue= {this.props.store.projects[this.state.project].name}
                    onKeyPress={this.handleName.bind(this)} />
                <DatePicker
                    floatingLabelText="Ranged Date Picker"
                    autoOk={this.state.autoOk}
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    id="date-select" className="date-select"
                    mode="landscape" container="inline"
                    disableYearSelection={this.state.disableYearSelection}
                />
                <TextField
                    floatingLabelText="Project Summary"
                    floatingLabelFixed={true}
                    multiLine={true}
                    fullWidth={true}
                    id="summary-text" className="summary-text"
                    rows={2} />

                <TextField
                    floatingLabelText="Contribution to Project"
                    floatingLabelFixed={true}
                    multiLine={true}
                    fullWidth={true}
                    id="summary-text" className="summary-text"/>

                <TextField
                    floatingLabelText="Impact of Contribution"
                    floatingLabelFixed={true}
                    multiLine={true}
                    fullWidth={true}
                    id="summary-text" className="summary-text" />

                <ChipInput
                    defaultValue={[]}
                    floatingLabelText="Tools Used" fullWidth="true"
                    floatingLabelFixed={true}
                    onRequestDelete={this.handleRequestDelete}
                    dataSource={this.props.store.autoList}
                    onUpdateInput={this.handleUpdateInput}
                    filter={AutoComplete.noFilter}
                />
            </div>
        );
    }
}