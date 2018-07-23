<template>
  <div id="home">
    <h1>Options</h1>
    <p>This browser is running Chronos {{version}}.</p>
    <br>
    <h3>Quick Actions: I want to...</h3>
    <!--<quick-action title="View all tabs" description="View tabs across windows" pageName="TabsPage"/>-->
    <!--<quick-action title="Manage your states" description="View and edit saved collections of tabs" pageName="StatesPage"/>-->
    <quick-action title="See all profiles" description="View and manage all created profiles" pageName="ProfilesPage"/>
    <quick-action title="Block off sites" description="Create a profile based on a list of websites to block" pageName="AddProfile"/>
    <!--<quick-action title="Edit current profile" description="Edit the current profile's site lists, blocking mode, and more" pageName="ViewProfile" :params="{ id: currentProfile }"/>-->
    <quick-action title="Find help" description="Open the Chronos quickstart with walkthroughs on common actions" pageName="QuickStart"/>
    <quick-action title="Request a feature" description="Open the Github issue tracker for Chronos (sign-up required)" pageName="HomePage" @click.native="goToGithub"/>
  </div>
</template>

<script>
  import QuickAction from './components/QuickAction'
  import browser from 'webextension-polyfill'

  export default {
    components: { QuickAction },
    computed: {
      version() {
        return browser.runtime.getManifest().version
      }
    },
    methods: {
      goToGithub() {
        browser.tabs.create({url: "https://github.com/encadyma/chronos/issues"})
      }
    }
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