/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StackActions} from 'react-navigation';
import {
  Container,
  Content,
  Title,
  Form,
  Item,
  Input,
  Button,
  Text,
  Header,
  Body,
  Right,
} from 'native-base';

export default class Addscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      content: '',
      title: '',
    };
    this.handlePostClick = this.handlePostClick.bind(this);
  }
  handlePostClick = async () => {
    const {thumbnail, title, content} = this.state;
    const payload = {
      thumbnail,
      title,
      content,
    };
    this.props.navigation.state.params.handlePostClick(payload);
    this.setState({
      thumbnail: '',
      title: '',
      content: '',
    });
  };
  render() {
    const {thumbnail, title, content} = this.state;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Add Post</Title>
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