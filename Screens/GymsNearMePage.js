import * as React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function App() {
    const [pin, setPin] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324
    });

    const [place, setPlace] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    return (
        <View style={{marginTop: 50, flex: 1}}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setPlace({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }}
                query={{
                    key: "AIzaSyDWtmCdM1fnzsjtw2xKsQGJBPoooW3wl8s",
                    language: "en",
                    components: "country:us",
                    types: "establishment",
                    radius: 30000,
                    location: `${place.latitude}, ${place.longitude}`
                }}
                styles={{
                    container: {flex: 0, position: "absolute", width: "100%", zIndex: 1},
                    listView: {backgroundColor: "white"}
                }}
            />
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: 37.78825,
                         longitude: -122.4324,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421
                     }}
                     provider="google"
            >
                <Marker coordinate={{latitude: place.latitude, longitude: place.longitude}}/>
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }}
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