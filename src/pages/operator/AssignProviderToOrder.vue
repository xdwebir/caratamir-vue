<template>
  <h3 class="text-center">اختصاص خدمت رسان به سفارش</h3>
  <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6 q-pa-md">
      <div class="shadow-5 q-pa-md">
        <h4 class="text-center">اطلاعات سفارش مشتری</h4>
        <div class="row">
          <div class="col-sm-6 q-pa-sm">
            نام: {{ this.first_name }}
          </div>
          <div class="col-sm-6 q-pa-sm">
            نام خانوادگی: {{ this.last_name }}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 q-pa-sm">
            شهر: {{ this.city_name }}
          </div>
          <div class="col-sm-6 q-pa-sm">
            استان: {{ this.state_name }}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 q-pa-sm">
            آدرس: {{ this.address }}
          </div>
          <div class="col-sm-6 q-pa-sm">
            موبایل: {{ this.mobile }}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 q-pa-sm">
            خدمت: {{ this.service_name }}
          </div>
          <div class="col-sm-6 q-pa-sm">
          </div>
        </div>
        <q-btn class="full-width" color="negative" label="حذف سفارش" @click="deleteOrder" />
      </div>
    </div>
    <div class="col-sm-3"></div>
  </div>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="لیست خدمت رسان های موجود" v-model:pagination="pagination"
      :rows="rows" :columns="columns" row-key="name">

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="assignProviderToOrder(props.row.id, this.$route.params.id)">
            اختصاص
          </q-btn>
        </q-td>
      </template>

      <template v-slot:pagination="scope">
        <q-btn icon="chevron_right" color="grey-8" round dense flat :disable="scope.isLastPage"
          @click="scope.nextPage; nextPage();" />
        <q-btn icon="chevron_left" color="grey-8" round dense flat :disable="scope.isFirstPage"
          @click="scope.prevPage; prevPage();" />
      </template>

    </q-table>
  </div>
</template>

<script>
import axios from 'axios';
import { useBaseURL } from 'stores/store'

const baseurl = useBaseURL()

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      city_name: '',
      state_name: '',
      address: '',
      mobile: '',
      service_name: '',
      rowsPerPageOptions: [],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1,
        rowsNumber: 1
      },
      columns: [
        { name: 'id', label: 'آيدی', field: 'id' },
        { name: 'mobile', label: 'موبایل', field: 'mobile' },
        { name: 'city_name', label: 'شهر', field: 'city_name' },
        { name: 'state_name', label: 'استان', field: 'state_name' },
        { name: 'last_name', label: 'نام', field: 'last_name' },
        { name: 'first_name', label: 'نام خانوادگی', field: 'first_name' },
        { name: 'services_name', label: 'خدمات', field: 'services_name' },
        { name: 'start_time', label: 'ساعت شروع', field: 'start_time' },
        { name: 'end_time', label: 'ساعت پایان', field: 'end_time' },
        { name: 'address', label: 'آدرس', field: 'address' },
        { name: 'actions', label: 'اقدام' }
      ],
      rows: [],
      latestResult: {},
    }
  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: baseurl.url + 'v1/operator/waitingorders/' + this.$route.params.id
    }).then(response => {
      let order = response.data;
      this.first_name = order.first_name;
      this.last_name = order.last_name;
      this.city_name = order.city_name;
      this.state_name = order.state_name;
      this.address = order.address;
      this.mobile = order.mobile;
      this.service_name = order.service_name;
    });

    axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: baseurl.url + 'v1/operator/availableproviders/' + this.$route.params.id
    }).then(response => {
      let rows = response.data;
      //this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          mobile: rows[row].mobile,
          city_name: rows[row].city_name,
          state_name: rows[row].state_name,
          last_name: rows[row].last_name,
          first_name: rows[row].first_name,
          services_name: rows[row].services_name,
          start_time: rows[row].start_time,
          end_time: rows[row].end_time,
          address: rows[row].address,
        });
      }
      // this.pagination = {
      //   page: response.data.current_page,
      //   rowsPerPage: response.data.per_page,
      //   rowsNumber: response.data.total
      // };

    });
  },
  methods: {
    async deleteOrder() {
      let status = 0;
      let confirmed = confirm("آیا سفارش انتخابی حذف شود؟");
      if (confirmed) {
        let token = JSON.parse(localStorage.getItem('token'))
        await axios.post(baseurl.url + 'v1/operator/deleteorder/' + this.$route.params.id, {},
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
          this.$router.push({ path: '/operator/waitingorders' })
        }
      }
    },
    async assignProviderToOrder($provider_id, $order_id) {
      let status = 0;
      let confirmed = confirm("آیا خدمت رسان انتخابی مورد تایید است؟");
      if (confirmed) {
        let token = JSON.parse(localStorage.getItem('token'))
        await axios.post(baseurl.url + 'v1/operator/assignprovidertoorder', {
          provider_id: $provider_id,
          order_id: $order_id
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
          this.$router.push({ path: '/operator/waitingorders' })
        }
      }


    },
    nextPage() {
      let token = JSON.parse(localStorage.getItem('token'))
      axios.request({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: this.latestResult.next_page_url
      }).then(response => {
        let rows = response.data.data;
        this.latestResult = response.data;
        this.rows = [];
        for (let row in rows) {
          this.rows.push({
            id: rows[row].id,
            mobile: rows[row].mobile,
            city_name: rows[row].city_name,
            state_name: rows[row].state_name,
            last_name: rows[row].last_name,
            first_name: rows[row].first_name,
            services_name: rows[row].services_name,
            start_time: rows[row].start_time,
            end_time: rows[row].end_time,
            address: rows[row].address,
          });
        }
        this.pagination = {
          page: response.data.current_page,
          rowsPerPage: response.data.per_page,
          rowsNumber: response.data.total
        };

      });
    },
    prevPage() {
      let token = JSON.parse(localStorage.getItem('token'))
      axios.request({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: this.latestResult.prev_page_url
      }).then(response => {
        let rows = response.data.data;
        this.latestResult = response.data;
        this.rows = [];
        for (let row in rows) {
          this.rows.push({
            id: rows[row].id,
            mobile: rows[row].mobile,
            city_name: rows[row].city_name,
            state_name: rows[row].state_name,
            last_name: rows[row].last_name,
            first_name: rows[row].first_name,
            services_name: rows[row].services_name,
            start_time: rows[row].start_time,
            end_time: rows[row].end_time,
            address: rows[row].address,
          });
        }
        this.pagination = {
          page: response.data.current_page,
          rowsPerPage: response.data.per_page,
          rowsNumber: response.data.total
        };

      });
    }
  },

}
</script>
