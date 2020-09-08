import React, { Component } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        {/* <PulseIndicator color="#4fb9e1" size={40} /> */}
        <BarIndicator color="#4fb9e1" count={5} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    fontSize: 18,
    marginTop: 20,
    color: "#4fb9e1",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
