<template>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6 col-12">
      <div class="q-ma-md q-pa-md shadow-5">
        <h2>ورود</h2>
        <q-input class="q-ma-xl" v-model="mobile" filled type="tel" hint="موبایل" />
        <q-input class="q-ma-xl" v-model="password" filled type="password" hint="رمز عبور" />
        <RouterLink class="" to="/forgotpassword">رمز عبور را فراموش کردم</RouterLink>
        <q-btn class="full-width q-ma-md" @click="login" color="secondary" label="ورود" />

      </div>
    </div>
    <div class="col-sm-3"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'
import { is } from 'stores/store'

const baseurl = useBaseURL()
const access = is()
export default {
  data() {
    return {
      mobile: '',
      password: ''
    };
  },
  methods: {
    async login() {
      let status = 0;
      let message = '';

      await axios.post(baseurl.url + 'v1/login', {
        mobile: this.mobile,
        password: this.password
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
        .then(async function (response) {

          status = response.data.status;
          message = response.data.message;
          if (status == 1) {
            let token = response.data.token.split("|");
            localStorage.setItem('token_id', JSON.stringify(token[0]));
            localStorage.setItem('token', JSON.stringify(token[1]));
            localStorage.setItem('isLogin', JSON.stringify(true));
            access.login = true;
            await axios.request({
              headers: {
                Authorization: `Bearer ${token[1]}`
              },
              method: "GET",
              url: baseurl.url + 'v1/roles'
            }).then(response => {
              let roles = response.data.roles;
              if (roles.includes("super admin")) {
                localStorage.setItem('isAdmin', JSON.stringify(true));
                access.admin = true;
              }
              if (roles.includes("customer")) {
                localStorage.setItem('isCustomer', JSON.stringify(true));
                access.customer = true;
              }
              if (roles.includes("service provider")) {
                localStorage.setItem('isProvider', JSON.stringify(true));
                access.provider = true;
              }
              if (roles.includes("operator")) {
                localStorage.setItem('isOperator', JSON.stringify(true));
                access.operator = true;
              }
              if (roles.includes("accountant")) {
                localStorage.setItem('isAccountant', JSON.stringify(true));
                access.accountant = true;
              }
            });
          }
        })
        .catch(function (error) {
          message = error.response.data.message;
        });
      if (status == 1) {
        this.$router.push({ path: '/dashboard' })
      } else {
        alert(message);
      }

    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
  font-size: large;
}
</style>
