import styled, { css } from 'styled-components/native';

interface CategoryItemProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 60px 24px 60px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FilterContainer = styled.View`
  padding: 0 24px;
  margin-top: -28px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #3d3d4d;
  padding: 0 20px;
`;

export const ProductsContainer = styled.View`
  margin-top: 40px;
`;

export const ProductList = styled.View`
  flex: 1;
  padding: 0 20px;
  margin-top: 16px;
`;

export const ProductItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f0f0f5;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const ProductImageContainer = styled.View`
  background: #ffb84d;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 16px;
  height: 100%;
`;

export const ProductContent = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ProductTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #3d3d4d;
`;
export const ProductDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  margin-top: 6px;
  color: #3d3d4d;
`;

export const ProductPricing = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  margin-top: 8px;
  font-weight: 600;
  color: #39b100;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const ProductButton = styled.TouchableOpacity``;
