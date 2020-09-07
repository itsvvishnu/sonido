import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
	TouchableOpacity,
	TextInput,
	SafeAreaViewBase
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ImageLoader } from "react-native-image-fallback";
import { connect } from "react-redux";
import { fetchStations, searchStation, toggleSelectionBar } from "../actions/station";
import { playStation, changeStation } from "../actions/player";
import { Searchbar } from "react-native-paper";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      resultsLoaded: false,
      loadedStations: [],
      resultIsLoading: false,
      iconColor:this.props.stationData.settings.nightMode? "#9696a2" : "#b8c0ce",
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.focused = this.focused.bind(this);
  }
  focused = () =>{
    this.setState({
      iconColor:this.props.stationData.settings.nightMode ? '#eeeeee':'#454550'
    })
  }
  changeQuery(val) {
    this.setState({
      query: val,
    });
    console.log(this.state.query);
    if(val===''){
      switch (this.props.lastData) {
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
      this.props.toggle();
    }
  }
  async submitQuery() {
    this.setState({
      resultIsLoading: true,
      iconColor:"#b8c0ce"
    });
    this.props.toggle();
		let query = this.state.query;
		if(query!==''){
			this.props.search(query);
		}
    // this.setState({
    // 	loadedStations:json,
    // 	resultsLoaded:true,
    // 	query:'',
    // 	resultIsLoading:false
    // });
    // console.log(this.state);
    // this.setState({
    // 	resultsLoaded:true
    // })
  }
  render() {
    // console.log(this.props);
    return (
      <View style={this.props.stationData.settings.nightMode ? {backgroundColor: "#282d43"} :{backgroundColor: "#fff"}}>
				<SafeAreaView>
				<View style={styles.searchWrapper}>
          {/* <View style={styles.search}> */}
            {/* <Icon name="ios-search" color="#b8c0ce" size={22} style={{marginRight:10}} /> */}
            <Searchbar 
              inputStyle={{fontSize: 14,
              color:this.state.iconColor}}
              iconColor={this.state.iconColor}
              style={[{borderRadius:200,height:40},this.props.stationData.settings.nightMode ? {backgroundColor:"#3a3c53"}:{backgroundColor:"#fff"}]}
              placeholderTextColor={this.props.stationData.settings.nightMode ? '#9696a2':'#b8c0ce'}
              placeholder="Search stations"
              onChangeText={(val) => this.changeQuery(val)}
              value={this.state.query}
              onFocus = {()=>this.focused()}
              onSubmitEditing={() => this.submitQuery()}
              icon = { () => <Icon
                name="ios-search"
                color={this.state.iconColor}
                size={22}
              />}
            />
          {/* </View> */}
        </View>
				</SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return { stationData: state };
};
const mapDispatchToprops = (dispatch) => {
  return {
    play: (station) => dispatch(changeStation(station)),
    search: (query) => dispatch(searchStation(query)),
    loadStations:(cat) => dispatch(fetchStations(cat)),
		toggle:() => dispatch(toggleSelectionBar())	
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SearchScreen);

const styles = StyleSheet.create({
  searchWrapper: {
    marginTop: 18,
    marginBottom:2,
    marginHorizontal: 8,
		borderRadius: 8,
	}
});
