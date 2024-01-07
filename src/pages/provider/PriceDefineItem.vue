<template>
  {{ this.$route.params.id }}
  <h3 class="text-center">تعیین قیمت سفارش</h3>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6 q-pa-md">
      <div class="bg-grey-1">
        <h4 class="text-center">اطلاعات سفارش مشتری</h4>
        <div class="row">
          <div class="col-sm-6 q-pa-sm">
            آدرس: {{ this.address }}
          </div>
          <div class="col-sm-6 q-pa-sm">
            موبایل: {{ this.mobile }}
          </div>
        </div>
        <hr />
        <h4>قیمت تمام شده</h4>
        <q-input v-model="price" type="number" label="قیمت به تومان" />
        <q-btn class="full-width q-ma-md" @click="definePrice" color="secondary" label="درج قیمت" />
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
      address: '',
      mobile: '',
      price: ''
    }
  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: baseurl.url + 'v1/provider/pricedefinelist/' + this.$route.params.id
    }).then(response => {
      this.address = response.data.address;
      this.mobile = response.data.mobile;
    });
  },
  methods: {
    async definePrice() {
      let status = 0;
      let token = JSON.parse(localStorage.getItem('token'))
      await axios.post(baseurl.url + 'v1/provider/pricedefinelist', {
        order_id: this.$route.params.id,
        price: this.price
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
          status = response.data.status;

        })
        .catch(function (error) {
          console.log(error.response);
        });
      if (status == 1) {
        this.$router.push({ path: '/provider/pricedefinelist' })
      }



    },

  },
}
</script>
