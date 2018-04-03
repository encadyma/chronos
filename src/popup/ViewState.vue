<template>
  <div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Actions</span>
      </div>
      <div class="tabs-list__list">
        <div class="tab-item" @click="goBack">
          <img :src="'../icons/ic_arrow_back.png'" class="tab-item__favicon"/>
          <span>Go Back</span>
        </div>
      </div>
    </div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Saved Tabs</span>
      </div>
      <div class="tabs-list__list">
        <popup-tab 
          v-if="!isLoading" 
          v-for="tab in filteredTabs" 
          :key="tab.title" :tabData="tab" 
          @click="openTab(tab)"/>
        <div v-if="isLoading" class="tab-item">
          <i class="text-sub text-sub_dimmer">Loading tabs...</i>
        </div>
        <div class="tab-item" v-if="tabs.length > 8" @click="expandTabs = !expandTabs">
          <i class="text-sub text-sub_dimmer" v-if="!expandTabs">Show more...</i>
          <i class="text-sub text-sub_dimmer" v-else>Show less...</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PopupTab from './components/PopupTab'
  import TabsNavigation from './components/TabsNavigation'

  export default {
    data() {
      return {
        isLoading: true,
        expandTabs: false,
        currentState: {}
      }
    },
    components: { PopupTab, TabsNavigation },
    mounted() {
      browser.storage.local.get("states").then((store) => {
        this.currentState = store.states.find(s => s.id === this.$route.params.id) || null
        this.isLoading = false
      })
    },
    computed: {
      tabs() {
        return this.currentState.tabs || []
      },
      filteredTabs() {
        return this.expandTabs ? this.tabs : this.tabs.slice(0, 8)
      }
    },
    methods: {
      openTab(tab) {
        browser.tabs.create({ url: tab.url })
      },
      goBack() {
        this.$router.go(-1)
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
  overflow-y: auto;
}
</style>