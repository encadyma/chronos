<template>
  <div>
    <tabs-list :tabs="tabs" :isLoading="loading"/>
  </div>
</template>

<script>
  import '../reset.css'
  import '../chronos.css'

  import TabsList from './TabsList'

  export default {
    data() {
      return {
        tabs: [],
        loading: true
      }
    },
    components: { TabsList },
    mounted() {
      browser.tabs.onCreated.addListener(this.updateTabs)
      browser.tabs.onUpdated.addListener(this.updateTabs)
      browser.tabs.onActivated.addListener(this.updateTabs)
      browser.tabs.onRemoved.addListener(this.updateTabsOnRemoval)
      this.updateTabs()
    },
    methods: {
      updateTabs() {
        browser.tabs.query({}).then((data) => {
          this.tabs = data
          this.loading = false
        })
      },
      updateTabsOnRemoval(excludeTabId = -1) {
        browser.tabs.query({}).then((data) => {
          this.tabs = data.filter(t => t.id !== excludeTabId)
          this.loading = false
        })
      }
    },
  }
</script>

<style scoped>

</style>