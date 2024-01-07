<template>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6 col-12">
      <div class="q-ma-md q-pa-md shadow-5">
        <h2 align="center">ثبت نام</h2>
        <q-input class="q-ma-xl" v-model="mobile" filled type="tel" hint="موبایل" />
        <q-input class="q-ma-xl" v-model="firstName" filled type="text" hint="نام" />
        <q-input class="q-ma-xl" v-model="lastName" filled type="text" hint="نام خانوادگی" />
        <q-input class="q-ma-xl" v-model="password" filled type="password" hint="رمز عبور" />
        <q-input class="q-ma-xl" v-model="passwordConfirmation" filled type="password" hint="تکرار رمزعبور" />
        <div class="q-gutter-sm">
          <q-radio v-model="userType" val="customer" label="مشتری" />
          <q-radio v-model="userType" val="provider" label="خدمت رسان" />
        </div>
        <q-btn class="full-width q-ma-md" @click="register" color="secondary" label="ثبت نام" />
      </div>
    </div>
    <div class="col-sm-3"></div>
  </div>
</template>


<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'

const baseurl = useBaseURL()


export default {
  data() {
    return {
      mobile: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      userType: ''
    };
  },
  methods: {
    async register() {
      let status = 0;
      let message = '';
      localStorage.setItem('mobileVerify', JSON.stringify(this.mobile));
      await axios.post(baseurl.url + 'v1/register', {
        mobile: this.mobile,
        first_name: this.firstName,
        last_name: this.lastName,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        user_type: this.userType
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).then(function (response) {
        status = response.data.status;
        message = response.data.message;
      }).catch(function (error) {
        message = error.response.data.message;
      });
      if (status == 1 || status == 2) {
        this.$router.push({ path: '/verify' })
      } else {
        alert(message);
      }

    }
  }
};
</script>
