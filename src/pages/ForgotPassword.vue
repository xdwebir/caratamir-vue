<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <div class="q-ma-md q-pa-md shadow-5">
        <h2>تغییر رمز عبور</h2>
        <q-input class="q-ma-xl" v-model="mobile" filled type="tel" hint="موبایل" />
        <q-btn class="full-width q-ma-md" @click="forgotPassword" color="secondary" label="تغییر رمز عبور" />
      </div>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'

const baseurl = useBaseURL()

export default{
  data() {
    return {
      mobile: '',
    };
  },
  methods: {
    async forgotPassword(){
      let status = 0;
      let message = '';

      await axios.post(baseurl.url + 'v1/forgotpassword', {
        mobile: this.mobile,
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
        })
        .catch(function (error) {
          message = error.response.data.message;
        });
      if (status == 1) {
        localStorage.setItem('mobile', JSON.stringify(this.mobile));
        this.$router.push({ path: '/forgotpasswordverify' })
      } else {
        alert(message);
      }

    }
  },
}
</script>
