<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-xl-4 col-md-6 col-12 q-pa-md shadow-5">
        <h4 class="q-ma-sm" align="center">آخرین سفارش</h4>
        <div class="row">
          <div class="col-md-6 col-12">موبایل شما: {{ this.customer_mobile }}</div>
          <div class="col-md-6 col-12">شهر شما: {{ this.customer_city }}</div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12">آدرس شما: {{ this.customer_address }}</div>
          <div class="col-md-6 col-12">وضعیت: {{ this.status }}</div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12">قیمت: {{ this.price }}</div>
          <div class="col-md-6 col-12">شماره سفارش: {{ this.order_id }}</div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12">شماره اپراتور: {{ this.operator_mobile }}</div>
          <div class="col-md-6 col-12">نام اپراتور: {{ this.operator_name }}</div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12">شماره خدمت رسان: {{ this.provider_mobile }}</div>
          <div class="col-md-6 col-12">نام خدمت رسان: {{ this.provider_name }}</div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12">آدرس خدمت رسان: {{ this.provider_address }}</div>
          <div class="col-md-6 col-12">نوع خدمت: {{ this.service_name }}</div>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 col-12"></div>
      <div class="col-xl-4 col-md-6 col-12"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'

const baseurl = useBaseURL()
export default {
  data() {
    return {
      customer_mobile:'',
      customer_city:'',
      customer_address:'',
      status:'',
      price:'',
      order_id:'',
      operator_mobile:'',
      operator_name:'',
      provider_mobile:'',
      provider_name:'',
      provider_address:'',
      service_name:''
    }
  },
  methods: {

  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: baseurl.url + 'v1/customer/allorderforcards'
    }).then(response => {
      let rows = response.data.data;
      for (let row in rows) {
        this.customer_mobile = rows[row].customer_mobile ;
        this.customer_city = rows[row].customer_city ;
        this.customer_address = rows[row].customer_address ;
        this.status = rows[row].status ;
        this.price = rows[row].price ;
        this.order_id = rows[row].order_id ;
        this.operator_mobile = rows[row].operator_mobile ;
        this.operator_name = rows[row].operator_first_name + " " + rows[row].operator_last_name;
        this.provider_mobile = rows[row].provider_mobile ;
        this.provider_name = rows[row].provider_first_name + " "+ rows[row].provider_last_name ;
        this.provider_address = rows[row].provider_address ;
        this.service_name = rows[row].service_name ;
      }

    });
  },


}

</script>
