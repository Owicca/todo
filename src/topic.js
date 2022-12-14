import React, {Component} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import {columnOptionList} from './data/columns';


export default class Topic extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.getSelect = this.getSelect.bind(this);
    this.getActionList = this.getActionList.bind(this);
    this.createFromDummy = this.createFromDummy.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      id: props.id ? props.id : 0,
      isDummy: props.isDummy ? props.isDummy : false,
      isDirty: false,
      name: props.name ? props.name : "{no_name}",
      depth: props.depth ? props.depth : "understand",
      time_commitment: props.time_commitment ? props.time_commitment : "low",
      difficulty: props.difficulty ? props.difficulty : "easy",
      phase: props.phase ? props.phase : "not_started",
    }
  }

  handleUpdate(e) {
    let obj = e.target;

    let st = {};
    st[obj.name] = obj.value;
    st.isDirty = true;

    this.setState(st);
  }

  getSelect(key, value, options) {
    let items = [];

    for(const [k, opt] of Object.entries(options[key])) {
      items.push(<MenuItem key={k} value={k}>{opt.label}</MenuItem>);
    };
    let select = <Select
      name={key}
      defaultValue={value}
      onChange={this.handleUpdate}
      size="small">
      {items}
    </Select>;

    return select;
  }

  getActionList() {
    let actionList = [];
    if(this.state.isDummy) {
      actionList.push(<Tooltip title="Add"><AddCircleIcon key={"create"} onClick={this.createFromDummy} /></Tooltip>);
    } else {
      if (this.state.isDirty) {
        actionList.push(<Tooltip title="Update"><SaveIcon key={"update"} onClick={this.update} /></Tooltip>);
      }
      actionList.push(<Tooltip title="Delete"><RemoveCircleIcon key={"delete"} onClick={this.delete} /></Tooltip>);
    }

    return actionList;
  }

  createFromDummy(e) {
    let newTopic = this.state;
    let isDummy = newTopic.isDummy;
    newTopic.isDummy = false;
    delete newTopic.isDirty;

    isDummy(newTopic)
      .then(id => {
        this.setState({
          id: id
        })
      });
  };

  update(e) {
    let topic = this.state;
    topic.isDummy = false;
    delete topic.isDirty;

    this.props.update(topic)
      .then(r => {
        topic.isDirty = false;
        this.setState(topic)
      });
  }

  delete(e) {
    this.props.delete(this.state);
  }

  render() {
    let name = <TextField size="small" onChange={this.handleUpdate} variant="outlined" name="name" value={this.state.name} />;
    let actionList = this.getActionList();

    return (
      <TableRow>
        <TableCell padding="none" component="th" scope="row">{name}</TableCell>
        <TableCell padding="none" align="right">{this.getSelect("depth", this.state.depth, columnOptionList)}</TableCell>
        <TableCell padding="none" align="right">{this.getSelect("time_commitment", this.state.time_commitment, columnOptionList)}</TableCell>
        <TableCell padding="none" align="right">{this.getSelect("difficulty", this.state.difficulty, columnOptionList)}</TableCell>
        <TableCell padding="none" align="right">{this.getSelect("phase", this.state.phase, columnOptionList)}</TableCell>
        <TableCell padding="none" align="right">{actionList}</TableCell>
      </TableRow>
    );
  }
}
