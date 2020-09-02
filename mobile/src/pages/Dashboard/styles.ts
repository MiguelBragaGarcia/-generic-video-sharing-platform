import styled from 'styled-components/native';

export const VideosList = styled.ScrollView``;

export const Video = styled.View`
  margin-top: 10px;
  /* colocar borda de 90% com color #eee */
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
  font-weight: bold;
  font-size: 18px;
`;
export const Views = styled.Text``;
