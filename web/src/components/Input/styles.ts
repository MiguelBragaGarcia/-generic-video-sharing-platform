import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 2rem;
  border: 0.3rem solid #eee;
  padding: 0 1rem;
  background: #fff;

  & + div {
    margin-top: 2rem;
  }

  input {
    flex: 1;
    background: transparent;
    padding-right: 1rem;
    height: 5rem;
    background: #fff;
    border: 0;
    color: #38393d;
  }

  svg {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #f00000;

      input {
        color: #f00000;
      }

      svg {
        color: #f00000;
      }
    `}
`;
