/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import {
  Content,
  Fab,
  Icon,
  Spinner,
  ListItem,
  Left,
  Body,
  Right,
  Title,
  List,
  Header,
  Text,
} from 'native-base';
import axios from 'axios';
import {StackActions} from 'react-navigation';

export default class Homescreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
  }

  makeRemoteRequest = () => {
    this.setState({loading: true});
    setTimeout(() => {
      axios
        .get('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi')
        .then(res => {
          // const newData = this.state.data.concat(res.data);
          this.setState({
            loading: false,
            items: res.data.data,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }, 1500);
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  DetailPost = id => {
    const pushAction = StackActions.push({
      routeName: 'Detail',
      params: {
        id: id,
      },
    });
    this.props.navigation.dispatch(pushAction);
  };

  addPost = () => {
    const pushAction = StackActions.push({
      routeName: 'Add',
      params: {
        handlePostClick: this.handlePostClick,
      },
    });
    this.props.navigation.dispatch(pushAction);
  };

  handlePostClick = async payload => {
    const token = await AsyncStorage.getItem('access_token');
    this.setState({isLoading: true});
    this.props.navigation.dispatch(StackActions.popToTop());
    axios
      .post(
        'http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const newData = this.state.items.concat(res.data.data);
        this.setState({
          items: newData,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  renderItems = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      const listItem = this.state.items.map(data => (
        <ListItem
          key={data.uuid}
          onPress={() => this.DetailPost(data.uuid)}
          icon
          style={{marginVertical: 10}}>
          <Left />
          <Body onPress={() => this.DetailPost(data.uuid)}>
            <Text>{data.title}</Text>
          </Body>
        </ListItem>
      ));
      return listItem;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <Header>
          <Body color="#1e88e5">
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ScrollView>
            <List style={{marginTop: 20}}>{this.renderItems()}</List>
          </ScrollView>
        </Content>
        <Fab
          style={{backgroundColor: '#1e88e5'}}
          position="bottomRight"
          onPress={() => {
            this.addPost();
          }}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});