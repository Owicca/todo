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

  create(newTopic) {
    let newTopicList = this.state.topicList;
    console.log("create", newTopic);

    return this.store.put("topics", newTopic)
      .then(id => {
        newTopic.key = id;
        newTopicList.push(newTopic);

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
    console.log("update", topic, id, this.store);

    return this.store.put("topics", topic, id)
      .then(id => {
        topic.id = id;
        topic.key = id;
        console.log(topic, newTopicList);
        //newTopicList.push(newTopic);

        //this.setState({
        //  topicList: newTopicList,
        //});

        return id;
      });
  }

  delete(topic) {
    this.store.delete("topics", topic.id)
      .then(r => {
        let newTopicList = this.state.topicList.filter(t => {
          return t.id !== topic.id;
        });

        this.setState({
          topicList: newTopicList,
        });
      });
  }

  render() {
    let topicList = this.state.topicList.map((t, i) => {
      return <Topic key={t.id} id={t.id} {...t} update={this.update} delete={this.delete} />;
    })
    //let newKey = topicList.length ? topicList[topicList.length - 1].id : 0;
    topicList.push(<Topic key={"isDummy"} isDummy={this.create} delete={this.delete} />);

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
