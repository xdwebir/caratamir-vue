import { defineStore } from 'pinia';

export const useBaseURL = defineStore('baseurl', {
  state: () => ({
    url: "http://localhost/caratamir/public/api/",
    // url: "https://api.caratamir.ir/api/",
  }),
});

export const is = defineStore('access', {
  state: () => ({
    login: JSON.parse(localStorage.getItem('isLogin')),
    admin: JSON.parse(localStorage.getItem('isAdmin')),
    customer: JSON.parse(localStorage.getItem('isCustomer')),
    provider: JSON.parse(localStorage.getItem('isProvider')),
    operator: JSON.parse(localStorage.getItem('isOperator')),
    accountant: JSON.parse(localStorage.getItem('isAccountant')),
  }),
});
