import React from 'react';
import { connect } from 'react-redux';
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
        this.props.dispatch({type:'SET_SESSION', session})        
        this.props.navigation.navigate(session.role + '_nav');
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