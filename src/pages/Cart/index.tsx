import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Image, ScrollView } from 'react-native';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
  ProductPriceContainer,
  ProductPriceContainer2,
  ProductPrice,
  ProductQuantity,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    const cartTotalSum = products.reduce((a, b) => a + b.quantity * b.price, 0);

    return formatValue(cartTotalSum);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const quantitySum = products.reduce((a, b) => a + b.quantity, 0);

    return quantitySum;
  }, [products]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Carrinho</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 68, height: 68, borderRadius: 10 }}
                  source={{ uri: item.image_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.title}</FoodTitle>
                <ProductPriceContainer2>
                  <ProductPriceContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </ProductPrice>
                  </ProductPriceContainer>

                  <ActionContainer>
                    <ActionButton
                      testID={`increment-${item.id}`}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <FeatherIcon name="plus" color="#E83F5B" size={16} />
                    </ActionButton>
                    <ActionButton
                      testID={`decrement-${item.id}`}
                      onPress={() => handleDecrement(item.id)}
                    >
                      <FeatherIcon name="minus" color="#E83F5B" size={16} />
                    </ActionButton>
                  </ActionContainer>
                </ProductPriceContainer2>
              </FoodContent>
            </Food>
          )}
        />
        <TotalProductsContainer>
          <FeatherIcon name="shopping-cart" color="#fff" size={24} />
          <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
          <SubtotalValue>{cartTotal}</SubtotalValue>
        </TotalProductsContainer>
      </FoodsContainer>
    </Container>
  );
};

export default Cart;
