import React from 'react';
import * as Progress from 'react-native-progress';
import {Dimensions, View, StyleSheet, Text} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function SmallLoading() {
  return (
    <View style={styles.loadingCont}>
      <Progress.CircleSnail size={35} color={['#eab308', 'white']} thickness={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingCont: {
    height: height,
    width: width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '50%',

    position: 'absolute',
    zIndex: 50,
    left: 155,
  },
});
