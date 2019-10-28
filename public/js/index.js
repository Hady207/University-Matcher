import '@babel/polyfill';

import { login, logout } from './login';

// DOM ELEMENTS
const loginBtn = document.querySelector('#form__login');
const logoutBtn = document.getElementById('lgtBTN');

// DELEGATION
if (loginBtn)
  loginBtn.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;
    login(email, password);
  });

if (logoutBtn)
  logoutBtn.addEventListener('click', e => {
    logout();
  });
