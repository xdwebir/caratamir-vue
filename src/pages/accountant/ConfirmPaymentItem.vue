<template>
  <div class="row">
    <div class="col-sm-3">


    </div>
    <div class="col-sm-6">
      <div class="q-ma-md shadow-5 q-pa-md">
        <q-table :rows-per-page-options="rowsPerPageOptions" title="لیست پرداخت های موفق کارت به کارت"
          v-model:pagination="pagination" :rows="rows" :columns="columns" row-key="name">

          <template v-slot:pagination="scope">
            <q-btn icon="chevron_right" color="grey-8" round dense flat :disable="scope.isLastPage"
              @click="scope.nextPage; nextPage();" />
            <q-btn icon="chevron_left" color="grey-8" round dense flat :disable="scope.isFirstPage"
              @click="scope.prevPage; prevPage();" />
          </template>

        </q-table>
      </div>
      <div class="q-ma-md shadow-5 q-pa-md">
        <h4 class="q-ma-sm">اطلاعات فیش پرداخت</h4>
        <div class="row">
          <div class="col-sm-6">آیدی: {{ this.id }}</div>
          <div class="col-sm-6">آیدی کاربر: {{ this.user_id }}</div>
        </div>
        <div class="row">
          <div class="col-sm-6">تاریخ و زمان: {{ this.date }}</div>
          <div class="col-sm-6">کد رهگیری: {{ this.tracking_code }}</div>
        </div>
        <div class="row">
          <div class="col-sm-6">مبلغ: {{ this.amount }}</div>
          <div class="col-sm-6"></div>
        </div>
        <q-btn @click="confirmPayment" class="full-width bg-green text-white q-ma-sm" label="تایید" />
        <q-btn @click="deletePayment" class="full-width bg-red text-white q-ma-sm"  label="حذف" />
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

      ],
      rows: [],
      latestResult: {},
      id: '',
      user_id: '',
      date: '',
      tracking_code: '',
      amount: '',
    }
  },
  methods: {
    async confirmPayment(){
      let token = JSON.parse(localStorage.getItem('token'));
      let status = 0;
      await axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "PUT",
      url: baseurl.url + 'v1/accountant/payment/' + this.$route.params.id
    }).then(response => {
      status = response.data.status;
    });
    if(status == 1){
      this.$router.push({ path: '/accountant/confirmpayment/' });
    }
    },
    async deletePayment(){
      let token = JSON.parse(localStorage.getItem('token'));
      let status = 0;
      await axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE",
      url: baseurl.url + 'v1/accountant/payment/' + this.$route.params.id
    }).then(response => {
      status = response.data.status;
    });
    if(status == 1){
      this.$router.push({ path: '/accountant/confirmpayment/' });
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
      url: baseurl.url + 'v1/accountant/payment/' + this.$route.params.id
    }).then(response => {
      let payment = response.data;
      this.id = payment.id;
      this.user_id = payment.user_id;
      this.date = payment.date;
      this.tracking_code = payment.tracking_code;
      this.amount = payment.amount;
    });
  },
  watch: {
    user_id(newID) {
      let token = JSON.parse(localStorage.getItem('token'))
      axios.request({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: baseurl.url + 'v1/accountant/userpayments/' + newID
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
    }
  }
}
</script>
