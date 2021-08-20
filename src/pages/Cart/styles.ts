import styled, { css } from 'styled-components/native';

interface ProductImagemContainerProps {
  isRare: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding-bottom: 5px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export const ProductsContainer = styled.View`
  flex: 1;
  margin-top: 0px;
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

export const ProductImageContainer = styled.View<ProductImagemContainerProps>`
  background: #ffb84d;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 8px;
  height: 100%;
  ${props =>
    props.isRare &&
    css`
      background: #c72828;
    `}
`;

export const ProductContent = styled.View`
  flex: 1;

  padding: 16px;
`;
export const ProductTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
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

export const SubtotalValue = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  margin-top: 0px;
`;

export const TotalContainer = styled.View`
  padding: 0 24px;
  margin-top: 20px;
`;

export const SubTotalContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const SubTotalLabel = styled.Text`
  font-size: 16px;
  color: black;

  flex: 1;
`;
export const DescontoLabel = styled.Text`
  font-size: 16px;
  color: orange;
  flex: 1;
`;
export const TotalLabel = styled.Text`
  font-size: 18px;
  color: black;

  flex: 1;
  font-weight: bold;
`;

export const SubTotalPrice = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: black;
`;
export const DescontoPrice = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: orange;
`;

export const TotalPrice = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
  color: black;
`;

export const FinishOrderButton = styled.TouchableOpacity`
  background: #39b100;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 26px;
  margin-bottom: 26px;
`;

export const AddItensButton = styled.TouchableOpacity`
  background: #ffb84d;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 26px;
`;

export const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #fff;
  flex: 1;
  text-align: center;
`;

export const IconContainer = styled.View`
  background-color: #41c900;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Title = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  color: #3d3d4d;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const TitleEmptyCart = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  color: #3d3d4d;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const EmptyCartContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 20px;
`;

export const AddButton = styled.TouchableOpacity`
  background: #ffb84d;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  width: 240px;
`;

export const AddButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #7a1818;
  flex: 1;
  text-align: center;
`;

export const AddButtonIconContainer = styled.View`
  background-color: #ffc46b;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const CupomInput = styled.TextInput`
  flex: 1;
  color: #6c6c80;
  font-size: 16px;
  font-family: 'Poppins-Regular';
`;

export const CupomContainerRow = styled.View`
  background: #fff;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: solid 1px;
`;
export const CupomContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;
export const RareContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
`;
export const CumpomContainerIcon = styled.TouchableOpacity`
  background-color: #ffc46b;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: row;
  width: 110px;
`;

export const CupomText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #7a1818;
  flex: 1;
  text-align: center;
`;
