import React from 'react';
import { connect } from 'react-redux';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert
} from 'react-native';

import { Container, 
  Header,
  Icon, 
  Title, 
  Content, 
  Button, 
  Left, 
  Body, 
  Form, 
  Item, 
  Label, 
  Input, 
  Right, 
  Toast,
  Picker,
  H1,
  Spinner} from 'native-base';



class WaiterOrderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      tables :[
        {"label":"01", "value":1},
        {"label":"02", "value":2},
        {"label":"03", "value":3},
        {"label":"04", "value":4},
        {"label":"05", "value":5},
        {"label":"06", "value":6},
        {"label":"07", "value":7},
        {"label":"08", "value":8},
        {"label":"09", "value":9},
        {"label":"10", "value":10}
      ],
      gridListItem :[ 
        { key: "Makanan" },
        { key: "Minuman" },
        { key: "Snack" },
        { key: "Lainnya" }
      ],
	  	customerName : '',
	  	tableNo : '',
      loading : false,
      selected: undefined,
      orderId : new Date().getTime().toString()
    }
    
  }
  
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }


   Item = Picker.Item;

   handleNameChange = (customerNameTextBox) => {
  	this.setState({
  		...this.state,
  		customerName: customerNameTextBox
  	})
  }

  _signOutAsync = async () => {
    Alert.alert('Sign Out',
      'Are you sure want to sign out?',
      [{
        text:'Yes', onPress :async()=>{
          await AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
          Toast.show({
                text:'Signed out,Thank you!',
                type:'success',
                buttonText:'Ok',              
          })
        }
      },
      {
        text:'No',style:'cancel'
      }])    
  };

  // action when the grid tapped
  GetGridViewItem(item) {
    this.props.navigation.navigate('Food');
    //Alert.alert(item);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left/>          
          <Body>
            <Title>Account</Title>
          </Body>          
          <Right>
            <Button transparent onPress={this._signOutAsync}>
              <Icon name={Platform.OS =='ios'? 'ios-power':'md-scanner'} />
            </Button>
          </Right>
        </Header>
        <Content>
        <Form>
          <Item Picker>
          <Label>Table No.</Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                iosHeader="Select Table No."
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Table No."
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >{
                this.state.tables.map( (v,i)=>{
                 return (<Item key={i} label={v.label} value={v.value} />)
                })
               }
              </Picker>
            </Item>
              <Item>
                <Label>Name</Label>
                <Input value={this.state.customerName} onChangeText={this.handleNameChange}/>
              </Item>
            </Form>
            <Left/>
            <H1>Menu</H1>
            <Right/>
            <View style={styles.container}>
              <FlatList
                  data={ this.state.gridListItem }
                  renderItem={ ({item}) =>
                    <View style={styles.GridViewContainer}>
                    <Text style={styles.GridViewTextLayout} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>
                    </View> }
                  numColumns={2}
              />
            </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 100,
   margin: 5,
   backgroundColor: '#7B1FA2'
},
GridViewTextLayout: {
   fontSize: 20,
   fontWeight: 'bold',
   justifyContent: 'center',
   color: '#fff',
   padding: 10,
 }
});


function mapStateToProps(state) {
  return {
    session: state.session,
  };
}
export default connect(mapStateToProps)(WaiterOrderScreen);