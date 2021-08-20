import React, { useEffect, useState, useCallback } from 'react';
import { Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import md5 from 'md5';
import { PUBLIC_KEY, PRIVATE_KEY } from '@env';
import Logo from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import Product from '../../models/Product';
import FloatingCart from '../../components/FloatingCart';

import {
  Container,
  Header,
  FilterContainer,
  ProductList,
  ProductItem,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductPricing,
  PriceContainer,
  ProductButton,
  Loading,
  RareContainer,
} from './styles';

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { addToCart, totalItensInCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function loadPage(
    pageNumber = page,
    shouldRefresh = false,
  ): Promise<void> {
    // if (pageNumber === total) return;
    if (loading) return;

    setLoading(true);

    const timestamp = Number(new Date());

    const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    const limit = 20;
    const offset = pageNumber === 1 ? 0 : limit * pageNumber;

    const responseJson = await api
      .get(
        `/comics?orderBy=focDate&limit=${limit}&offset=${offset}&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`,
      )
      .then(response => {
        const data = response.data.data.results;
        const totalItems = response.data.data.total;

        const newProducts: Product[] = [];
        data.forEach((item: any) => {
          // const newProduct: Product = new Product();
          const newProduct: Product = {};
          newProduct.id = item.id;
          newProduct.title = item.title;
          newProduct.title = item.title;
          newProduct.description = item.description;
          newProduct.image_url = `${item.thumbnail.path}.${item.thumbnail.extension}`;

          // Seta um valor padrão para as revista que não tem preço
          if (item.prices[0].price === 0) {
            newProduct.price = 1.99;
          } else {
            newProduct.price = item.prices[0].price;
          }
          newProduct.rare = false;

          // Corrigir Bug da API da MARVEL
          const found = products.find(element => element.id === newProduct.id);
          if (!found) {
            newProducts.push(newProduct);
          }
        });

        setTotal(Math.floor(totalItems / limit));

        const productRare =
          newProducts[Math.floor(Math.random() * newProducts.length)];

        if (productRare) {
          productRare.rare = true;
        }

        setProducts(
          shouldRefresh ? newProducts : [...products, ...newProducts],
        );
      });

    setLoading(false);
    setPage(pageNumber + 1);
  }

  async function refreshList(): Promise<void> {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  async function handleNavigate(product: Product): Promise<void> {
    // Navigate do ProductDetails page
    navigation.navigate('ProductDetails', { product });
  }

  async function handleAddToCart(item: Product): Promise<void> {
    addToCart(item);
  }

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

      <ProductList<any>
        data={products}
        keyExtractor={(item: Product) => String(item.id)}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
        ListFooterComponent={
          loading && (
            <>
              <Loading />
              <View />
            </>
          )
        }
        ListFooterComponentStyle={{
          height: 60,
        }}
        renderItem={({ item }: { item: Product }) => (
          <ProductItem
            key={item.id}
            activeOpacity={0.6}
            onPress={() => handleNavigate(item)}
            testID={`product-${item.id}`}
          >
            <ProductImageContainer isRare={item.rare}>
              <Image
                style={{ height: 90, width: 90, borderRadius: 10 }}
                source={{
                  uri: `${item.image_url}`,
                }}
              />
              {item.rare && (
                <RareContainer>
                  <Icon name="star" size={36} color="#FFB84D" />
                </RareContainer>
              )}
            </ProductImageContainer>
            <ProductContent>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductDescription>{item.id}</ProductDescription>
              <ProductDescription>{item.rare}</ProductDescription>
              <PriceContainer>
                <ProductPricing>{formatValue(item.price)}</ProductPricing>
                <ProductButton
                  testID={`add-to-cart-${item.id}`}
                  onPress={() => handleAddToCart(item)}
                >
                  <FeatherIcon size={20} name="plus" color="gray" />
                </ProductButton>
              </PriceContainer>
            </ProductContent>
          </ProductItem>
        )}
      />
      {totalItensInCart > 0 && <FloatingCart />}
    </Container>
  );
};

export default Dashboard;
