import React, {Component} from 'react';
import Container from '@mui/material/Container';
import Topic from './topic';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import {columnHeaderList} from './data/columns';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.generateDummy = this.generateDummy.bind(this);

    this.store = props.store;

    this.state = {
      topicList: [],
    };
  }

  componentDidMount() {
    this.store.getAll("topics")
      .then(topicList => {
        this.setState({
          topicList: topicList,
        });
      });
  }

  generateDummy() {
    return <Topic key={"isDummy"} id={-1} isDummy={this.create} delete={this.delete} />;
  }

  create(newTopic) {
    let newTopicList = this.state.topicList;
    delete newTopic.id;
    console.log("create", newTopic);

    return this.store.add("topics", newTopic)
      .then(id => {
        //newTopic.key = id;
        //console.log("after create", newTopicList, newTopic);
        //newTopicList.push(newTopic);
        newTopicList.push(this.generateDummy());

        this.setState({
          topicList: newTopicList,
        });

        return id;
      });
  }

  update(topic) {
    let newTopicList = this.state.topicList;
    let id = topic.id;

    topic.isDummy = false;
    console.log("update", id, topic, this.store.put);

    return this.store.put("topics", topic)
      .then(id => {
        return id;
      });
  }

  delete(topic) {
    this.store.delete("topics", topic.id)
      .then(r => {
        let newTopicList = this.state.topicList.filter(t => {
          return t.id !== topic.id || topic.id === -1;
        });

        this.setState({
          topicList: newTopicList,
        });
      });
  }

  render() {
    let topicList = this.state.topicList.map((t, i) => {
      return <Topic key={t.id} id={t.id} {...t} update={this.update} delete={this.delete} />;
    });
    topicList.push(this.generateDummy());

    let header = [];
    for(const [key, col] of Object.entries(columnHeaderList)) {
      let align = key === 'name' ? 'left' : 'right';
      let cell = <TableCell key={key} align={align}>{col.label}</TableCell>;
      header.push(cell);
    }

    return (
      <Container maxWidth="lg">
        <TableContainer>
          <Table size="small">
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
      </Container>
    );
  }
};
