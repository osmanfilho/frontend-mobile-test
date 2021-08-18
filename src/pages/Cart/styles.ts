import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 50px 24px 12px;
  background: #c72828;

  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export const FoodsContainer = styled.View`
  flex: 1;
  margin-top: 0px;
`;

export const FoodList = styled(FlatList as new () => FlatList<Product>)`
  flex: 1;
  padding: 0 20px;

  margin-top: 16px;
`;

export const Food = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  background: #f0f0f5;
  border-radius: 8px;

  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: #ffb84d;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 8px;
  height: 100%;
`;

export const FoodContent = styled.View`
  flex: 1;

  padding: 16px;
`;
export const FoodTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;

  color: #3d3d4d;
`;
export const FoodDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;

  margin-top: 6px;

  color: #3d3d4d;
`;

export const FoodPricing = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;

  margin-top: 8px;

  font-weight: 600;

  color: #39b100;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  margin-top: 5px;

  font-size: 16px;
  color: #e83f5b;
`;

export const ProductQuantity = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  margin-right: 10px;

  font-size: 16px;
  color: #e83f5b;
`;

export const ActionContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-left: auto;
`;

export const ActionButton = styled.TouchableOpacity`
  background: rgba(232, 63, 91, 0.1);
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export const ProductPriceContainer = styled.View`
  flex-direction: row;
`;

export const ProductPriceContainer2 = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

export const TotalProductsContainer = styled.View`
  flex-direction: row;
  background: #e83f5b;

  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
`;

export const TotalProductsText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 15px;

  flex: 1;
  font-weight: bold;
`;

export const SubtotalValue = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
