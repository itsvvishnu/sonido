import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ImageLoader } from "react-native-image-fallback";
import fallbackImage from "../assets/fallback.png";
import { connect } from "react-redux";
import { backToHome } from "../actions/player";
import { addToFavouritesThenSave } from "../actions/favourites";
import TrackPlayer, {
  useTrackPlayerProgress,
  TrackPlayerEvents,
} from "react-native-track-player";

class PlayerUI extends Component {
  constructor(props) {
    super(props);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.state = {
      play: true,
      isBuffering: false,
    };
  }

  componentDidUpdate() {
    console.log(this.props.stationData.playerData.stream.url);
    TrackPlayer.setupPlayer().then(() => {});
    TrackPlayer.add([
      this.props.stationData.playerData.stream,
    ]).then(function () {});
    if (this.state.play) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }
  componentDidMount() {
    TrackPlayer.updateOptions({
      // An array of capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
      // Icons for the notification on Android (if you don't like the default ones)
      // playIcon: require("./play-icon.png"),
      // pauseIcon: require("./pause-icon.png"),
      // stopIcon: require("./stop-icon.png"),
      // previousIcon: require("./previous-icon.png"),
      // nextIcon: require("./next-icon.png"),
      icon: require("../assets/notification.png"),
      // The notification icon
    });
    TrackPlayer.add([
      this.props.stationData.playerData.stream,
    ]).then(function () {});
    if (this.state.play) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }

  togglePlayPause() {
    this.setState({
      play: !this.state.play,
    });
  }
  componentWillUnmount() {
    TrackPlayer.destroy();
  }
  render() {
    return (
      <SafeAreaView style={{ width: "100%" }}>
        <StatusBar
          barStyle={
            this.props.stationData.settings.nightMode
              ? "light-content"
              : "dark-content"
          }
          backgroundColor={
            this.props.stationData.settings.nightMode ? "#2c2c44" : "#fff"
          }
        />
        <View
          style={[
            styles.container,
            this.props.stationData.settings.nightMode
              ? { backgroundColor: "#2c2c44" }
              : { backgroundColor: "#fff" },
          ]}
        >
          <View style={styles.topSection}>
            <View style={styles.backToHomeButton}>
              <TouchableOpacity
                // disabled={this.state.disable}
                onPress={() => this.props.back()}
                style={styles.backToHomeButton}
              >
                <Icon
                  name="ios-arrow-back"
                  // color={this.state.disable ? "#b8c0ce" : "#507dc5"}
                  color={
                    this.props.stationData.settings.nightMode
                      ? "#eeeeee"
                      : "#507dc5"
                  }
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[
                  styles.nowPlaying,
                  this.props.stationData.settings.nightMode
                    ? { color: "#eeeeee" }
                    : { color: "#323742" },
                ]}
              >
                Now Playing
              </Text>
            </View>
            <View style={styles.backToHomeButton}>
              <TouchableOpacity
                onPress={() =>
                  this.props.addFavourites(
                    this.props.stationData.playerData.stream,
                    this.props.stationData.favData.favourites
                  )
                }
              >
                <Icon
                  name="ios-heart"
                  color={
                    this.props.stationData.favData.favourites.some(
                      (station) =>
                        station["stationuuid"] ===
                        this.props.stationData.playerData.stream["stationuuid"]
                    )
                      ? "#ee5e97"
                      : "#b8c0ce"
                  }
                  size={26}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.albumOuter}>
            <ImageLoader
              style={styles.stationAlbum}
              source={this.props.stationData.playerData.stream.favicon}
              fallback={fallbackImage}
              key={this.props.stationData.playerData.stream.favicon}
            />
          </View>
          <View style={styles.stationDet}>
            <Text
              style={[
                styles.stationTitle,
                this.props.stationData.settings.nightMode
                  ? { color: "#eeeeee" }
                  : { color: "#323742" },
              ]}
            >
              {this.props.stationData.playerData.stream.name}
            </Text>
            <Text
              style={[
                styles.stationCountry,
                this.props.stationData.settings.nightMode
                  ? { color: "#9696a2" }
                  : { color: "#b8c0ce" },
              ]}
            >
              {this.props.stationData.playerData.stream.country}
            </Text>
          </View>
          <View style={styles.control}>
            <TouchableOpacity onPress={this.togglePlayPause}>
              <Icon
                name={this.state.play ? "ios-pause" : "ios-play"}
                color={"#4fb9e1"}
                size={42}
              />
            </TouchableOpacity>
          </View>
          {/* <View styles={styles.errorMsg}>{errorMessage}</View> */}
          {this.state.play ? <MyComponent /> : null}
        </View>
      </SafeAreaView>
    );
  }
}
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
];

const MyComponent = () => {
  const { bufferedPosition } = useTrackPlayerProgress();
  return (
    <View style={styles.errorMsg}>
      <Text style={styles.msg}>
        {bufferedPosition > 10 ? "" : "Buffering..."}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { stationData: state };
};
const dispatchStateToProps = (dispatch) => {
  return {
    back: () => dispatch(backToHome()),
    addFavourites: (item, curr) =>
      dispatch(addToFavouritesThenSave(item, curr)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(PlayerUI);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginTop: 18,
    width: "100%",
    paddingHorizontal: 8,
  },
  nowPlaying: {
    fontSize: 20,
    letterSpacing: 1.5,
  },
  backToHomeButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  albumOuter: {
    // borderRadius:300,
    // backgroundColor:'pink',
    marginTop: 80,
    alignItems: "center",
    // justifyContent: "center",
  },
  stationAlbum: {
    height: 200,
    width: 200,
    // borderRadius:200,
  },
  stationDet: {
    paddingTop: 20,
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  stationTitle: {
    fontSize: 18,
  },
  stationCountry: {
    marginTop: 5,
  },
  control: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsg: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  msg: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
    color: "#4fb9e1",
  },
});
