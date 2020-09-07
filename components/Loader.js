import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';


export default class Loader extends React.Component{
    render(){
        return(
            <View>
                <Text style={styles.loader}>
                    Loading...
                </Text>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    loader:{
        fontSize:26,
        color:"#f16364"
    }
})