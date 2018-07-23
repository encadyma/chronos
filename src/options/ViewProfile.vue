<template>
  <div v-if="!isLoading">
    <h1>{{profile.name}}</h1>
    <div class="profile-view-modes">
      <label class="text-sub">Default Mode</label>
      <profile-mode :mode="profileMode" @changeMode="changeMode" :uniqueKey="profile.id"/>
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
    <div class="text-sub profile-view-delete-btn" @click="hasDoubleClickedDelete = true" v-if="!profile.default && !hasDoubleClickedDelete">Delete this profile (irreversable)</div>
    <div class="text-sub profile-view-delete-btn" @click="deleteProfile" v-if="!profile.default && hasDoubleClickedDelete">Click this message again to confirm deleting this profile.</div>
  </div>
</template>

<script>
  import SiteListEditor from './components/SiteListEditor'
  import ProfileMode from './components/ProfileMode'
  import browser from 'webextension-polyfill'

  import _ from 'lodash'

  export default {
    components: { SiteListEditor, ProfileMode },
    data() {
      return {
        profile: null,
        isLoading: true,
        hasDoubleClickedDelete: false
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
          store.profiles[index].blockMode = mode

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
      },
      deleteProfile() {
        if (this.profile.default) return false

        return browser.storage.local.get("profiles").then((store) => {
          const index = _.findIndex(store.profiles, { id: this.profileId })
          store.profiles[index].isDeleted = true

          return browser.storage.local.set({
            profiles: store.profiles
          })
        }).then(() => this.$router.push('/profiles'))
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
        return this.profile.blockMode
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.loadProfile(parseInt(to.params.id))
      this.hasDoubleClickedDelete = false
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

.profile-view-delete-btn {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  font-weight: 600;
  margin-top: 50px;
}

.profile-view-delete-btn:hover {
  color: rgba(220, 30, 30, 0.8);
}
</style>