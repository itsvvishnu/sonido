import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NumericInput from "react-native-numeric-input";
import { nightMode, fetchCountChange } from "../actions/settings";
import { connect } from "react-redux";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.settings.settings);
    return (
      <SafeAreaView
        style={[
          { width: "100%", height: "100%" },
          this.props.settings.settings.nightMode
            ? { backgroundColor: "#2a2c45" }
            : { backgroundColor: "#fff" },
        ]}
      >
        <View
          style={[
            styles.container,
            this.props.settings.settings.nightMode
              ? { backgroundColor: "#2a2c45" }
              : { backgroundColor: "#fff" },
          ]}
        >
          <View
            style={[
              styles.settingWrap,
              this.props.settings.settings.nightMode
                ? { backgroundColor: "#3a3c53" }
                : { backgroundColor: "#b8c1ce28" },
            ]}
          >
            <Text
              style={[
                styles.settingName,
                this.props.settings.settings.nightMode
                  ? { color: "#eeeeee" }
                  : { color: "#507dc5" },
              ]}
            >
              THEME
            </Text>
            <View style={styles.darkMode}>
              <Text
                style={[
                  styles.textDark,
                  this.props.settings.settings.nightMode
                    ? { color: "#7c7e8d" }
                    : { color: "#454550" },
                ]}
              >
                Use night mode
              </Text>
              <ToggleSwitch
                isOn={this.props.settings.settings.nightMode}
                label=""
                onColor="#4fb9e1"
                offColor="#b8c1ce"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="medium"
                onToggle={() =>
                  this.props.nightMode(!this.props.settings.settings.nightMode)
                }
              />
            </View>
          </View>

          <View
            style={[
              styles.settingWrap,
              this.props.settings.settings.nightMode
                ? { backgroundColor: "#3a3c53" }
                : { backgroundColor: "#b8c1ce28" },
            ]}
          >
            <Text
              style={[
                styles.settingName,
                this.props.settings.settings.nightMode
                  ? { color: "#eeeeee" }
                  : { color: "#507dc5" },
              ]}
            >
              FETCH COUNT
            </Text>
            <View style={styles.darkMode}>
              <Text
                style={[
                  styles.textDark,
                  this.props.settings.settings.nightMode
                    ? { color: "#7c7e8d" }
                    : { color: "#454550" },
                ]}
              >
                No. of stations
              </Text>
              <NumericInput
                initValue={this.props.settings.settings.count}
                value={this.props.settings.settings.count}
                onChange={(value) => this.props.counter(value.toString())}
                rounded
                step={5}
                minValue={5}
                maxValue={50}
                textColor={
                  this.props.settings.settings.nightMode ? "#fff" : "#454550"
                }
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#4f8fe1"
                leftButtonBackgroundColor="#4fb9e1"
                totalHeight={35}
                borderColor="#b8c1ce19"
              />
            </View>
          </View>
          <View
            style={[
              styles.settingWrap,
              { paddingTop: 20, flexWrap: "wrap" },
              this.props.settings.settings.nightMode
                ? { backgroundColor: "#3a3c53" }
                : { backgroundColor: "#b8c1ce28" },
            ]}
          >
            <Text
              style={[
                styles.settingName,
                this.props.settings.settings.nightMode
                  ? { color: "#eeeeee" }
                  : { color: "#507dc5" },
              ]}
            >
              ABOUT
            </Text>
            <View style={styles.darkMode}>
              <Text
                style={[
                  styles.about,
                  this.props.settings.settings.nightMode
                    ? { color: "#7c7e8d" }
                    : { color: "#454550" },
                ]}
              >
                Sonido is an online radio streaming app which uses the list from{" "}
                {"\u00a0"}
                <Text
                  style={{ color: "#4fb9e1", textDecorationLine: "underline" }}
                  onPress={() =>
                    Linking.openURL("https://fr1.api.radio-browser.info")
                  }
                >
                  www.fr1.api.radio-browser.info
                </Text>
                {"\n"}
                {"\n"}
                <Text>
                  Sonido is absoulutely <Text>FREE</Text> to everyone.
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Created with</Text>
            <Icon
              name="ios-heart"
              color="#ee5e97"
              size={16}
              style={styles.featIcon}
            />
            <Text style={styles.footerText}>by</Text>
            <Text
              style={{ color: "#ee5e97bb", textDecorationLine: "underline" }}
              onPress={() => Linking.openURL("https://github.com/itsvvishnu")}
            >
              Vishnu(@itsvvishnu)
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { settings: state };
};
const mapDispatchToprops = (dispatch) => {
  return {
    nightMode: (status) => dispatch(nightMode(status)),
    counter: (count) => dispatch(fetchCountChange(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    // width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    marginHorizontal: 5,
    paddingTop: 18,
  },
  darkMode: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDark: {
    fontSize: 17,
    color: "#454550",
  },
  settingName: {
    paddingBottom: 15,
    fontSize: 14,
    fontWeight: "bold",
    opacity: 1,
  },
  settingWrap: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  footerText: {
    color: "#b8c0ce",
    marginRight: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  featIcon: {
    marginRight: 5,
  },
  about: {
    lineHeight: 25,
    fontSize: 17,
  },
});
