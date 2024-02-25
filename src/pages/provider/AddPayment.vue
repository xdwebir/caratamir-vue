<template>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6 q-pa-xl">
      <div class="row q-pa-md">
        بدهی شما {{ this.debt }} تومان می باشد.<br>
        لطفا بدهی خود را به کارت ۶۲۱۹۸۶۱۹۲۷۴۰۶۳۳۹ به نام محمد تهمتن واریز نمایید.
      </div>
      <div class="row">
        <div class="col-xl-6 col-12">
          <h4>تاریخ</h4>
          <q-date v-model="date" calendar="persian"></q-date>
        </div>
        <div class="col-xl-6 col-12">
          <h4>ساعت</h4>
          <q-time class="on-right" v-model="time" format24h></q-time>
        </div>
      </div>
      <q-input class="q-ma-md" v-model="tracking_code" type="number" label="کد رهگیری" />
      <q-input class="q-ma-md" v-model="amount" type="number" label="قیمت به تومان" />
      <q-btn class="q-ma-md full-width" color="green" label="ثبت رسید" @click="addPayment" />
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
      date: '',
      time: '',
      tracking_code: '',
      amount: '',
      debt:''
    }
  },
  async mounted() {
      let token = JSON.parse(localStorage.getItem('token'))
      let debt = 0;
      await axios.post(baseurl.url + 'v1/provider/debt', {},
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
          }
        }
      ).then(function (response) {
          debt = response.data.debt;
        });
        this.debt = debt;

  },
  methods: {
    async addPayment(){
      let token = JSON.parse(localStorage.getItem('token'))
      let status = '';
      await axios.post(baseurl.url + 'v1/provider/addpayment', {
        date: this.date + ' ' + this.time,
        tracking_code: this.tracking_code,
        amount: this.amount,
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
        if(status==1){
          this.$router.push({ path: '/' })
        }
    }
  },
}
</script>

