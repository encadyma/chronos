<template>
  <div class="tabs-list">
    <div class="tabs-list__heading text-sub">Your Tabs</div>
    <div class="tabs-list__list">
      <popup-tab v-if="!isLoading" v-for="tab in tabs" :key="tab.id" :tabData="tab" :currentWindowId="currentWindowId"/>
      <div v-if="isLoading" class="tab-item">
        <i class="text-sub text-sub_dimmer">Loading all tabs...</i>
      </div>
    </div>
  </div>
</template>

<script>
  import PopupTab from './components/PopupTab'

  export default {
    data() {
      return {
        currentWindowId: -1
      }
    },
    components: { PopupTab },
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
    }
  }
</script>

<style scoped>
.tabs-list {
  font-size: 14px;
  padding: 8px 0;
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