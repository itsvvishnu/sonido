import { nightMode } from "../actions/settings";
import { connect } from "react-redux";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import FavScreen from "./FavScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();

class BottomTab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor={
          this.props.settings.settings.nightMode ? "#eeeeee" : "#507dc5"
        }
        labelStyle={{ fontSize: 12 }}
        inactiveColor={
          this.props.settings.settings.nightMode ? "#9696a2" : "#b8c0ce"
        }
        shifting={false}
        barStyle={
          this.props.settings.settings.nightMode
            ? { backgroundColor: "#2c2c44" }
            : { backgroundColor: "#ffffff" }
        }
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Stations"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Stations',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-search" color={color} size={26} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Favourites"
          component={FavScreen}
          options={{
            tabBarLabel: "Favourites",
            tabBarIcon: ({ color }) => (
              <Icon name="ios-heart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <Icon name="ios-settings" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
const mapStateToProps = (state) => {
  return { settings: state };
};
const mapDispatchToprops = (dispatch) => {
  return {
    nightMode: () => dispatch(nightMode()),
  };
};
export default connect(mapStateToProps, mapDispatchToprops)(BottomTab);
