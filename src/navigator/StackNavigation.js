import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen'
import ProductListing from '../screens/ProductListing'
import AddProductScreen from '../screens/AddProduct'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='ProductListing' component={ProductListing} />
            <Stack.Screen name='AddProduct' component={AddProductScreen} />
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation