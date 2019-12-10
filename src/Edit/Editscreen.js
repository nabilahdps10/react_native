/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {StackActions} from 'react-navigation';
import {
  Container,
  Header,
  Body,
  Right,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
} from 'native-base';
import {FlatList, AsyncStorage} from 'react-native';
import axios from 'axios';

export default class Editscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      title: '',
      content: '',
      uuid: '',
    };
    this.handlePostClick = this.handlePostClick.bind(this);
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    const {
      thumbnail,
      content,
      title,
      uuid,
    } = this.props.navigation.state.params.payload;
    this.setState({
      thumbnail,
      content,
      title,
      uuid,
    });
  };

  handlePostClick = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const {thumbnail, title, content, uuid} = this.state;
    const payload = {
      thumbnail,
      title,
      content,
    };
    axios
      .put(
        `http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${uuid}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const pushAction = StackActions.push({
          routeName: 'Home',
        });
        this.props.navigation.dispatch(pushAction);
        this.setState({
          thumbnail: '',
          title: '',
          content: '',
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {thumbnail, content, title} = this.state;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Edit Post</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Thumbnail"
                value={thumbnail}
                onChangeText={value => this.setState({thumbnail: value})}
              />
            </Item>
            <Item>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={value => this.setState({title: value})}
              />
            </Item>
            <Item>
              <Input
                placeholder="Content"
                value={content}
                onChangeText={value => this.setState({content: value})}
              />
            </Item>
            <Button
              block
              style={{marginTop: 24, marginHorizontal: 12}}
              onPress={this.handlePostClick}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}