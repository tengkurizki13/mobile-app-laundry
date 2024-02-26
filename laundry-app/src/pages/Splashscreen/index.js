import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

const Splashscreen = ({ navigation }) => {
  const animation = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate("MainApp")
      navigation.navigate("Loginscreen")
    }, 2000);
  }, []);

  return (
    <View style={tw`flex-1 bg-white justify-center items-center bg-lime-400`}>
      <LottieView
        autoPlay
        ref={animation}
        style={tw`w-20 h-20`}
        source={require('../../assets/images/laundry.json')}
      />
    </View>
  );
};

export default Splashscreen;