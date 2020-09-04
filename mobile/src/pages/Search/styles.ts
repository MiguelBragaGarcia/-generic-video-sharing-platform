import styled from 'styled-components/native';

import { TextInput } from 'react-native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;
export const Header = styled.View`
  justify-content: center;
`;

export const SearchHeader = styled.View`
  height: 60px;
  padding: 0 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const LogoImage = styled.Image`
  width: 35px;
  height: 35px;
`;

export const SearchInput = styled(TextInput)`
  padding: 5px 16px;
  font-size: 16px;
  color: #000;
  width: 90%;
  background: #eee;
  border-radius: 20px;
`;

export const ResultsList = styled.ScrollView``;

export const Video = styled.View`
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
  padding: 0 10px 10px;

  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const VideoThumbnail = styled.Image`
  width: 45%;
  height: 120px;
`;

export const InfoContainer = styled.View`
  margin-left: 5%;
  width: 50%;

  color: #333;
`;

export const Title = styled.Text`
  margin-top: 5px;
  font-weight: bold;
`;

export const Description = styled.Text`
  margin-top: 5px;
`;

export const Views = styled.Text``;
