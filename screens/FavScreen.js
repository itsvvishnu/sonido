import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  fetchFavourites,
  addToFavouritesThenSave,
} from "../actions/favourites";
import { ImageLoader } from "react-native-image-fallback";
import fallbackImage from "../assets/fallback.png";
import Icon from "react-native-vector-icons/Ionicons";
import { Searchbar } from "react-native-paper";
import { playStation } from "../actions/player";

class FavScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconColor: this.props.stationData.settings.nightMode
        ? "#9696a2"
        : "#b8c0ce",
      query: "",
      favs: [],
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.focused = this.focused.bind(this);
  }
  playStationAndNavigate(item) {
    this.props.play(item);
    this.props.navigation.navigate("Home");
  }
  focused = () => {
    this.setState({
      iconColor: this.props.stationData.settings.nightMode
        ? "#eeeeee"
        : "#454550",
    });
  };
  changeQuery(val) {
    this.setState({
      query: val,
    });
    console.log(this.state.query);
    if (val === "") {
      this.props.favourites(false);
    }
  }
  submitQuery() {
    this.setState({
      resultIsLoading: true,
      iconColor: "#b8c0ce",
    });
    let query = this.state.query;
    query = query.toLowerCase();
    if (query !== "") {
      this.props.favourites(true, query);
    }
  }

  render() {
    let uicontent = (
      <FlatList
        extraData={this.state.favs}
        style={styles.favFlatlist}
        keyExtractor={(item) => item.stationuuid}
        data={this.props.stationData.favData.favourites}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.playStationAndNavigate(item)}>
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
                    this.props.removeFav(
                      item,
                      this.props.stationData.favData.favourites
                    )
                  }
                >
                  <Icon name="ios-heart-dislike" color={"#ee5e97"} size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
    if (
      !(
        Array.isArray(this.props.stationData.favData.favourites) &&
        this.props.stationData.favData.favourites.length
      )
    ) {
      uicontent = (
        <View style={styles.containerCenter}>
          <Text style={{ fontSize: 20 }}>Add some stations</Text>
        </View>
      );
    }
    return (
      <View
        style={[
          styles.container,
          this.props.stationData.settings.nightMode
            ? { backgroundColor: "#2c2c44" }
            : { backgroundColor: "#fff" },
        ]}
      >
        <SafeAreaView style={{ width: "100%" }}>
          <View style={styles.stationTitleWrap}>
            <View style={styles.favSeachContainer}>
              <Searchbar
                round="true"
                inputStyle={{ fontSize: 14, color: this.state.iconColor }}
                iconColor={this.state.iconColor}
                style={[
                  { borderRadius: 200, height: 40 },
                  this.props.stationData.settings.nightMode
                    ? { backgroundColor: "#3a3c53" }
                    : { backgroundColor: "#fff" },
                ]}
                placeholderTextColor={
                  this.props.stationData.settings.nightMode
                    ? "#9696a2"
                    : "#b8c0ce"
                }
                placeholder="Search favourites"
                onChangeText={(val) => this.changeQuery(val)}
                value={this.state.query}
                onFocus={() => this.focused()}
                onSubmitEditing={() => this.submitQuery()}
                icon={() => (
                  <Icon
                    name="ios-search"
                    color={this.state.iconColor}
                    size={22}
                  />
                )}
              />
            </View>

            {uicontent}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return { stationData: state };
};
const mapDispatchToprops = (dispatch) => {
  return {
    favourites: (isActive, query) => dispatch(fetchFavourites(isActive, query)),
    removeFav: (item, curr) => dispatch(addToFavouritesThenSave(item, curr)),
    play: (station) => dispatch(playStation(station)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(FavScreen);

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
    height: "100%",
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
    paddingVertical: 15,
  },
  featFlatlist: {
    paddingHorizontal: 10,
    marginHorizontal: -10,
    width: "100%",
  },
  featItem: {
    backgroundColor: "#f16364",
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  featText: {
    color: "#fff",
  },
  featIcon: {
    paddingHorizontal: 5,
  },
  favFlatlist: {
    marginTop: 10,
  },
  favSeachContainer: {
    paddingHorizontal: 8,
    paddingTop: 18,
  },
});
