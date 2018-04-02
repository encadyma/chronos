<template>
  <div class="tabs-list">
    <div class="tabs-list__heading text-sub">
      <span>Your Tabs</span>
      <span v-if="selectionMode"> ({{selectedTabs.length}} tabs selected)</span>
    </div>
    <div class="tabs-list__list">
      <popup-tab v-if="!isLoading" v-for="tab in tabs" :key="tab.id" :tabData="tab" :currentWindowId="currentWindowId" :isSelecting="selectionMode" :isSelected="selectedTabs.indexOf(tab.id) !== -1" @tab-select-toggle="handleTabToggle"/>
      <div v-if="isLoading" class="tab-item">
        <i class="text-sub text-sub_dimmer">Loading all tabs...</i>
      </div>
    </div>
    <tabs-options 
      @tab-options-deletion-execute="deleteHighlightedTabs"
      @tab-options-deletion-enable="enableDeletion"
      @tab-options-action-disable="disableAction"
      :isDeleting="isDeleting"/>
  </div>
</template>

<script>
  import PopupTab from './components/PopupTab'
  import TabsOptions from './components/TabsOptions'

  export default {
    data() {
      return {
        currentWindowId: -1,
        selectionMode: false,
        isDeleting: false,
        selectedTabs: []
      }
    },
    components: { PopupTab, TabsOptions },
    props: {
      tabs: {
        type: Array,
        default: []
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      browser.windows.getCurrent().then((window) => {
        this.currentWindowId = window.id
      })
    },
    methods: {
      deleteHighlightedTabs() {
        browser.tabs.remove(this.selectedTabs).then(() => {
          this.selectedTabs = []
          this.selectionMode = false
          this.isDeleting = false
        })
      },
      enableDeletion() {
        this.selectionMode = true
        this.isDeleting = true
      },
      disableAction() {
        this.selectedTabs = []
        this.selectionMode = false
        this.isDeleting = false
      },
      handleTabToggle(tabId) {
        if (this.selectedTabs.indexOf(tabId) !== -1) {
          this.selectedTabs = this.selectedTabs.filter(id => id !== tabId)
        } else {
          this.selectedTabs.push(tabId)
        }
      }
    },
    watch: {
      tabs(newValue, oldValue) {
        if (this.selectionMode) {
          this.selectedTabs = this.selectedTabs.filter(id => {
            return newValue.map(t => t.id).indexOf(id) !== -1
          })
        }
      }
    },
  }
</script>

<style scoped>
.tabs-list {
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 4px;
}

.tabs-list__heading {
  padding: 4px 16px;
}

.tabs-list__list {
  padding: 0;
  margin: 0;
  max-height: 400px;
}
</style>