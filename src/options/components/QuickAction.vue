<template>
  <div class="quick-action" :class="'quick-action_' + color" @click="goToPage">
    <div>
      <span class="quick-action__title">{{title}}</span>
      <span class="quick-action__description">{{description}}</span>
    </div>
    <div class="quick-action__action">
      <span>Go</span>
      <i class="material-icons">arrow_forward</i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Quick Action'
      },
      description: {
        type: String,
        default: 'Perform an action by clicking a shortcut button'
      },
      color: {
        type: String,
        default: 'purple'
      },
      pageName: {
        type: String,
        default: 'HomePage'
      }
    },
    methods: {
      goToPage() {
        this.$router.push({ name: this.pageName })
      }
    },
  }
</script>

<style scoped>
.quick-action {
  background: #fff;
  box-shadow: 0 2px 16px rgba(100, 100, 100, 0.2);
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  padding: 10px 18px;
  min-width: 600px;
  border-bottom: 4px solid #666;
  transition: 150ms ease;
  overflow: hidden;
}

.quick-action__title {
  color: #000;
  font-weight: 600;
}
.quick-action__description {
  margin-left: 6px;
}
.quick-action__action {
  display: flex;
  align-items: center;
  transition: 150ms cubic-bezier(0,1,.25,1)
}

.quick-action__action .material-icons {
  margin-left: 5px;
}

.quick-action:hover {
  color: #444;
  transform: translateX(6px);
}

.quick-action:active {
  background-color: #fafafa;
  transition: none;
}

.quick-action:hover .quick-action__action {
  color: rgb(55, 135, 255);
}

.quick-action_purple {
  border-color: rgb(120, 15, 200);
}
</style>