import React from 'react';
import { connect } from 'react-redux';
import { storeSession } from '../components/action';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);    
  }

  

  async componentWillMount() {
    try {
      var sessionJson = await AsyncStorage.getItem("@Resto:session")
      var session = await JSON.parse(sessionJson)
      console.log('session : ', session);
      if (session !== null){        
        var roles = session.role;
        //if the user has multiple roles admin or chef and waiter
        if(roles.length > 1){
          storeSession(session)           
          this.props.dispatch({type:'SET_SESSION', session});
          var role = roles[0]
          console.log('role : ',role)
          this.props.navigation.navigate(role);
          
        } 
        // if the user has only one access e.g chef or waiter
        else{
          storeSession(session)           
          this.props.dispatch({type:'SET_SESSION', session});
          var role = roles[0]
          console.log('role : ',role)
          this.props.navigation.navigate(role);
          
        }        
      }else{
        this.props.navigation.navigate('Login')
      }
    }
    catch(err) {
      this.props.dispatch({type:'RESET_STATE'})
      console.log('Session not found');
      console.error(err);
    }
  }


  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(AuthLoadingScreen);