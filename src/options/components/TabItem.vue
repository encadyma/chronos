<template>
  <div class="component-tab-item" @click="reactClick($event)">
    <div class="component-tab-item__inner">
      <i class="material-icons component-tab-item__drag">drag_handle</i>
      <b class="component-tab-item__title">{{title}}</b>
      <span class="component-tab-item__url">{{url}}</span>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    props: {
      tab: {
        type: Object,
        default: null
      },
      titleCharacterLimit: {
        type: Number,
        default: 30
      },
      urlCharacterLimit: {
        type: Number,
        default: 40
      }
    },
    methods: {
      reactClick($event) {
        this.$emit('click', $event)
      }
    },
    computed: {
      title() {
        if (this.tab.title.length > this.titleCharacterLimit) {
          return this.tab.title.substr(0, this.titleCharacterLimit - 3) + '...'
        } else return this.tab.title
      },
      url() {
        if (this.tab.url.length > this.urlCharacterLimit) {
          return this.tab.url.substr(0, this.urlCharacterLimit - 3) + '...'
        } else return this.tab.url
      }
    }
  }
</script>

<style scoped>
.component-tab-item {
  background-color: #fefefe;
  border-radius: 4px;
  border: 1px solid rgba(100, 100, 100, 0.1);
  cursor: default;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin: 4px 0;
  min-width: 400px;
  transition: 100ms ease;
}

.component-tab-item:hover {
  background-color: #fafafa;
  border-color: rgba(100, 100, 100, 0.6);
}

.component-tab-item__inner {
  display: flex;
  align-items: center;
}

.component-tab-item__drag {
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
}

.component-tab-item:hover .component-tab-item__drag {
  color: rgba(0, 0, 0, 1);
}

.component-tab-item__title {
  margin-left: 4px;
}

.component-tab-item__url {
  color: #444;
  margin-left: 6px;
}
</style>