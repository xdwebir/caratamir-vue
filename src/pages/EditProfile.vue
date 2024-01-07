<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="q-pa-md col-md-6 col-12">
      <div class="q-pa-md shadow-5 q-ma-xl">
        <h2>پروفایل کاربری</h2>
        <q-input disable="disable" class="q-ma-xl" v-model="mobile" filled type="text" hint="موبایل" />
        <q-input :rules="[val => !!val || 'فیلد الزامیست!']" class="q-ma-xl" v-model="firstName" filled type="text" hint="نام" />
        <q-input class="q-ma-xl" v-model="lastName" filled type="text" hint="نام خانوادگی" />
        <q-btn class="full-width q-ma-md" @click="updateProfile" color="secondary" label="به روزرسانی" />
      </div>

      <div class="q-pa-md shadow-5 q-ma-xl">
        <h2>رمز عبور</h2>
        <q-input class="q-ma-xl" v-model="password" filled type="password" hint="رمز عبور" />
        <q-input class="q-ma-xl" v-model="passwordConfirmation" filled type="password" hint="تکرار رمز عبور" />
        <q-btn class="full-width q-ma-md" @click="updatePassword" color="secondary" label="به روزرسانی رمز عبور" />
      </div>

    </div>
    <div class="col-md-3"></div>
  </div>

  <q-dialog v-model="dialog">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">به روزرسانی انجام شد</div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="باشه" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'

const baseurl = useBaseURL()

export default {
  data() {
    return {
      dialog: false,
      mobile: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation:''
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
      this.mobile = response.data[0].mobile;
      this.firstName = response.data[0].first_name;
      this.lastName = response.data[0].last_name;
    });
  },
  methods: {
    async updateProfile() {
      let token = JSON.parse(localStorage.getItem('token'))
      let status = 0;
      await axios.post(baseurl.url + 'v1/editprofile', {
        first_name: this.firstName,
        last_name: this.lastName
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
          }
        }
      )
        .then(function (response) {
          status = response.data.status
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
      if (status == 1) {
        this.dialog = true;
      }
    },
    async updatePassword() {
      let token = JSON.parse(localStorage.getItem('token'))
      let status = 0;
      await axios.post(baseurl.url + 'v1/editpassword', {
        password: this.password,
        password_confirmation: this.passwordConfirmation
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
          }
        }
      )
        .then(function (response) {
          status = response.data.status
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
      if (status == 1) {
        this.dialog = true;
      }
    }
  },
}

</script>
