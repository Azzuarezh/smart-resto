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
import  BaseApi from '../api/base';


class LoginScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
	  	usernameTextBox : '',
	  	passwordTextBox : '',
      loading : false
	  }
  }


  checkRequired = (userName,password) => {
    return (userName !== '' && password !== '')? true:false;
  }

  login = async(data) => {
    this.setState({loading:true}) 
    console.log('data : ',data)   
    fetch(BaseApi.login, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'            
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(responseJson => {                        
      if(responseJson.status =='OK'){        
        var session = responseJson.data;                
        var roles = responseJson.data.role;
        //if the user has multiple roles admin or chef and waiter
        if(roles.length > 1){
          this.setState({loading:false})
          storeSession(session)           
          this.props.dispatch({type:'SET_SESSION', session});
          Alert.alert("Welcome " + responseJson.data.name )
          var role = roles[0]
          console.log('role : ',role)
          this.props.navigation.navigate(role);
          
        } 
        // if the user has only one access e.g chef or waiter
        else{
          this.setState({loading:false})
          storeSession(session)           
          this.props.dispatch({type:'SET_SESSION', session});
          Alert.alert("Welcome " + responseJson.data.name )
          var role = roles[0]
          console.log('role : ',role)
          this.props.navigation.navigate(role);
          
        }
                      
      }else{
        Alert.alert("Login Failed", responseJson.data);
        this.setState({loading:false})              
      }      
    })
    .catch(error => {
      Toast.show({
        text:'can\'t connect to server!',
        type:'danger',
        buttonText:'Ok',              
      })
      this.setState({loading:false})
    });
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