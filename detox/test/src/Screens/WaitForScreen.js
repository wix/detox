import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity, Dimensions, StyleSheet, SafeAreaView
} from 'react-native';

export default class WaitForScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      becomeVisibleLeft: new Animated.Value(-500)
    };
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 40, justifyContent: 'flex-start'}}>

        <View style={{height: 100, borderColor: '#c0c0c0', borderWidth: 1, backgroundColor: '#f8f8ff', marginBottom: 20}}>
          <ScrollView testID='ScrollView'>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text1</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text2</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text3</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text4</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text5</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text6</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text7</Text>
            <Text style={{height: 30, backgroundColor: '#e8e8f8', padding: 5, margin: 10}}>Text8</Text>
          </ScrollView>
        </View>

        {this.state.clicked ? false :
         <Text testID='deletedFromHierarchyText' style={{marginBottom: 20, textAlign: 'center', color: 'red'}}>I am being removed 2 sec after click</Text>
        }

        {!this.state.clicked ? false :
         <Text testID='createdAndVisibleText' style={{marginBottom: 20, textAlign: 'center'}}>I am being created 2 sec after click</Text>
        }

        <TouchableOpacity onPress={this.onGoButtonPress.bind(this)}>
          <Text testID='GoButton' style={{color: 'blue', textAlign: 'center'}}>Go</Text>
        </TouchableOpacity>

        <View style={styles.horizontalScrollView}>
          <ScrollView testID='horizontalScrollView' horizontal>
            {[1,2,3,4,5,6,7,8].map(i => (
              <Text key={i} style={styles.horizontalItem}>HText{i}</Text>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  onGoButtonPress() {
    setTimeout(() => {
      this.setState({
        clicked: true
      });
    }, 2000);
  }
}

const styles = StyleSheet.create({
  horizontalScrollView: {
    height: 50,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    backgroundColor: '#f8f8ff',
  },
  horizontalItem: {
    width: 0.25 * Dimensions.get('window').width - 20, // to have four items
    backgroundColor: '#e8e8f8',
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});
