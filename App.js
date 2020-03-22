
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NativeRouter, Switch, Route} from 'react-router-native';
// import firebase from 'firebase';
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp';
import ContactUs from './components/ContactUs';
import AddEventPage from './components/AddEventPage';
import Browse from './components/Browse'
import Favorite from './components/Favorite';
import BottomNavRegUser from './components/BottomNavRegUser';
import { signup } from './firebase/config';
import Chat from './components/Chat';
import EventOwner from './components/EventOwner';
import {getCurrentUser, getCurrentUserEmail} from './firebase/config';

export default class App extends Component {
  render() {
    return (
    <NativeRouter>
      <SafeAreaView style={styles.container}>
          <Switch>
            
            <Route exact path="/" component={EventOwner} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route path="/signup" component={SignUp} />
            {getCurrentUser()? (
              getCurrentUserEmail() === 'hadeel.has97@gmail.com' ? (
                <Route path="/home" component={EventOwner} />
              ) : (
                <Route path="/home" component={EventOwner} />
              )
            ) : (
              <Route path="/home" component={Browse} />
            )}
            <Route path="/add" component={AddEventPage} />
            <Route path="/fav" component={Favorite} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </SafeAreaView>
    </NativeRouter>
  );
}};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
