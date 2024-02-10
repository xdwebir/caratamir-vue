<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="favicon.png">
          </q-avatar>
          کاراتعمیر
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="خانه" />
        <!-- <q-route-tab v-if="isLogin" to="/dashboard" label="داشبرد" /> -->
        <q-route-tab v-if="isOperator" to="/operator/waitingorders" label="اختصاص خدمت رسان" />
        <q-route-tab v-if="isOperator" to="/operator/ordershistory" label="تاریخچه سفارشات" />
        <q-route-tab v-if="isAccountant" to="/accountant/confirmpayment" label="تایید فیش پرداخت" />
        <q-route-tab v-if="isAccountant" to="/accountant/paymentshistory" label="تاریخچه پرداخت ها" />
        <q-route-tab v-if="isProvider" to="/provider/addpayment" label="پرداخت" />
        <q-route-tab v-if="isProvider" to="/provider/ordershistory" label="تاریخچه سفارشات" />
        <q-route-tab v-if="isProvider" to="/provider/paymentshistory" label="تاریخچه پرداخت ها" />
        <q-route-tab v-if="isProvider" to="/provider/pricedefinelist" label="اعلام قیمت" />
        <q-route-tab v-if="isProvider" to="/provider/editprofile" label="پروفایل خدمات" />
        <q-route-tab v-if="isLogin" to="/user/editprofile" label="پروفایل کاربری" />
        <q-route-tab v-if="isCustomer" to="/customer/dashboard" label="داشبرد" />
        <q-route-tab v-if="isCustomer" to="/customer/addorder" label="ثبت سفارش" />
        <q-route-tab v-if="isCustomer" to="/customer/orderslist" label="لیست سفارشات" />
        <q-route-tab v-if="!isLogin" to="/login" label="ورود" />
        <q-route-tab v-if="!isLogin" to="/register" label="ثبت نام" />
        <q-route-tab v-if="isLogin" to="/logout" label="خروج" />
      </q-tabs>
    </q-header>

    <q-drawer class="shadow-5 sidebar" show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-img class="q-ma-md" width="250px" align="center" src="img/logo-blue.png"  spinner-color="primary" spinner-size="82px" />
      <hr />
      <RouterLink to="/">خانه</RouterLink><br />
      <a href="https://blog.caratamir.ir">مقالات</a><br />
      <!-- <RouterLink v-if="isLogin" to="/dashboard">داشبرد</RouterLink><br v-if="isLogin" /> -->
      <RouterLink v-if="isLogin" to="/user/editprofile">پروفایل کاربری</RouterLink><br v-if="isLogin" />
      <RouterLink v-if="isAccountant" to="/accountant/confirmpayment">تایید فیش پرداخت</RouterLink><br
        v-if="isAccountant" />
      <RouterLink v-if="isAccountant" to="/accountant/paymentshistory">تاریخچه پرداخت ها</RouterLink><br
        v-if="isAccountant" />
      <RouterLink v-if="isOperator" to="/operator/waitingorders">اختصاص خدمت رسان</RouterLink><br v-if="isOperator" />
      <RouterLink v-if="isOperator" to="/operator/ordershistory">تاریخچه سفارشات</RouterLink><br v-if="isOperator" />
      <RouterLink v-if="isProvider" to="/provider/editprofile">پروفایل خدمات</RouterLink><br v-if="isProvider" />
      <RouterLink v-if="isProvider" to="/provider/addpayment">پرداخت</RouterLink><br v-if="isProvider" />
      <RouterLink v-if="isProvider" to="/provider/ordershistory">تاریچه سفارشات</RouterLink><br v-if="isProvider" />
      <RouterLink v-if="isProvider" to="/provider/paymentshistory">تاریچه پرداخت ها</RouterLink><br v-if="isProvider" />
      <RouterLink v-if="isProvider" to="/provider/pricedefinelist">اعلام قیمت</RouterLink><br v-if="isProvider" />
      <RouterLink v-if="isCustomer" to="/customer/dashboard">داشبرد</RouterLink><br v-if="isCustomer" />
      <RouterLink v-if="isCustomer" to="/customer/addorder">ثبت سفارش</RouterLink><br v-if="isCustomer" />
      <RouterLink v-if="isCustomer" to="/customer/orderslist">لیست سفارشات</RouterLink><br v-if="isCustomer" />
      <RouterLink v-if="!isLogin" to="/login">ورود</RouterLink><br v-if="!isLogin" />
      <RouterLink v-if="!isLogin" to="/register">ثبت نام</RouterLink><br v-if="!isLogin" />
      <RouterLink v-if="isLogin" to="/logout">خروج</RouterLink>
      <hr/>
      <h5 align="center">پشتیبانی - ۰۹۰۳۲۲۱۱۹۰۳</h5>
    </q-drawer>

    <q-page-container>
      <RouterView></RouterView>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { is } from 'stores/store'

const access = is()

export default {
  setup() {
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      }
    };
  },
  computed: {
    isLogin() {
      return access.login
    },
    isAdmin() {
      return access.admin
    },
    isCustomer() {
      return access.customer
    },
    isProvider() {
      return access.provider
    },
    isOperator() {
      return access.operator
    },
    isAccountant() {
      return access.accountant
    },
  }

}
</script>

<style scoped>
.sidebar a {
  text-decoration: none;
  text-align: center;
  font-size: large;
  display: block;
  color: black;
}

.sidebar a:hover {
  color: blue;
}
</style>
