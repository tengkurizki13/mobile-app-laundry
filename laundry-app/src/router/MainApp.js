import React from 'react'
import { Homescreen,Userscreen,Statisticscreen } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ButtomTabs from '../components/molecus/BottomTabs';



const Tab = createBottomTabNavigator();


function MainApp() {
  return (
    <Tab.Navigator screenOptions={{ headerShown:false }} tabBar={props => <ButtomTabs {...props} />}>
      <Tab.Screen name="Homescreen" component={Homescreen} />
      <Tab.Screen name="Userscreen" component={Userscreen} />
    </Tab.Navigator>
    
  );
}


export default MainApp
