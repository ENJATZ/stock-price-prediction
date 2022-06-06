import { Block } from 'galio-framework';
import styled from 'styled-components/native';

export const Screen = styled(Block)`
  margin: 10px;
`;

export const Title = styled(Block)`
  display: flex;
  width: auto;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const List = styled(Block)`
  margin-top: 15px;
  display: flex;
  width: 100%;
`;

export const ListItem = styled(Block)`
  flex: 1;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
`;
