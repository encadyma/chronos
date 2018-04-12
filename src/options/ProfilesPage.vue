<template>
  <div>
    <h1>Profiles</h1>
    <div class="profiles-grid">
      <profile-item v-for="profile in profiles" :key="profile.id" :profile="profile" @click="goToProfile(profile.id)"/>
    </div>
  </div>
</template>

<script>
  import ProfileItem from './components/ProfileItem'

  export default {
    components: { ProfileItem },
    data() {
      return {
        profiles: []
      }
    },
    mounted() {
      browser.storage.local.get("profiles")
        .then((store) => this.profiles = store.profiles)
    },
    methods: {
      goToProfile(profileId) {
        this.$router.push({ name: 'ViewProfile', params: { id: profileId }})
      }
    },
  }
</script>

<style scoped>
.profiles-grid {
  display: grid;
  grid-template-columns: repeat(3, 240px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
</style>