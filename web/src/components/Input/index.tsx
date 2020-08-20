import React, { InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ hasError, icon: Icon, ...rest }) => (
  <Container hasError={hasError}>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
