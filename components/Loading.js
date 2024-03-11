import React from 'react';
import * as Progress from 'react-native-progress';
import {Dimensions, View, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={styles.loadingCont}>
      <Progress.CircleSnail size={160} color={['#eab308', 'white']} thickness={12} />
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
    paddingTop: '40%',
  },
});
