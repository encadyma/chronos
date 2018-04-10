<template>
  <div id="home">
    <h1>Welcome to Chronos!</h1>
    <p>Chronos is a tabs extension that can help you spend time productively on the web.</p>
    <p>This browser is running Chronos {{version}}.</p>
    <br>
    <h3>Quick Actions</h3>
    <quick-action title="View all tabs" description="View, edit, and organize tabs across windows" pageName="TabsPage"/>
    <!--<quick-action title="Manage your states" description="View and edit saved collections of tabs" pageName="StatesPage"/>-->
    <quick-action title="Set up a blacklist" description="Create a profile based on a list of websites to block" pageName="ProfilesPage"/>
  </div>
</template>

<script>
  import QuickAction from './components/QuickAction'

  export default {
    components: { QuickAction },
    computed: {
      version() {
        return browser.runtime.getManifest().version
      }
    },
  }
</script>

<style scoped>
#home {
  font-size: 14px;
}
h1 {
  font-size: 1.8em;
}
</style>

<style>
html, body {
  overflow-y: auto !important;
}
</style>