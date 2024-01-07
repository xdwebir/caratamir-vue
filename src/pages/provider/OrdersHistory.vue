<template>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="تاریخچه سفارشات شما"
      v-model:pagination="pagination" :rows="rows" :columns="columns" row-key="name">

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
        { name: 'user_id', label: 'آیدی مشتری', field: 'user_id' },
        { name: 'mobile', label: 'موبایل مشتری', field: 'mobile' },
        { name: 'address', label: 'آدرس', field: 'address' },
        { name: 'city_name', label: 'شهر', field: 'city_name' },
        { name: 'status', label: 'وضعیت', field: 'status' },
        { name: 'price', label: 'قیمت', field: 'price' },

      ],
      rows: [],
      latestResult: {},
    }
  },
  methods: {
    goPage($page) {
      this.$router.push({ path: '/operator/waitingorders/' + $page });
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
            user_id: rows[row].user_id,
            mobile: rows[row].mobile,
            address: rows[row].address,
            city_name: rows[row].city_name,
            status: rows[row].status,
            price: rows[row].price,

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
            user_id: rows[row].user_id,
            mobile: rows[row].mobile,
            address: rows[row].address,
            city_name: rows[row].city_name,
            status: rows[row].status,
            price: rows[row].price,
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
      url: baseurl.url + 'v1/provider/ordershistory'
    }).then(response => {
      let rows = response.data.data;
      this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          user_id: rows[row].user_id,
          mobile: rows[row].mobile,
          address: rows[row].address,
          city_name: rows[row].city_name,
          status: rows[row].status,
          price: rows[row].price,
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
