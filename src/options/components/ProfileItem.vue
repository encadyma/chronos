<template>
  <div class="component-profile-item" @click="$emit('click', $event)">
    <div class="component-profile-item__top">
      <div class="component-profile-item__top__title">{{profile.name}}</div>
      <div class="component-profile-item__top__mode">{{blockMode}}</div>
      <i class="material-icons component-profile-item__top__icon">{{profile.icon}}</i>
    </div>
    <div class="component-profile-item__bot">
      <div></div>
      <div class="component-profile-item__bot__action">
        <span>Go</span>
        <i class="material-icons">arrow_forward</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      profile: {
        type: Object,
        default: null
      },
    },
    computed: {
      blockMode() {
        if (!this.profile) return "Loading Mode"
        else if (this.profile.blockMode === "off") return "Off"
        else if (this.profile.blockMode === "open") return "Open Mode"
        else if (this.profile.blockMode === "standard") return "Standard Mode"
        else if (this.profile.blockMode === "whitelist") return "Whitelist Mode"
        else if (this.profile.blockMode === "lockdown") return "Lockdown Mode"
        else return "No Mode"
      }
    }
  }
</script>

<style scoped>
.component-profile-item {
  background-color: #fdfdfd;
  box-shadow: 0 2px 16px rgba(0, 0, 0, .1);
  cursor: pointer;
  width: 240px;
  overflow: hidden;
}

.component-profile-item__top {
  padding: 16px 24px;
  position: relative;
}

.component-profile-item__top__title {
  font-size: 1.2em;
  font-weight: 600;
  z-index: 2;
}

.component-profile-item__top__mode {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
  z-index: 2;
}

.component-profile-item__top__icon {
  color: rgba(200, 200, 200, 0.4);
  font-size: 100px;
  position: absolute;
  top: -20px;
  left: -20px;
  z-index: 1;
}

.component-profile-item__bot {
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  padding: 6px 24px;
}

.component-profile-item__bot__action {
  display: flex;
  font-size: 14px;
  align-items: center;
  transition: 150ms cubic-bezier(0, 1, .25, 1);
}

.component-profile-item__bot__action .material-icons {
  margin-left: 5px;
}

.component-profile-item:hover .component-profile-item__bot__action {
  color: rgb(55, 135, 255);
  transition: 150ms cubic-bezier(0, 1, .25, 1);
}
</style>