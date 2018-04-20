<template>
  <div>
    <tab-header/>
    <router-view/>
  </div>
</template>

<script>
  import '../fonts/material.css'
  import '../reset.css'
  import '../chronos.css'

  import TabHeader from './components/TabHeader'

  export default {
    components: { TabHeader }
  }
</script>

<style scoped>

</style>