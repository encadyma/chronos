<template>
  <div id="options-i">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
  import '../fonts/material.css'
  import '../reset.css'
  import '../chronos.css'

  import Sidebar from './Sidebar'

  export default {
    components: { Sidebar },
  }
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
}

#options-i {
  display: flex;
  max-width: 1000px;
  margin: 40px auto;
}
</style>