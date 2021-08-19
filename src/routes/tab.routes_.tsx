import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import IconBadge from 'react-native-icon-badge';
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';
import Cart from '../pages/Cart';
// import Orders from '../pages/Orders';
import { useCart } from '../hooks/cart';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const { products } = useCart();

  const totalItensInCart = useMemo(() => {
    const quantitySum = products.reduce((a, b) => a + b.quantity, 0);

    return quantitySum;
  }, [products]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelPosition: 'beside-icon',
        activeTintColor: '#C72828',
        labelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          fontWeight: '600',
        },
        inactiveTintColor: '#B7B7CC',
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="list" color={color} />
          ),
          title: 'Listagem',
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ color }) => (
            <IconBadge
              MainElement={
                <Icon size={25} name="shopping-cart" color={color} />
              }
              BadgeElement={
                <Text style={{ color: 'white' }}>{totalItensInCart}</Text>
              }
              IconBadgeStyle={{
                width: 18,
                height: 18,
                top: -8,
                left: 12,
              }}
              Hidden={totalItensInCart === 0}
            />
          ),
          title: 'Carrinho',
        }}
        component={Cart}
      />

      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="heart" color={color} />
          ),
          title: 'Favoritos',
        }}
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
