import React, {Component} from 'react';
import Topic from './topic';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


const columns = {
  "name": {
    "label": "Name",
  },
  "depth": {
    "label": "Depth",
  },
  "time_commitment": {
    "label": "Time commitment",
  },
  "difficulty": {
    "label": "Difficulty",
  },
  "phase": {
    "label": "Phase",
  },
  "actionList": {
    "label": "Action list"
  }
};


export default class App extends Component {
  constructor(props) {
    super(props);

    this.addNew = this.addNew.bind(this);

    this.store = props.store;

    this.state = {
      topicList: [],
    };
  }

  componentDidMount() {
    this.store.getAll("topics").then(topicList => {
      this.setState({
        topicList: topicList,
      });
    });
  }

  addNew(newTopic) {
    newTopic.key = newTopic.name;
    let newTopicList = this.state.topicList;
    newTopicList.push(newTopic);

    this.store.add("topics", newTopic);
    //  .then(r => {
    //    console.log(r);
    //    this.setState({
    //      topicList: newTopicList,
    //    });
    //  });
  }

  render() {
    let topicList = this.state.topicList.map((t, i) => {
      return <Topic key={i} {...t} />;
    })
    let newKey = topicList.length;
    topicList.push(<Topic key={newKey} isDummy={this.addNew} />);

    let header = [];
    for(const [key, col] of Object.entries(columns)) {
      let cell = <TableCell key={key}>{col.label}</TableCell>;
      header.push(cell);
    }

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {header}
            </TableRow>
          </TableHead>
          <TableBody>
            {topicList}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
