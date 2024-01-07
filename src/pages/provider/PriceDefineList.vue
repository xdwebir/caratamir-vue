<template>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="لیست سفارشات در انتظار اعلام قیمت"
      v-model:pagination="pagination" :rows="rows" :columns="columns" row-key="name">

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="goPage(props.row.id)">
            اعلام قیمت
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
        { name: 'mobile', label: 'موبایل', field: 'mobile' },
        { name: 'address', label: 'آدرس', field: 'address' },
        { name: 'actions', label: 'اقدام' }
      ],
      rows: [],
      latestResult: {},
    }
  },
  methods: {
    goPage($page){
      this.$router.push({ path: '/provider/pricedefinelist/'+$page });
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
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'))
    axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: baseurl.url + 'v1/provider/pricedefinelist'
    }).then(response => {
      let rows = response.data.data;
      this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          mobile: rows[row].mobile,
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


}

</script>
