import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
// import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import { ImageLoader } from "react-native-image-fallback";
import fallbackImage from "../assets/fallback.png";
import { connect } from "react-redux";
import { backToHome } from "../actions/player";
import { addToFavouritesThenSave } from "../actions/favourites";
import TrackPlayer from "react-native-track-player";

class PlayerUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      playing: false,
      disable: true,
      connection: true,
      pause: false,
    };
    this.togglePlayPause = this.togglePlayPause.bind(this);
  }
  componentDidUpdate() {
    console.log("update...");
  }
  componentDidMount() {
    console.log(this.props.stationData.playerData.stream);
    TrackPlayer.setupPlayer().then(() => {
      // The player is ready to be used
    });
    var track = {
      id: this.props.stationData.playerData.stream.stationuuid,
      url: this.props.stationData.playerData.stream.url_resolved,
    };
    TrackPlayer.add([track]);
    TrackPlayer.play();

    //   TrackPlayer.setupPlayer().then(() => {
    //     // The player is ready to be used

    // });
    // this.sound = new Audio.Sound();
    // this.sound.staysActiveInBackground = true;
    // try {
    //   await this.sound.loadAsync({
    //     uri: this.props.stationData.playerData.stream.url_resolved,
    //   });
    //   await this.sound.playAsync();
    // } catch (error) {
    //   this.setState({
    //     disable: false,
    //     connection: false,
    // });
    // }
    // this.sound.setStatusAsync({ progressUpdateIntervalMillis: 2000 });
    // this.sound._onPlaybackStatusUpdate = (playbackStatus) => {
    //   if (playbackStatus.isPlaying && playbackStatus.isLoaded) {
    //     this.setState({
    //       playing: true,
    //       disable: false,
    //     });
    //   }
    //   if(!playbackStatus.isPlaying){
    //     this.setState({
    //       playing:false
    //     })
    //   }
    // };
  }
  async togglePlayPause() {
    this.setState({
      play: !this.state.play,
    });
    if (this.state.play) {
      await this.sound.pauseAsync();
      this.setState({
        pause: true,
      });
    } else {
      await this.sound.playAsync();
      this.setState({
        pause: false,
      });
    }
  }
  async componentWillUnmount() {
    await this.sound.unloadAsync();
  }
  render() {
    let errorMessage = null;
    if (this.state.connection === false) {
      errorMessage = <Text style={styles.msg}>Can't connect!</Text>;
    } else if (this.state.playing === false && !this.state.pause) {
      errorMessage = <Text style={styles.msg}>Please wait...</Text>;
    }

    return (
      <SafeAreaView style={{ width: "100%" }}>
        <StatusBar
          barStyle={
            this.props.stationData.settings.nightMode
              ? "light-content"
              : "dark-content"
          }
          backgroundColor={
            this.props.stationData.settings.nightMode ? "#282d43" : "#fff"
          }
        />
        <View
          style={[
            styles.container,
            this.props.stationData.settings.nightMode
              ? { backgroundColor: "#282d43" }
              : { backgroundColor: "#fff" },
          ]}
        >
          <View style={styles.topSection}>
            <View style={styles.backToHomeButton}>
              <TouchableOpacity
                disabled={this.state.disable}
                onPress={() => this.props.back()}
                style={styles.backToHomeButton}
              >
                <Icon
                  name="ios-arrow-back"
                  color={this.state.disable ? "#b8c0ce" : "#507dc5"}
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
              key={this.props.stationData.playerData.stream.url}
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
          <View styles={styles.errorMsg}>{errorMessage}</View>
        </View>
      </SafeAreaView>
    );
  }
}

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
