import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {AsyncStorage, Platform, StatusBar, StyleSheet, View, Image} from 'react-native';
import {Root,Text } from 'native-base';
import { AppLoading, SplashScreen } from 'expo';
import * as Icon from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { fetchSession } from '../components/action';
import AppNavigator from '../navigation/AppNavigator';



export class Index extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false
  };

  async componentDidMount() {
    var sessionJson = await AsyncStorage.getItem("@Resto:session");
    
    // console.log('session before clear : ',sessionJson)
    // await AsyncStorage.clear();
    this.props.dispatch({type:'RESET_STATE'})
    try {
      var sessionJson = await AsyncStorage.getItem("@Resto:session")
      var session = await JSON.parse(sessionJson)
      if (session !== null){
        this.props.dispatch({type:'SET_SESSION', session})
      }
    }
    catch(err) {
      this.props.dispatch({type:'RESET_STATE'})
      console.log('Session not found');
      console.error(err);
    }
  }

  render() {

    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('../assets/images/splash.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
    return (
        <Root>
          <AppNavigator />
        </Root>
        );
  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require('../assets/images/splash.png');
    return Asset.fromModule(gif).downloadAsync()
  }

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require('../assets/images/robot-dev.png'),
      require('../assets/images/robot-prod.png'),
      require('../assets/images/animation.gif')
    ];

    

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all([cacheImages]);
    this.setState({ isAppReady: true });
  }
}

Index.propTypes = {
  session: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps)(Index);