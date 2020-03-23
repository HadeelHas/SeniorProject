import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import BottomNavRegUser from './BottomNavRegUser';
import TopNav from './TopNav';
import {
  Container,
  Header,
  Item,
  Input,
  Row,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Segment,
  Left,
  Right,
  Icon,
  Body,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faCalendar,
  faCalendarAlt,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
// import { SafeAreaView } from 'react-navigation';
import {db} from '../firebase/config';
// import Icon from 'react-native-vector-icons';

export default class Browse extends Component {
  state = {
    items: [],
  };

  c() {
    getAllData();
  }
  //   };
  // }
  // componentDidMount() {
  //   console.log(this.state.myData);
  // }
  componentWillMount() {
    // await getAllData();
    // this.setState({myData: data})
    let d = [];
    db.collection('events')
      .where('eventStatus', '==', 'accepted')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          // console.log(data);
          // console.log(doc.data());

          d.push(doc.data());
          // data.push(JSON.stringify(doc.data()));
          // console.log(d);

          // console.log("func= ", data);
        });
      })
      .then(() => {
        // this.state.myData.concat(d);
        // console.log(d);
        // this.state.myData.concat(d);
        this.setState({items: d});
        console.log('browse= ', this.state.items);
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  }

  // // getDataFromAPI = async () => {
  // //   const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=5';
  // //   const res = await fetch(endpoint);
  // //   const data = await res.json();
  // //   this.setState({items: data});
  // // };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card}>
        {/*         
        <Image
          style={styles.cardImage}
          source={{
            uri: item.url,
          }}></Image>
        <Text style={styles.cardText}>
          {item.title}
          {/* <Icon name="favorite" /> 
        </Text>
        <Text style={styles.cardDate}>{item.time}</Text> */}
        <Card style={{marginBottom: 20, width: 328, borderRadius: 10}}>
          <CardItem>
            <Left>
              <Body style={{flex: 1, flexDirection: 'row', marginLeft: -6}}>
                <FontAwesomeIcon
                  icon={faHeart}
                  size={16}
                  color="#aaa"
                  style={{top: 2}}
                />
                <Text
                  style={{
                    color: '#bbb',
                    alignSelf: 'flex-start',
                    marginLeft: 15,
                  }}>
                  {item.event_type}
                </Text>
              </Body>
            </Left>
            <Right>
              <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri: 'https://homestaymatch.com/images/no-image-available.png',
              }}
              style={{height: 165, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem footer>
            <Left style={{flex: 1, flexDirection: 'row'}}>
              {/* <Button > */}
              <Text
                style={{
                  marginLeft: 6,
                  fontSize: 12,
                  alignSelf: 'center',
                  marginRight: 4,
                }}>
                {item.age_group}
              </Text>
              <FontAwesomeIcon
                icon={faUsers}
                size={16}
                color="#aaa"
                // style={{marginLeft: 0}}
              />

              {/* </Button> */}
            </Left>
            <Body style={{flex: 1, flexDirection: 'row', marginLeft: 25}}>
              {/* <Button > */}

              <Text
                style={{
                  marginLeft: -30,
                  marginRight: 4,
                  fontSize: 12,
                  alignSelf: 'center',
                }}>
                {item.date.replace(/-/g, '/')}
              </Text>
              <FontAwesomeIcon icon={faCalendarAlt} size={16} color="#aaa" />
              {/* </Button> */}
            </Body>
            <Right style={{flex: 1, flexDirection: 'row', marginRight: -20}}>
              <Text
                style={{
                  marginLeft: -30,
                  fontSize: 12,
                  alignSelf: 'center',
                  marginRight: 4,
                }}>
                {item.end_time.replace(' :', '')}-
                {item.start_time.replace(' :', '')}
              </Text>
              <FontAwesomeIcon icon={faClock} size={16} color="#aaa" />
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };
  render() {
    let {container, loader} = styles;
    let {items} = this.state;
    if (items.length === 0) {
      return (
        <View style={loader}>
          <ActivityIndicator size="large" />
          <Text>يتم تحميل الفعاليات ...</Text>
        </View>
      );
    }
    return (
      <>
        <TopNav history={this.props.history} />
        <View style={styles.content}>
          <SafeAreaView>
            <FlatList
              // numColumns={3}
              style={container}
              data={this.state.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />
          </SafeAreaView>
        </View>
        <BottomNavRegUser history={this.props.history} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    // width: '90%',
    // marginHorizontal: 5,
    // paddingHorizontal: -20,
    // paddingRight: -40,
  },
  header: {
    backgroundColor: 'blue',
  },
  content: {
    flex: 1,
    position: 'relative',
    width: '95%',
    // zIndex: -1,
    marginTop: -380,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 6,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  cardDate: {
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    // backgroundColor: '#69BBE8',
    // borderRadius: 20,
    marginBottom: 10,
    marginLeft: '2%',
    width: '100%',
    height: 260,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    width: 60,
    marginBottom: 10,
    marginRight: 300,
  },
});
