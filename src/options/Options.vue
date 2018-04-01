<template>
  <div>
    Hello there! This is new!
    <div v-for="tab in tabs" :key="tab.id">
      {{ tab }}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs: []
      }
    },
    mounted() {
      browser.tabs.query({}).then((data) => {
        this.tabs = data
      })
    }
  }
</script>

<style scoped>

</style>