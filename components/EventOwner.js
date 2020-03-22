import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faUser, faHome} from '@fortawesome/free-solid-svg-icons';
import BottomNavEvOwner from './BottomNavEvOwner';
import TopNavEvOwner  from './TpoNavEvOwner'
// import {hi} from '../firebase/config'

export default class EventOwner extends Component {
  render() {
    return (
      <>
        <TopNavEvOwner />
        <Text style={styles.container}>Hi </Text>
        <BottomNavEvOwner history={this.props.history} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'row'
  },
});
