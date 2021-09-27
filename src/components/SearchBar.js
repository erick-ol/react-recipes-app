import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { GlobalContext } from '../context/GlobalStorage';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState('name');
  const { request } = useFetch();
  const FIRST_LETTER = 'first-letter';
  const INGREDIENTS = 'ingredients';
  const NAME = 'name';
  const GLOBAL = useContext(GlobalContext);
  const history = useHistory();
  const pageName = window.location.pathname;

  useEffect(() => {
    if (GLOBAL.responseFetch !== null && pageName === '/comidas') {
      if (GLOBAL.responseFetch.meals === null) {
        setSearchInput('');
        GLOBAL.setResponseFetch(null);
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (GLOBAL.responseFetch.meals.length === 1) {
        const { idMeal } = GLOBAL.responseFetch.meals[0];
        history.push(`/comidas/${idMeal}`);
      }
    } else if (GLOBAL.responseFetch !== null && pageName === '/bebidas') {
      if (GLOBAL.responseFetch.drinks === null) {
        setSearchInput('');
        GLOBAL.setResponseFetch(null);
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (GLOBAL.responseFetch.drinks.length === 1) {
        const { idDrink } = GLOBAL.responseFetch.drinks[0];
        history.push(`/bebidas/${idDrink}`);
      }
    }
  }, [GLOBAL, history, pageName]);

  const ifHandle = async (op, method) => {
    if (pageName === '/comidas') {
      await request(`https://www.themealdb.com/api/json/v1/1/${method}.php?${op}=${searchInput}`);
    } else if (pageName === '/bebidas') {
      await request(`https://www.thecocktaildb.com/api/json/v1/1/${method}.php?${op}=${searchInput}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.length > 1 && option === FIRST_LETTER) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      switch (option) {
      case INGREDIENTS:
        ifHandle('i', 'filter');
        break;
      case NAME:
        await ifHandle('s', 'search');
        break;
      case FIRST_LETTER:
        ifHandle('f', 'search');
        break;
      default:
        return null;
      }
    }
  };

  return (
    <form onSubmit={ (e) => handleSubmit(e) }>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        onChange={ (e) => setSearchInput(e.target.value) }
        value={ searchInput }
      />
      <input
        type="radio"
        id="Ingredientes"
        value={ INGREDIENTS }
        data-testid="ingredient-search-radio"
        name="option"
        onClick={ () => setOption(INGREDIENTS) }
      />
      <input
        type="radio"
        id="Name"
        value={ NAME }
        data-testid="name-search-radio"
        name="option"
        onClick={ () => setOption(NAME) }
        defaultChecked
      />
      <input
        type="radio"
        id={ FIRST_LETTER }
        value={ FIRST_LETTER }
        data-testid="first-letter-search-radio"
        name="option"
        onClick={ () => setOption(FIRST_LETTER) }
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;