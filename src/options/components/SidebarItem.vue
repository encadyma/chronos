<template>
  <div class="options-sidebar__item" :class="{ 'selected': isSelected }" @click="goToPage()">
    <i class="material-icons" v-if="icon">{{icon}}</i>
    <img class="options-sidebar__item__favicon" :src="img" v-else-if="img"/>
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: null
      },
      img: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: '(unknown)'
      },
      page: {
        type: String,
        default: null
      },
    },
    methods: {
      goToPage() {
        if (this.page) {
          this.$router.push(this.page)
        }
      }
    },
    computed: {
      isSelected() {
        return this.$route.path == this.page
      }
    },
  }
</script>

<style scoped>
.options-sidebar__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 2px;
  font-size: 14px;
  margin: 2px 0;
}

.options-sidebar__item:hover {
  background-color: rgba(100, 100, 100, 0.1)
}

.options-sidebar__item:active {
  background-color: rgba(100, 100, 100, 0.18)
}

.options-sidebar__item.selected {
  cursor: default;
  background-color: rgba(55, 135, 255, 0.1);
  color: rgb(55, 135, 255);
}

.options-sidebar__item .material-icons {
  margin-right: 8px;
}

.options-sidebar__item__favicon {
  height: 20px;
  margin-right: 8px;
}
</style>