<template>
  <div class="tabspage">
    <div class="tabspage-inner">
      <div v-for="(windowTabs, key) in sortedTabs" :key="key">
        <h3>Window #{{key}} <span class="text-sub" v-if="key == currentWindowId">(current window)</span></h3>
        <!--<draggable v-model="sortedTabs[index]" :options="{ group: 'tabs' }" @start="dragBegin" @end="dragEnd">
          // tab-item
        </draggable>-->
        <tab-item v-for="tab in windowTabs" :key="tab.id" :tab="tab" @click="selectTab(tab, $event)"/>
      </div>
    </div>
    <div class="tabspage-sidebar">
      
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Draggable from 'vuedraggable'
  import TabItem from './components/TabItem'
  import browser from 'webextension-polyfill'

  export default {
    data() {
      return {
        tabs: [],
        sortedTabs: {},
        currentWindowId: -1,
        dragging: false,
        deletedTabs: []
      }
    },
    components: { TabItem, Draggable },
    mounted() {
      browser.tabs.onCreated.addListener(this.queryTabs)
      browser.tabs.onUpdated.addListener(this.queryTabs)
      browser.tabs.onActivated.addListener(this.queryTabs)
      browser.tabs.onRemoved.addListener(this.queryTabsOnRemoval)
      this.queryTabs()
      this.getCurrentWindow()
    },
    methods: {
      queryTabs() {
        return browser.tabs.query({}).then((data) => {
          this.tabs = data
        })
      },
      queryTabsOnRemoval(excludeTabId = -1) {
        return browser.tabs.query({}).then((data) => {
          this.tabs = data.filter(t => t.id !== excludeTabId)
        })
      },
      getCurrentWindow() {
        browser.windows.getCurrent().then(window => { this.currentWindowId = window.id })
      },
      dragBegin() {
        this.dragging = true
      },
      dragEnd() {
        this.dragging = false
      },
      selectTab() {
        
      }
    },
    watch: {
      tabs(newVal) {
        this.sortedTabs = _.groupBy(newVal, 'windowId')
      }
    },
  }
</script>

<style scoped>
.tabspage {
  display: flex;
}

.tabspage-sidebar {
  margin-left: 20px;
  max-width: 240px;
}

.tabspage-sidebar-delete {
  border: 4px dashed #888;
  color: #888;
  font-size: 14px;
  padding: 12px 20px;
}

.tabspage-sidebar-delete * {
  vertical-align: middle;
}

.tabspage-sidebar-delete span {
  margin-left: 6px;
}

.tabspage-sidebar-delete.activated {
  border-color: rgb(220, 30, 30);
  color: rgb(220, 30, 30);
}
</style>