<template>
  <div v-if="!isLoading">
    <h1>{{profile.name}}</h1>
    <div class="profile-view-modes">
      <label class="text-sub">Default Mode</label>
      <profile-mode :mode="profileMode" @changeMode="changeMode"/>
    </div>
    <div class="profile-lists">
      <div class="profile-list">
        <h3>Blacklist</h3>
        <site-list-editor :list="profile.blacklist" @listChange="handleListChange('blacklist', $event)"/>
      </div>
      <div class="profile-list">
        <h3>Whitelist</h3>
        <site-list-editor :list="profile.whitelist" @listChange="handleListChange('whitelist', $event)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import SiteListEditor from './components/SiteListEditor'
  import ProfileMode from './components/ProfileMode'

  import _ from 'lodash'

  export default {
    components: { SiteListEditor, ProfileMode },
    data() {
      return {
        profile: null,
        isLoading: true,
      }
    },
    methods: {
      loadProfile(id) {
        return browser.storage.local.get("profiles").then((store) => {
          this.profile = store.profiles.find(p => p.id === id)
          this.isLoading = false
        })
      },
      changeMode(mode) {
        return browser.storage.local.get("profiles").then((store) => {
          const index = _.findIndex(store.profiles, { id: this.profileId })
          store.profiles[index].mode = mode

          return browser.storage.local.set({
            profiles: store.profiles
          })
        }).then(() => this.loadProfile(this.profileId))
      },
      handleListChange(listName, newList) {
        return browser.storage.local.get("profiles").then((store) => {
          const index = _.findIndex(store.profiles, { id: this.profileId })
          store.profiles[index][listName] = newList

          return browser.storage.local.set({
            profiles: store.profiles
          })
        }).then(() => this.loadProfile(this.profileId))
      }
    },
    mounted() {
      this.loadProfile(this.profileId)
    },
    computed: {
      profileId() {
        return parseInt(this.$route.params.id)
      },
      profileMode() {
        return this.profile.mode
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.loadProfile(parseInt(to.params.id))
      next()
    }
  }
</script>

<style scoped>
.profile-view-modes {
  display: flex;
  font-size: 14px;
  align-items: flex-start;
}

.profile-view-modes .text-sub {
  margin-right: 40px;
}
</style>