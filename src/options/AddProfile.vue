<template>
  <div class="options-add-profile">
    <h1>Add a Profile</h1>
    <div class="options-add-profile__row">
      <div class="options-add-profile__row__label">Profile Name</div>
      <div class="options-add-profile__row__content">
        <div class="input-text">
          <input type="text" placeholder="Profile Name" v-model="newProfile.name"/>
        </div>
      </div>
    </div>
    <div class="options-add-profile__row">
      <div class="options-add-profile__row__label">Default Mode</div>
      <div class="options-add-profile__row__content">
        <profile-mode :mode="newProfile.blockMode" @changeMode="newProfile.blockMode = $event" :requireConfirmation="false"/>
      </div>
    </div>
    <div class="options-add-profile__row">
      <div class="options-add-profile__row__label">Icon</div>
      <div class="options-add-profile__row__content">
        <icon-picker :icon="newProfile.icon" @changeIcon="newProfile.icon = $event"/>
      </div>
    </div>
    <button class="button" :class="{ disabled: !isFormValid }" @click="createProfile">Create Profile</button>
  </div>
</template>

<script>
  import ProfileMode from './components/ProfileMode'
  import IconPicker from '../components/IconPicker'
  import browser from 'webextension-polyfill'

  export default {
    components: { ProfileMode, IconPicker },
    data() {
      return {
        newProfile: {
          // id: auto,
          name: '',
          icon: 'language',
          color: 'black',
          blacklist: [],
          whitelist: [],
          blockMode: 'standard',
          default: false
        }
      }
    },
    methods: {
      createProfile() {
        if (!this.isFormValid) return false

        return browser.storage.local.get("profiles").then(({ profiles }) => {
          this.newProfile.id = profiles.length
          
          return browser.storage.local.set({ profiles: profiles.concat([ this.newProfile ]) })
            .then(() => this.redirectToProfile(this.newProfile.id))
        })
      },
      redirectToProfile(id) {
        this.$router.push({ name: 'ViewProfile', params: { id: id } })
      }
    },
    mounted() {
      browser.storage.local.get("profiles")
        .then(({ profiles }) => { this.newProfile.name = 'New Profile #' + profiles.length })
    },
    computed: {
      isFormValid() {
        if (this.newProfile.name.length < 3) return false
        else if (this.newProfile.name.length > 32) return false
        return true
      }
    }
  }
</script>

<style scoped>
.options-add-profile__row {
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
}

.options-add-profile__row__label {
  color: #666;
  font-size: 14px;
  font-weight: 600;
  min-width: 120px;
}
</style>