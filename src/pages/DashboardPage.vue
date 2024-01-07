<template>
  <h2>داشبرد من</h2>

  <h4>{{ user.first_name }}</h4>
  <h4>{{ user.last_name }}</h4>
  <h4>{{ user.mobile }}</h4>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios';
import { useBaseURL } from 'stores/store'
const baseurl = useBaseURL()



export default defineComponent({
  name: 'DashboardPage',
  data() {
    return {
      user: "",
      isAdmin: false,
    }
  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.request({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: baseurl.url + 'v1/user'
      }).then(response => {
        this.user = response.data[0];
      });
  }
})
</script>
