import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import md5 from 'md5';
import Logo from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';

import {
  Container,
  Header,
  FilterContainer,
  Title,
  ProductsContainer,
  ProductList,
  ProductItem,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductPricing,
  PriceContainer,
  ProductButton,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

// interface Products {
//   id: number;
//   title: string;
//   name: string;
//   thumbnail: any;
//   prices: any;
//   resourceURI: string;
// }

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: string): Promise<void> {
    // Navigate do ProductDetails page
    navigation.navigate('FoodDetails', { id });
  }

  // useEffect(() => {
  //   async function loadFoods(): Promise<void> {
  //     // Load Foods from API
  //     const response = await api.get('/foods', {
  //       params: {
  //         name_like: searchValue,
  //         category_like: !selectedCategory ? 0 : selectedCategory,
  //       },
  //     });
  //     setFoods(response.data);
  //   }

  //   loadFoods();
  // }, [selectedCategory, searchValue]);

  // useEffect(() => {
  //   async function loadCategories(): Promise<void> {
  //     // Load categories from API
  //     const response = await api.get('/categories');
  //     setCategories(response.data);
  //   }

  //   loadCategories();
  // }, []);
  function handleAddToCart(item: Product): void {
    addToCart(item);
  }

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const timestamp = Number(new Date());

      const PRIVATE_KEY = 'e305fc4717aba53023feb0aa17cab6b2c15d246b';
      const PUBLIC_KEY = '22903f2fa262983ce86cb55a86b30d78';

      const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
      console.log('timestamp', timestamp);
      console.log('PUBLIC_KEY', PUBLIC_KEY);
      console.log('hash', hash);

      // const response = await fetch(
      //  `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&limit=10&apikey=${PUBLIC_KEY}&hash=${hash}`,
      // );
      // const responseJson = await response.json();

      const responseJson = await api
        .get(`/comics?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          const newProducts = response.data.data.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            image_url: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            price: item.prices[0].price,
          }));
          setProducts(newProducts);
        });
    }

    loadProducts();
  }, []);

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <Icon
          name="log-out"
          size={24}
          color="#FFB84D"
          onPress={() => navigation.navigate('Home')}
        />
      </Header>
      <FilterContainer>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Localize seu quadrinho"
        />
      </FilterContainer>
      <ScrollView>
        <ProductsContainer>
          <Title>Quadrinhos</Title>
          <ProductList>
            {products.map(product => (
              <ProductItem
                key={product.id}
                activeOpacity={0.6}
                testID={`product-${product.id}`}
              >
                <ProductImageContainer>
                  <Image
                    style={{ height: 90, width: 90, borderRadius: 10 }}
                    source={{
                      uri: `${product.image_url}`,
                    }}
                  />
                </ProductImageContainer>
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.title}</ProductDescription>
                  <PriceContainer>
                    <ProductPricing>
                      {formatValue(product.price)}
                    </ProductPricing>
                    <ProductButton
                      testID={`add-to-cart-${product.id}`}
                      onPress={() => handleAddToCart(product)}
                    >
                      <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                    </ProductButton>
                  </PriceContainer>
                </ProductContent>
              </ProductItem>
            ))}
          </ProductList>
        </ProductsContainer>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
