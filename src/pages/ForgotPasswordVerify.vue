<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <div class="q-ma-md q-pa-md shadow-5">
        <h2>تغییر رمز عبور</h2>
        <q-input class="q-ma-xl" v-model="code" filled type="number" hint="کد تایید" />
        <q-input class="q-ma-xl" v-model="password" filled type="password" hint="رمزعبور" />
        <q-input class="q-ma-xl" v-model="password_confirmation" filled type="password" hint="تکرار رمز عبور" />
        <q-btn class="full-width q-ma-md" @click="forgotPassword" color="secondary" label="تغییر رمز عبور" />
      </div>
    </div>
    <div class="col-3"></div>
  </div>
</template>
<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store';

const baseurl = useBaseURL();

export default{
  data() {
    return {
      code: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    async forgotPassword(){
      let status = 0;
      let message = '';
      await axios.post(baseurl.url + 'v1/forgotpasswordverify', {
        mobile: JSON.parse(localStorage.getItem('mobile')),
        code: this.code,
        password: this.password,
        password_confirmation: this.password_confirmation,
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      )
        .then(async function (response) {
          status = response.data.status;
          message = response.data.message;
        })
        .catch(function (error) {
          message = error.response.data.message;
        });
      if (status == 1) {
        this.$router.push({ path: '/login' })
      } else {
        alert(message);
      }

    }
  },
}
</script>
