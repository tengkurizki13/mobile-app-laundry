// router.js
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splashscreen,Trackscreen,FormAddRequestscreen,FormUpdateRequestscreen,FormAddUserscreen,FormUpdateUserscreen,Qrcodescreen,Loginscreen,Statisticscreen } from '../pages';
import MainApp from './MainApp';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splashscreen" component={Splashscreen} />
      <Stack.Screen name="Trackscreen" component={Trackscreen} />
      <Stack.Screen name="FormAddRequestscreen" component={FormAddRequestscreen} />
      <Stack.Screen name="FormAddUserscreen" component={FormAddUserscreen} />
      <Stack.Screen name="FormUpdateRequestscreen" component={FormUpdateRequestscreen} />
      <Stack.Screen name="FormUpdateUserscreen" component={FormUpdateUserscreen} />
      <Stack.Screen name="Qrcodescreen" component={Qrcodescreen} />
      <Stack.Screen name="Loginscreen" component={Loginscreen} />
      <Stack.Screen name="Statisticscreen" component={Statisticscreen} />
      <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  );
};

export default Router;