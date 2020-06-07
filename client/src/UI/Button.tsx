import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  display: block;
  margin: 30px auto;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #ff1744;
  color: #ecf0f1;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #ff1744;
  }

  &:focus {
    background-color: #ff1744;
  }
`;

export const ButtonLabel = styled.span`
  display: block;
  padding: 12px 24px;
  color: #fff;
  font-size: 16px;
`;
