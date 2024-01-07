<template>
  <h2>Logout Page</h2>
</template>


<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'
import { is } from 'stores/store'

const baseurl = useBaseURL()
const access = is()

export default {
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.post(baseurl.url + 'v1/currentTokenLogout', {},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        }
      }
    )
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error.response);
      });
    access.login = false
    access.admin = false
    access.customer = false
    access.provider = false
    access.operator = false
    access.accountant = false
    localStorage.removeItem('token');
    localStorage.removeItem('token_id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isCustomer');
    localStorage.removeItem('isProvider');
    localStorage.removeItem('isOperator');
    localStorage.removeItem('isAccountant');
    localStorage.removeItem('isLogin');
    this.$router.push({ path: '/' })
  }
}
</script>
