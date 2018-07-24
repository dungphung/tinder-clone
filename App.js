import React from 'react';
import { StyleSheet, Text,Image, View, Dimensions, Animated, PanResponder, } from 'react-native';

const Users = [
  {id: "1", uri: require('./assets/dog-1.jpg')},
  {id: "2", uri: require('./assets/dog-2.jpg')},
  {id: "3", uri: require('./assets/dog-3.jpg')},
  {id: "4", uri: require('./assets/dog-4.jpg')},
  {id: "5", uri: require('./assets/dog-5.jpeg')},
  {id: "6", uri: require('./assets/dog-6.jpg')},
]

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class App extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY();
    this.state = {
      currenIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
    ...this.position.getTranslateTransform()
    ]
    }

    this.likeOpaccity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2 , 0, SCREEN_WIDTH/2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2 , 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2 , 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2 , 0, SCREEN_WIDTH/2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy}
          }).start(() => {
            this.setState({currenIndex: this.state.currenIndex = 1}, () => {
              this.position.setValue({x: 0, y: 0})
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy}
          }).start(() => {
            this.setState({currenIndex: this.state.currenIndex = 1}, () => {
              this.position.setValue({x: 0, y: 0})
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
     
      }
    })
  }

  renderUsers = () => { 
    return Users.map((item, i) => {
      if (i < this.state.currenIndex) {
        return null
      } else if (this.state.currenIndex === i) {
        return <Animated.View
        {...this.PanResponder.panHandlers}
         key={i}
         style={[this.rotateAndTranslate ,{    
           height: SCREEN_HEIGHT - 120,
           width: SCREEN_WIDTH,
           padding: 10,
           position: 'absolute'
         }]}
         >
           <Animated.View
         style={{
           opacity: this.likeOpaccity, 
           transform: [{rotate: '-30deg'}],
           position: 'absolute',
           top: 50,
           left: 40,
            zIndex: 99990
         }}
         >
         <Text
         style={{
          borderWidth: 1,
          borderColor: 'green',
          color: 'green',
          fontSize: 32,
          fontWeight: '800',
          padding: 10
          }}
         >
LIKE
         </Text>

         </Animated.View>

          <Animated.View
            style={{
              opacity: this.dislikeOpacity, 
           transform: [{rotate: '30deg'}],
           position: 'absolute',
           top: 50,
           right: 40,
            zIndex: 99990
         }}
         >

             <Text
         style={{
         
          borderWidth: 1,
          borderColor: 'red',
          color: 'red',
          fontSize: 32,
          fontWeight: '800',
          padding: 10
          }}
         >
          NOPE
         </Text>

         </Animated.View>
       <Image
         style={{
           flex: 1,
           height: null,
           width: null,
           resizeMode: 'cover',
           borderRadius: 20
         }}
         source={item.uri}
         ></Image>
         </Animated.View>
     
  
      } else {
        return <Animated.View
     
         key={i}
         style={{    
           opacity: this.nextCardOpacity,
           transform: [{scale: this.nextCardScale}],
           height: SCREEN_HEIGHT - 120,
           width: SCREEN_WIDTH,
           padding: 10,
           position: 'absolute'
         }}
         >
       

       <Image
         style={{
           flex: 1,
           height: null,
           width: null,
           resizeMode: 'cover',
           borderRadius: 20
         }}
         source={item.uri}
         ></Image>
         </Animated.View>
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{
          height: 60
        }}>

        </View>
        <View style={{
          flex: 1,
          position: 'relative'
        }}>
        {this.renderUsers()}
        </View>
        <View style={{
          height: 60
        }}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
