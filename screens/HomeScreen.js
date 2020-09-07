import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Loader from "../components/Loader";
import PlayerUI from "../components/PlayerUI";
import fallbackImage from "../assets/fallback.png";
import { ImageLoader } from "react-native-image-fallback";
import { connect } from "react-redux";
import { fetchStations, toggleSelectionBar } from "../actions/station";
import { playStation } from "../actions/player";
import SearchScreen from "./SearchScreen";
import {
  addToFavouritesThenSave,
  fetchFavourites,
} from "../actions/favourites";
import * as SQLite from "expo-sqlite";
import NavigationBar from "react-native-navbar-color";

const db = SQLite.openDatabase("radiodb");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      featureSelections: [
        { key: "1", text: "Top click", icon: "ios-flash", isactive: true },
        {
          key: "2",
          text: "Highest voted",
          icon: "ios-thumbs-up",
          isactive: false,
        },
        { key: "3", text: "Recent clicks", icon: "ios-clock", isactive: false },
      ],
      itemPressed: "1",
    };
    SQLite.DEBUG = false;

    this.startPlayback = this.startPlayback.bind(this);
    this.playerHandler = this.playerHandler.bind(this);
    this.fetchByFeature = this.fetchByFeature.bind(this);
  }
  ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.transaction((trans) => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });

  componentDidUpdate() {
    try {
      if (Platform.OS == "android") {
        console.log("received prop = ? ");
        console.log(this.props.stationData.settings.nightMode);
        if (this.props.stationData.settings.nightMode === true) {
          console.log("nightMode");
          NavigationBar.setColor("#2c2c44");
        } else {
          console.log("white mode");
          NavigationBar.setColor("#ffffff");
        }
        // console.log(response)// {success: true}
      }
    } catch (e) {
      // console.log(e)// {success: false}
    }
  }
  async componentDidMount() {
    this.props.loadStations("topclick");
    this.props.fetchFavs(false, "");
    try {
      if (Platform.OS == "android") {
        console.log("android");
        if (this.props.stationData.settings.nightMode === true) {
          console.log("nightMode");
          NavigationBar.setColor("#2c2c44");
        } else {
          console.log("white mode");
          NavigationBar.setColor("#ffffff");
        }
        // console.log(response)// {success: true}
      }
    } catch (e) {
      // console.log(e)// {success: false}
    }
    await this.ExecuteQuery(
      "CREATE TABLE IF NOT EXISTS favourites (stationuuid VARCHAR(36) PRIMARY KEY NOT NULL, url_resolved VARCHAR(100),name VARCHAR(30),country VARCHAR(30) , favicon VARCHAR(30) )",
      []
    );
  }
  startPlayback = (item) => {
    this.props.play(item);
    // console.log(item);
  };
  playerHandler = () => {
    this.setState({
      play: !this.state.play,
    });
  };
  addToFav = (item) => {
    // console.log("press");
    // console.log(item);
    var selectedFavItems = [...this.state.selectedFavItems]; // clone state

    if (selectedFavItems.includes(item))
      selectedFavItems = selectedFavItems.filter((_id) => _id !== item);
    else selectedFavItems.push(item);
    this.setState({ selectedFavItems });
  };
  fetchByFeature = (selection) => {
    this.setState({
      itemPressed: selection,
    });
    switch (selection) {
      case "1":
        this.props.loadStations("topclick");
        break;
      case "2":
        this.props.loadStations("topvote");
        break;
      case "3":
        this.props.loadStations("lastclick");
        break;
    }
  };
  render() {
    // console.log(this.state.selectedFavItems);
    console.log("state from render homepage");
    console.log(this.props.stationData.favData.favourites);
    let selbar = null;
    if (this.props.stationData.stationData.showSelBar) {
      selbar = (
        <FlatList
          extraData={this.state}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.featFlatlist}
          data={this.state.featureSelections}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.fetchByFeature(item.key)}>
              <View
                style={[
                  styles.featItem,
                  this.state.itemPressed === item.key
                    ? { backgroundColor: "#4fb9e1" }
                    : this.props.stationData.settings.nightMode
                    ? { backgroundColor: "#3a3c53" }
                    : { backgroundColor: "#b8c1ce" },
                ]}
              >
                <Icon
                  name={item.icon}
                  color={
                    this.props.stationData.settings.nightMode
                      ? this.state.itemPressed === item.key
                        ? "#eeeeee"
                        : "#9696a2"
                      : "#fff"
                  }
                  size={16}
                  style={styles.featIcon}
                />
                <Text
                  style={
                    this.props.stationData.settings.nightMode
                      ? this.state.itemPressed === item.key
                        ? { color: "#eeeeee" }
                        : { color: "#9696a2" }
                      : { color: "#fff" }
                  }
                >
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    }
    let content = (
      <FlatList
        extraData={this.props}
        keyExtractor={(item) => item.stationuuid}
        data={this.props.stationData.stationData.stations}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.play(item)}>
            <View
              style={[
                styles.station,
                this.props.stationData.settings.nightMode
                  ? { backgroundColor: "#3a3c53", borderColor: "transparent" }
                  : { backgroundColor: "#fff", borderColor: "#b8c0ce44" },
              ]}
            >
              <View style={styles.imgWrap}>
                <ImageLoader
                  style={styles.imgLoader}
                  source={item.favicon}
                  fallback={fallbackImage}
                />
              </View>
              <View style={styles.textWrap}>
                <Text
                  numberOfLines={1}
                  style={
                    ({ width: 100 },
                    { fontSize: 16 },
                    this.props.stationData.settings.nightMode
                      ? { color: "#eeeeee" }
                      : { color: "#323742" })
                  }
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={
                    ({ width: 100 },
                    this.props.stationData.settings.nightMode
                      ? { color: "#9696a2" }
                      : { color: "#b8c0ce" })
                  }
                >
                  {item.country}
                </Text>
              </View>
              <View style={styles.stationControlsWrap}>
                <TouchableOpacity
                  style={styles.stationControlsWrap}
                  onPress={() =>
                    this.props.addFavourites(
                      item,
                      this.props.stationData.favData.favourites
                    )
                  }
                >
                  <Icon
                    name="ios-heart"
                    color={
                      this.props.stationData.favData.favourites.some(
                        (station) =>
                          station["stationuuid"] === item["stationuuid"]
                      )
                        ? "#ee5e97"
                        : this.props.stationData.settings.nightMode
                        ? "#9696a2"
                        : "#b8c0ce"
                    }
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
    if (this.props.stationData.stationData.isLoading) {
      content = (
        <View style={styles.containerCenter}>
          <Loader />
        </View>
      );
    }
    if (this.props.stationData.playerData.play) {
      return <PlayerUI />;
    }
    return (
      <View
        style={[
          styles.container,
          this.props.stationData.settings.nightMode
            ? { backgroundColor: "#282d43" }
            : { backgroundColor: "#fff" },
        ]}
      >
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
        <SafeAreaView style={{ width: "100%" }}>
          <View style={styles.stationTitleWrap}>
            <View style={{ width: "100%" }}>
              <SearchScreen
                style={{ width: "100%" }}
                lastData={this.state.itemPressed}
              />
            </View>
            <View style={styles.featOuter}>{selbar}</View>
            {content}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state from mmap");
  // console.log(state);
  return { stationData: state };
};
const mapDispatchToprops = (dispatch) => {
  return {
    play: (station) => dispatch(playStation(station)),
    loadStations: (cat) => dispatch(fetchStations(cat)),
    addFavourites: (item, curr) =>
      dispatch(addToFavouritesThenSave(item, curr)),
    fetchFavs: (isActive) => dispatch(fetchFavourites(isActive)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(HomeScreen);

// HomeScreen.propTypes = {
//   fetchStations: PropTypes.func.isRequired,
//   stationData: PropTypes.object.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  containerCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    alignSelf: "stretch",
  },
  station: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 8,
    marginBottom: 8,
    flexDirection: "row",
    // elevation: 1,
    borderWidth: 1,
    borderRadius: 4,
  },
  stationTitle: {
    fontSize: 30,
    // color: "#f16364",
    color: "#454550",
    paddingHorizontal: 10,
    // fontWeight:"bold",
    paddingVertical: 14,
    marginTop: 36,
    textAlign: "left",
    alignContent: "flex-start",
  },
  stationTitleWrap: {
    width: "100%",
    height: "100%",
  },
  image: {
    resizeMode: "cover",
  },
  imgLoader: {
    height: 60,
    width: 60,
  },
  imgWrap: {
    alignContent: "flex-start",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  textWrap: {
    paddingHorizontal: 20,
    width: "100%",
    flex: 1,
  },
  stationControlsWrap: {
    paddingHorizontal: 0,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  featOuter: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  featFlatlist: {
    // paddingHorizontal:10,
    // marginHorizontal:-10,
    width: "100%",
    marginBottom: 8,
  },
  featItem: {
    backgroundColor: "#f16364",
    flexDirection: "row",
    marginTop: 7,
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  featIcon: {
    paddingHorizontal: 5,
  },
});
