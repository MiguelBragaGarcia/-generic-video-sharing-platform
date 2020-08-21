import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiChevronLeft, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password } = data;

        await api.post('/user', {
          name,
          email,
          password,
        });

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
        <Input
          name="name"
          icon={FiUser}
          placeholder="Digite seu nome"
          type="text"
        />
        <Input
          name="email"
          icon={FiMail}
          placeholder="Digite seu e-mail"
          type="text"
        />
        <Input
          name="password"
          icon={FiLock}
          placeholder="Digite sua senha"
          type="password"
        />
        <button type="submit">Cadastrar</button>
      </Form>

      <Link to="signin">
        <FiChevronLeft size={24} />
        Voltar para login
      </Link>
    </Container>
  );
};

export default SignUp;
