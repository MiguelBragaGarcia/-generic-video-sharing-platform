import styled from 'styled-components/native';
import { darken } from 'polished';

import Icon from 'react-native-vector-icons/FontAwesome';

export const Header = styled.View`
  height: 60px;
  background: #fff;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  padding: 0 10px;
`;

export const NormalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LogoImage = styled.Image`
  width: 35px;
  height: 35px;
`;

export const VideosList = styled.ScrollView`
  background: #fff;
`;

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

export const AvatarSVG = styled(Icon)`
  border-radius: 20px;
  color: #eee;
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
