import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
// add css style for android safearea view

// importing google fonts
import { 
  Righteous_400Regular 
} from '@expo-google-fonts/righteous';

export default function App() {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Fit
        <Text styles={styles.blueText}>Me</Text>
        <Image source={require("./assets/barbell.png")}/>
      </Text>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    fontFamily: 'Righteous',
    backgroundColor: 'white',
    alignItems: 'center',
  
    // justifyContent: 'center',
  },

  text: {
    color: '#424242',
    fontFamily: 'Righteous_400Regular',
  },

  blueText: {
    color: 'yellow',
  },

});
