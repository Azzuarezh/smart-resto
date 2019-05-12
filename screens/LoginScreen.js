import React from 'react';
import { connect } from 'react-redux';
import { Container, 
  Header, 
  Title, 
  Content, 
  Button, 
  Left, 
  Body, 
  Text, 
  Form, 
  Item, 
  Label, 
  Input, 
  Right, 
  Toast,
  Spinner} from 'native-base';
import { View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { storeSession } from '../components/action';
import {  Font } from 'expo';


class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
	  	usernameTextBox : '',
	  	passwordTextBox : '',
      loading : false
	  }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  checkRequired = (userName,password) => {
    return (userName !== '' && password !== '')? true:false;
  }

  login = async(data) => {
    this.setState({loading:true}) 
    console.log('data : ',data)   
    if(data.username === "Waiter" && data.password ==="1"){
        console.log('login success : ', true)
        data.role ="Waiter";
        storeSession(data)
        this.props.navigation.navigate('AuthLoading'); 
    }else{
        Toast.show({
            text:'username or password wrong',
            type:'danger',
            buttonText:'Ok',              
          })
          this.setState({loading:false})
          console.log('error:','username or password wrong')
    }
  }

  handleLoginPressed = async () => {            
    if(this.checkRequired(this.state.usernameTextBox,this.state.passwordTextbox)){
      let data = {
        'username':this.state.usernameTextBox,
        'password': this.state.passwordTextBox
      }      
      this.login(data)
    }else{
      Alert.alert("Sorry, Input Required!","Fill the required fields")
      this.state.loading = false;
    }    
  }

  handleSignupPressed = async () => {    
    this.props.navigation.navigate('SignUp');
  }

  handleUsernameChange = (usernameTextBox) => {
  	this.setState({
  		...this.state,
  		usernameTextBox: usernameTextBox
  	})
  }

  handlePasswordChange = (passwordTextBox) => {
  	this.setState({
  		...this.state,
  		passwordTextBox: passwordTextBox
  	})
  }

  render() {
    if (this.state.loading === true){
      return (
        <Container>
          <Header />
          <Content>
            <Spinner color='red'/>
          </Content>
        </Container>
      );
    } else {
      return(
        <Container>
          <Header>
            <Left/>
            <Body>
              <Title> Login </Title>
            </Body>
            <Right />
          </Header>
          <Content padder contentContainerStyle={{justifyContent:'center', margin: 20}}>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input value={this.state.usernameTextBox} onChangeText={this.handleUsernameChange}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input value={this.state.passwordTextbox} onChangeText={this.handlePasswordChange} secureTextEntry/>
              </Item>
            </Form>            
            <View style = {{height:10}} />
            <Button block title="Log in" onPress={this.handleLoginPressed} >
              <Text> Log in </Text>
            </Button>
          </Content>
        </Container>
      )
    }
  }
}


const styles = StyleSheet.create({
  helpLink: {
    paddingVertical: 15,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(LoginScreen);