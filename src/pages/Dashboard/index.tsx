import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import md5 from 'md5';

import {
  Container,
  Header,
  FilterContainer,
  Title,
  ComicsContainer,
  ComicList,
  Comic,
  ComicImageContainer,
  ComicContent,
  ComicTitle,
  ComicDescription,
  ComicPricing,
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

interface Comics {
  id: number;
  title: string;
  name: string;
  thumbnail: any;
  prices: any;
  resourceURI: string;
}

const Dashboard: React.FC = () => {

  const [comics, setComics] = useState<Comics[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: number): Promise<void> {
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

  useEffect(() => {
    async function loadComics(): Promise<void> {

      const timestamp = Number(new Date());

      const PRIVATE_KEY = 'e305fc4717aba53023feb0aa17cab6b2c15d246b';
      const PUBLIC_KEY = '22903f2fa262983ce86cb55a86b30d78';

      let hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
      console.log("timestamp", timestamp);
      console.log("PUBLIC_KEY", PUBLIC_KEY);
      console.log("hash", hash);

      const response = await fetch(`https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&limit=10&apikey=${PUBLIC_KEY}&hash=${hash}`)
      const responseJson = await response.json()

      //const response = await api.get(`/comics?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
      //const responseJson = await response.json();
      console.log("result:",JSON.stringify(responseJson.data.results));
      setComics(responseJson.data.results);
    }

    loadComics();
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
        <ComicsContainer>
          <Title>Quadrinhos</Title>
          <ComicList>
            {comics.map(comic => (
              <Comic
                key={comic.id}
                onPress={() => handleNavigate(comic.id)}
                activeOpacity={0.6}
                testID={`food-${comic.id}`}
              >
                <ComicImageContainer>
                  <Image
                    style={{height: 90, width: 90, borderRadius: 10}}
                    source={{ uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}` }}
                  />
                </ComicImageContainer>
                <ComicContent>
                  <ComicTitle>{comic.title}</ComicTitle>
                  <ComicDescription>{comic.title}</ComicDescription>
                  <ComicPricing>$ {comic.prices[0].price}</ComicPricing>
                </ComicContent>
              </Comic>
            ))}
          </ComicList>
        </ComicsContainer>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
