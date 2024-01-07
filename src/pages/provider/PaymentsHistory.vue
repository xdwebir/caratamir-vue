<template>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="تاریخچه سفارشات شما" v-model:pagination="pagination"
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
        { name: 'date', label: 'تاریخ و ساعت', field: 'date' },
        { name: 'amount', label: 'مبلغ', field: 'amount' },
        { name: 'tracking_code', label: 'کد رهگیری', field: 'tracking_code' },
        { name: 'status', label: 'وضعیت', field: 'status' },

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
            date: rows[row].date,
            amount: rows[row].amount,
            tracking_code: rows[row].tracking_code,
            status: rows[row].status,
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
            date: rows[row].date,
            amount: rows[row].amount,
            tracking_code: rows[row].tracking_code,
            status: rows[row].status,
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
      url: baseurl.url + 'v1/provider/paymentshistory'
    }).then(response => {
      let rows = response.data.data;
      this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          date: rows[row].date,
          amount: rows[row].amount,
          tracking_code: rows[row].tracking_code,
          status: rows[row].status,
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
