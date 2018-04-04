<template>
  <div id="options-sidebar">
    <sidebar-item title="Home" icon="home" page="HomePage"/>
    <sidebar-item title="Tabs" icon="tab" page="TabsPage"/>
    <sidebar-item title="States" icon="archive" page=""/>
  </div>
</template>

<script>
  import SidebarItem from './components/SidebarItem'

  export default {
    components: { SidebarItem }
  }
</script>

<style scoped>
#options-sidebar {
  min-width: 200px;
  margin-right: 40px;
}
</style>