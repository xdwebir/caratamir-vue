<template>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="تاریخچه سفارشات" v-model:pagination="pagination"
      :rows="rows" :columns="columns" row-key="name">

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
        { name: 'address', label: 'آدرس', field: 'address' },
        { name: 'status', label: 'وضعیت', field: 'status' },
        { name: 'service_name', label: 'خدمت', field: 'service_name' },
        { name: 'price', label: 'قیمت', field: 'price' },
        { name: 'city_name', label: 'شهر', field: 'city_name' },
        { name: 'provider_id', label: 'آیدی خدمت رسان', field: 'provider_id' },
        { name: 'provider_mobile', label: 'موبایل خدمت رسان', field: 'provider_mobile' },
        { name: 'provider_address', label: 'آدرس خدمت رسان', field: 'provider_address' },
      ],
      rows: [],
      latestResult: {},
    }
  },
  methods: {
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
            address: rows[row].address,
            status: rows[row].status,
            service_name: rows[row].service_name,
            price: rows[row].price,
            city_name: rows[row].city_name,
            provider_id: rows[row].provider_id,
            provider_mobile: rows[row].provider_mobile,
            provider_address: rows[row].provider_address,
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
            address: rows[row].address,
            status: rows[row].status,
            service_name: rows[row].service_name,
            price: rows[row].price,
            city_name: rows[row].city_name,
            provider_id: rows[row].provider_id,
            provider_mobile: rows[row].provider_mobile,
            provider_address: rows[row].provider_address,
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
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: baseurl.url + 'v1/operator/ordershistory'
    }).then(response => {
      let rows = response.data.data;
      this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          mobile: rows[row].mobile,
          address: rows[row].address,
          status: rows[row].status,
          service_name: rows[row].service_name,
          price: rows[row].price,
          city_name: rows[row].city_name,
          provider_id: rows[row].provider_id,
          provider_mobile: rows[row].provider_mobile,
          provider_address: rows[row].provider_address,
        });
      }
      this.pagination = {
        page: response.data.current_page,
        rowsPerPage: response.data.per_page,
        rowsNumber: response.data.total
      };

    });
  },


}

</script>
