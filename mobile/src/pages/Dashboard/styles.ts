import styled from 'styled-components/native';
import { darken } from 'polished';

import { TextInput } from 'react-native';

export const Header = styled.View`
  height: 60px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #c5c5c5;
  padding: 0 10px;
`;

export const NormalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const SearchHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const VideosList = styled.ScrollView``;

export const Video = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${darken(0.05, '#eee')};

  margin-bottom: 10px;
`;

export const VideoThumbnail = styled.Image`
  width: 100%;
  height: 200px;
`;
export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
export const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
export const Title = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 18px;
  max-width: 50%;
`;
export const Views = styled.Text`
  width: 35%;
  color: #333;
`;
