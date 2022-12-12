import React, {Component} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const columns = {
  "depth": {
    "understand": {
      "label": "understand",
      "tooltip": "know about it at a theoretical level"
    },
    "dabble": {
      "label": "dabble",
      "tooltip": "can apply basic concepts with google in a reasonable time"
    },
    "apply": {
      "label": "apply",
      "tooltip": "can apply medium concepts with less than 50% google"
    },
    "teach": {
      "label": "teach",
      "tooltip": "confident enough to teach it to somebody else"
    },
  },
  "time_commitment": {
    "low": {
      "label": "low",
      "tooltip": "1h/day => 7h/week"
    },
    "medium": {
      "label": "medium",
      "tooltip": "2h/day => 14h/week"
    },
    "high": {
      "label": "high",
      "tooltip": "3h/day => 21h/week"
    },
  },
  "difficulty": {
    "easy": {
      "label": "easy",
      "tooltip": "can work while listening to a podcast in the background"
    },
    "medium": {
      "label": "medium",
      "tooltip": "only music in the background"
    },
    "hard": {
      "label": "hard",
      "tooltip": "requires full attention"
    },
  },
  "phase": {
    "not_started": {
      "label": "not started",
    },
    "plan": {
      "label": "plan",
      "tooltip": "research learning path"
    },
    "in_progress": {
      "label": "in progress",
      "tooltip": "requires full attention"
    },
    "done": {
      "label": "done",
      "tooltip": "finished learning"
    },
    "paused": {
      "label": "paused",
      "tooltip": "provide a reason in a tooltip"
    },
  }
};

export default class Topic extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.getSelect = this.getSelect.bind(this);
    this.createFromDummy = this.createFromDummy.bind(this);

    this.state = {
      isDummy: props.isDummy ? props.isDummy : false,
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

  createFromDummy(e) {
    this.state.isDummy(this.state);
  };

  render() {
    let name = <TextField onChange={this.handleUpdate} variant="outlined" name="name" value={this.state.name} />
    let actionList = [];
    if(this.state.isDummy) {
      actionList.push(<Button key={"create"} onClick={this.createFromDummy}>Add new</Button>);
    }

    return (
      <TableRow>
        <TableCell component="th" scope="row">{name}</TableCell>
        <TableCell>{this.getSelect("depth", this.state.depth, columns)}</TableCell>
        <TableCell>{this.getSelect("time_commitment", this.state.time_commitment, columns)}</TableCell>
        <TableCell>{this.getSelect("difficulty", this.state.difficulty, columns)}</TableCell>
        <TableCell>{this.getSelect("phase", this.state.phase, columns)}</TableCell>
        <TableCell>{actionList}</TableCell>
      </TableRow>
    );
  }
}
