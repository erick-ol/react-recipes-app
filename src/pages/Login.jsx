import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const validateEmail = () => {
      // source regex https://pt.stackoverflow.com/a/276022
      const isValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
      if (!isValid || email === '') {
        return false;
      }
      return true;
    };
    const six = 6;
    if ((validateEmail()) && (password.length > six)) {
      return setEnable(true);
    }
    return setEnable(false);
  }, [password, email]);

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email,
    };

    console.log('oi');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <div>
      <form action="submit">
        <label htmlFor="email">
          EMAIL
          <input
            id="email"
            type="text"
            data-testid="email-input"
            placeholder="Digite seu Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          SENHA
          <input
            id="password"
            type="password"
            data-testid="password-input"
            placeholder="Digite sua Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !enable }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
