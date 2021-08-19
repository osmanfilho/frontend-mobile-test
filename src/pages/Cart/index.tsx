import React, { useMemo, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import Modal from '../../components/Modal';

import {
  Container,
  Header,
  HeaderTitle,
  ProductsContainer,
  ProductList,
  ProductItem,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductPricing,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  SubtotalValue,
  ProductPriceContainer,
  ProductPriceContainer2,
  ProductPrice,
  ProductQuantity,
  ScrollContainer,
  SubTotalLabel,
  DescontoLabel,
  TotalLabel,
  TotalContainer,
  SubTotalContainer,
  SubTotalPrice,
  DescontoPrice,
  TotalPrice,
  FinishOrderButton,
  ButtonText,
  IconContainer,
  Title,
  EmptyCartContainer,
  AddButton,
  AddButtonText,
  AddButtonIconContainer,
  TitleEmptyCart,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

const Cart: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { increment, decrement, products, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const cartSubTotal = useMemo(() => {
    const cartSubTotalSum = products.reduce(
      (a, b) => a + b.quantity * b.price,
      0,
    );

    return formatValue(cartSubTotalSum);
  }, [products]);

  const cartDiscount = useMemo(() => {
    const cartDiscountSum = products.reduce(
      (a, b) => a + (b.quantity * b.price * b.discount) / 100,
      0,
    );

    return formatValue(cartDiscountSum);
  }, [products]);

  const cartTotal = useMemo(() => {
    const cartTotalSum = products.reduce(
      (a, b) =>
        a + b.quantity * b.price - (b.quantity * b.price * b.discount) / 100,
      0,
    );

    return formatValue(cartTotalSum);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const quantitySum = products.reduce((a, b) => a + b.quantity, 0);

    return quantitySum;
  }, [products]);

  async function handleFinishOrder(): Promise<void> {
    // Finish the order and save on the API
    clearCart();

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigation.navigate('Dashboard');
    }, 2000);
  }

  async function handleNavigate(): Promise<void> {
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <Header />
      {products && products.length === 0 && (
        <EmptyCartContainer>
          <TitleEmptyCart>Carrinho Vazio</TitleEmptyCart>
          <AddButton onPress={() => handleNavigate()}>
            <AddButtonText>Adicionar itens</AddButtonText>
            <AddButtonIconContainer>
              <Icon name="shopping-cart" size={24} color="#7A1818" />
            </AddButtonIconContainer>
          </AddButton>
        </EmptyCartContainer>
      )}
      {showModal && <Modal />}
      <ScrollView>
        <ProductsContainer>
          <ProductList>
            {products.map(product => (
              <ProductItem activeOpacity={0.6}>
                <ProductImageContainer>
                  <Image
                    style={{ width: 68, height: 68, borderRadius: 10 }}
                    source={{ uri: product.image_url }}
                  />
                </ProductImageContainer>
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPriceContainer2>
                    <ProductPriceContainer>
                      <ProductQuantity>{`${product.quantity}x`}</ProductQuantity>

                      <ProductPrice>
                        {formatValue(product.price * product.quantity)}
                      </ProductPrice>
                    </ProductPriceContainer>

                    <ActionContainer>
                      <ActionButton
                        testID={`increment-${product.id}`}
                        onPress={() => handleIncrement(product.id)}
                      >
                        <FeatherIcon name="plus" color="#E83F5B" size={16} />
                      </ActionButton>
                      <ActionButton
                        testID={`decrement-${product.id}`}
                        onPress={() => handleDecrement(product.id)}
                      >
                        <FeatherIcon name="minus" color="#E83F5B" size={16} />
                      </ActionButton>
                    </ActionContainer>
                  </ProductPriceContainer2>
                </ProductContent>
              </ProductItem>
            ))}
          </ProductList>
          {products.length > 0 && (
            <>
              <EmptyCartContainer>
                <AddButton onPress={() => handleNavigate()}>
                  <AddButtonText>Adicionar outros itens</AddButtonText>
                  <AddButtonIconContainer>
                    <Icon name="shopping-cart" size={24} color="#7A1818" />
                  </AddButtonIconContainer>
                </AddButton>
              </EmptyCartContainer>

              <TotalContainer>
                <Title>Resumo de Valores</Title>
                <SubTotalContainer>
                  <SubTotalLabel>SubTotal</SubTotalLabel>
                  <SubTotalPrice testID="cart-subtotal">
                    {cartSubTotal}
                  </SubTotalPrice>
                </SubTotalContainer>
                <SubTotalContainer>
                  <DescontoLabel>Desconto</DescontoLabel>
                  <DescontoPrice testID="cart-discount">
                    - {cartDiscount}
                  </DescontoPrice>
                </SubTotalContainer>
                <SubTotalContainer>
                  <TotalLabel>Total</TotalLabel>
                  <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
                </SubTotalContainer>

                <FinishOrderButton onPress={() => handleFinishOrder()}>
                  <ButtonText>Confirmar pedido</ButtonText>
                  <IconContainer>
                    <Icon name="check-square" size={24} color="#fff" />
                  </IconContainer>
                </FinishOrderButton>
              </TotalContainer>
            </>
          )}
        </ProductsContainer>
      </ScrollView>
    </Container>
  );
};

export default Cart;
