<template>
  <div class="q-pa-md">
    <q-table :rows-per-page-options="rowsPerPageOptions" title="سفارشات در انتظار خدمت رسان"
      v-model:pagination="pagination" :rows="rows" :columns="columns" row-key="name">

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="goPage(props.row.id)">
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
        { name: 'city_name', label: 'شهر', field: 'city_name' },
        { name: 'state_name', label: 'استان', field: 'state_name' },
        { name: 'last_name', label: 'نام', field: 'last_name' },
        { name: 'first_name', label: 'نام خانوادگی', field: 'first_name' },
        { name: 'service_name', label: 'خدمت', field: 'service_name' },
        { name: 'actions', label: 'اقدام' }
      ],
      rows: [],
      latestResult: {},
    }
  },
  methods: {
    goPage($page){
      this.$router.push({ path: '/operator/waitingorders/'+$page });
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
            city_name: rows[row].city_name,
            state_name: rows[row].state_name,
            last_name: rows[row].last_name,
            first_name: rows[row].first_name,
            service_name: rows[row].service_name,
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
            city_name: rows[row].city_name,
            state_name: rows[row].state_name,
            last_name: rows[row].last_name,
            first_name: rows[row].first_name,
            service_name: rows[row].service_name,
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
      url: baseurl.url + 'v1/operator/waitingorders'
    }).then(response => {
      let rows = response.data.data;
      this.latestResult = response.data;
      for (let row in rows) {
        this.rows.push({
          id: rows[row].id,
          mobile: rows[row].mobile,
          address: rows[row].address,
          city_name: rows[row].city_name,
          state_name: rows[row].state_name,
          last_name: rows[row].last_name,
          first_name: rows[row].first_name,
          service_name: rows[row].service_name,
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
