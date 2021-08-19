import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../pages/Dashboard';
// import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <App.Navigator initialRouteName="Home">
      <App.Screen
        options={{
          cardStyle: { backgroundColor: '#C72828' },
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <App.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <App.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#FFB84D"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Produto - Detalhe',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#C72828',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
      <App.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#FFB84D"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Carrinho',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#C72828',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
    </App.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
