import React, { useEffect, useRef } from 'react';
import { View, } from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

const Splashscreen = ({ navigation }) => {
  const animation = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Loginscreen")
    }, 3000);
  }, []);

  return (
    <View style={tw`flex-1 bg-teal-200 justify-center items-center`}>
      <LottieView
        autoPlay
        ref={animation}
        style={tw`w-50 h-50`}
        source={require('../../assets/images/laundry.json')}
      />
    </View>
  );
};

export default Splashscreen;