<template>
  <div class="row banner">
    <div class="col-sm-6 q-pa-xl">
      <h3 class="q-ma-sm">امداد خودرو</h3>
      <h3 class="q-ma-sm">یدک کش</h3>
      <h3 class="q-ma-sm">تعمیرگاه</h3>
      <h3 class="q-ma-sm">سرویس خودرو</h3>
      <h3 class="q-ma-sm">کارواش</h3>
    </div>
    <div class="col-sm-6"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style scoped>
.banner {
  background-image: url("img/banner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 90vh;
}
</style>
