<template>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="تایید فیش های پرداختی" v-model:pagination="pagination"
      :rows="rows" :columns="columns" row-key="name">

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="goPage(props.row.id)">
            مشاهده
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
        { name: 'user_id', label: 'آیدی کاربر', field: 'user_id' },
        { name: 'date', label: 'تاریخ و زمان', field: 'date' },
        { name: 'tracking_code', label: 'کد رهگیری', field: 'tracking_code' },
        { name: 'amount', label: 'مبلغ', field: 'amount' },
        { name: 'actions', label: 'اقدام' }
      ],
      rows: [],
      latestResult: {},
    }
  },
  methods: {
    goPage($page) {
      this.$router.push({ path: '/accountant/confirmpayment/' + $page });
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
            date: rows[row].date,
            tracking_code: rows[row].tracking_code,
            amount: rows[row].amount,
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
            date: rows[row].date,
            tracking_code: rows[row].tracking_code,
            amount: rows[row].amount,
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
      url: baseurl.url + 'v1/accountant/confirmpayment'
    }).then(response => {
      let rows = response.data.data;
      this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          user_id: rows[row].user_id,
          date: rows[row].date,
          tracking_code: rows[row].tracking_code,
          amount: rows[row].amount,
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
