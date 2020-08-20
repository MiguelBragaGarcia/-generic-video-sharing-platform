import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import Input from '../../components/Input';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>
        <Input icon={FiMail} placeholder="Digite seu e-mail" type="text" />
        <Input icon={FiLock} placeholder="Digite sua senha" type="password" />
        <button type="submit">Entrar</button>

        <Link to="/forgot-password">Esqueci minha senha</Link>
      </Form>

      <Link to="signup">
        <FiLogIn size={24} />
        Criar conta
      </Link>
    </Container>
  );
};

export default Login;
