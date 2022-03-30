import * as React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';

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

    onRegionChange = (region) => {
        this.setState({ region });
    }

    render () {
        return (
            <View style={{marginTop: 50, flex: 1}}>
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
                    placeholderTextColor={'#666'}>
                </TextInput>
                <Marker coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}/>
                <Marker
                    coordinate={this.state.pin}
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinates)
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout>
                        <Text>Your location</Text>
                    </Callout>
                </Marker>

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
