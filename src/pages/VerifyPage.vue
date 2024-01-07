<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <h2>ورود کد تایید</h2>
      <q-input class="q-ma-xl" v-model="code" filled type="number" hint="کد تایید" />
      <q-btn class="full-width q-ma-md" @click="verify" color="secondary" label="ثبت کد" />
    </div>
    <div class="col-3"></div>
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
      code: ''
    };
  },
  methods: {
    async verify() {
      let status = 0;
      let message = '';
      let token = '';
      let token_id = '';
      let mobile = JSON.parse(localStorage.getItem('mobileVerify'))

      await axios.post(baseurl.url + 'v1/verify', {
        mobile: mobile,
        code: this.code
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).then(function (response) {
        status = response.data.status;
      }).catch(function (error) {
        message = error.response.data.message;
      });
      if (status == 1) {
        this.$router.push({ path: '/login' })
      } else {
        alert(message);
      }

    }
  }
};

</script>
