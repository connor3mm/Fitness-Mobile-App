import * as React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import { Search } from "semantic-ui-react";
import _ from "lodash";

export default class GymsNearMe extends React.Component {
    state = {
        region: {latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
        pin: {
            latitude: 37.78825,
            longitude: -122.4324
        },
        results: [],
        selectedResult: null,
        location: "",
        errorMsg: ""
    }

    handleSearchChange = async (event, { value }) => {
        try {
          const response = await fetch(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${value}`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "917c08bb69d34a30a95f237a1832b1a3"
              }
            }
          );
          const data = await response.json();
          const resultsRaw = data.suggestionGroups[0].searchSuggestions;
          const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
          this.setState({ results });
        } catch (error) {
          console.error(`Error fetching search ${value}`);
        }
      };

    handleResultSelect = (e, { result }) => this.setState({ selectedResult: result });

    onRegionChange = (region) => {
        this.setState({ region });
    }

    render () {
        return (
            <View style={{ flex: 1}}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Homepage')}
                                  style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 30,}}>
                    <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}}
                           source={require('../assets/img/angle-left.png')}/>
                    <Text style={{ textDecorationLine: 'underline', alignSelf: 'center',
                        fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                        Dashboard
                    </Text>
                </TouchableOpacity>

            <MapView style={styles.map}
                     initialRegion={{
                         latitude: 37.78825,
                         longitude: -122.4324,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421
                     }}
                     provider="google"
                     showUserLocation={true}
                     region={this.state.region}
                     onRegionChange={this.onRegionChange}
                     
            >
                <TextInput
                    style={{
                        borderRadius: 10,
                        margin: 10,
                        color: '#000',
                        borderColor: '#666',
                        backgroundColor: '#FFF',
                        borderWidth: 1,
                        height: 45,
                        paddingHorizontal: 10,
                        fontSize: 18,
                      }} 
                    placeholder={'Search'}
                    placeholderTextColor={'#666'}
                    onChangeText={_.debounce(this.handleSearchChange, 1000, {
                        leading: true
                      })}
                    >
                </TextInput>


                <Marker coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}/>
            </MapView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
