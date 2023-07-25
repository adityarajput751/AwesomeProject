import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import StackNavigation from './src/navigator/StackNavigation'
import ProductListing from './src/screens/ProductListing'
import AddProductScreen from './src/screens/AddProduct'

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StackNavigation />
      {/* <ProductListing /> */}
      {/* <AddProductScreen /> */}
    </View>
  )
}

export default App