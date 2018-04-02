<template>
  <div class="tabs-options">
    <div class="tabs-options__menu">
      <div class="tabs-options__item" title="Go Back" @click="goHome">
        <i class="material-icons">chevron_left</i>
        <span class="tabs-options__item__helper">Back</span>
      </div>
    </div>
    <div class="tabs-options__menu"></div>
  </div>
</template>

<script>
  export default {
    methods: {
      goHome() {
        this.$router.push({ name: 'Home' })
      }
    },
  }
</script>
<style scoped>
.tabs-options {
  padding-bottom: 8px;
}
</style>