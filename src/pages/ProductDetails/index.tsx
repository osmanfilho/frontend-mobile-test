import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';

import api from '../../services/api';

import Product from '../../models/Product';

import {
  Container,
  Header,
  ScrollContainer,
  ProductsContainer,
  ProductItem,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductPricing,
  AddButtonContainer,
  AddButton,
  AddButtonText,
  AddButtonIconContainer,
  ProductDescription,
  PricingContainer,
} from './styles';

interface Params {
  product: Product;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState({} as Product);

  const { addToCart } = useCart();

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      // Load a specific product with extras based on routeParams id
      const productParams = routeParams.product;

      setProduct(productParams);
    }

    loadProduct();
  }, [routeParams]);

  // const toggleFavorite = useCallback(() => {
  //   // Toggle if product is favorite or not
  //   setIsFavorite(!isFavorite);
  // }, [isFavorite]);

  async function handleAddToCart(item: Product): Promise<void> {
    addToCart(item);

    return navigation.navigate('Cart');
  }

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <ProductsContainer>
          <ProductItem>
            <ProductImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: product.image_url,
                }}
              />
            </ProductImageContainer>
            <ProductContent>
              <ProductTitle>{product.title}</ProductTitle>
            </ProductContent>
          </ProductItem>
        </ProductsContainer>
        <ProductsContainer>
          <ProductDescription>{product.description}</ProductDescription>
        </ProductsContainer>

        <PricingContainer>
          <ProductPricing>{formatValue(product.price)}</ProductPricing>
          <AddButtonContainer>
            <AddButton onPress={() => handleAddToCart(product)}>
              <AddButtonText>Adicionar ao carrinho</AddButtonText>
              <AddButtonIconContainer>
                <Icon name="shopping-cart" size={24} color="#7A1818" />
              </AddButtonIconContainer>
            </AddButton>
          </AddButtonContainer>
        </PricingContainer>
      </ScrollContainer>
    </Container>
  );
};

export default ProductDetails;
