<template>
  <div class="tabs-options">
    <div class="tabs-options__menu"></div>
    <div class="tabs-options__menu">
      <div v-if="isSelecting" class="tabs-options__item" title="Cancel" @click="cancelAction">
        <i class="material-icons">close</i>
      </div>
      <div v-if="!isSelecting" class="tabs-options__item" title="Open New Tab">
        <i class="material-icons">add</i>
      </div>
      <div class="tabs-options__item"
        :class="{ 'tabs-options__item_highlighted_red': isDeleting }"
        @click="toggleDeletion" :title="isDeleting ? 'Confirm Deletion' : 'Delete Tabs'">
        <i class="material-icons" v-if="isDeleting">delete_forever</i>
        <i class="material-icons" v-else>delete</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isDeleting: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      toggleDeletion() {
        if (this.isDeleting) {
          this.$emit('tab-options-deletion-execute')
        } else {
          this.$emit('tab-options-deletion-enable')
        }
      },
      cancelAction() {
        this.$emit('tab-options-action-disable')
      }
    },
    computed: {
      isSelecting() {
        return this.isDeleting 
      }
    },
  }
</script>

<style scoped>
.tabs-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 10px;
}

.tabs-options__menu {
  display: flex;
  flex-direction: row;
}

.tabs-options__item {
  color: rgba(0, 0, 0, 0.6);
  margin: 0 2px;
}

.tabs-options__item:hover {
  color: rgba(0, 0, 0, 0.8);
}

.tabs-options__item:active {
  color: rgba(0, 0, 0, 1);
}

.tabs-options__item .material-icons {
  font-size: 24px;
  vertical-align: middle;
}

.tabs-options__item_highlighted_red {
  color: rgb(220, 30, 30);
}

.tabs-options__item_highlighted_red:hover {
  color: rgb(185, 25, 25);
}

.tabs-options__item_highlighted_red:active {
  color: rgb(135, 20, 20);
}
</style>