<template>
  <div>
    <div class="chronos-icon-picker">
      <i class="chronos-icon-picker__icon material-icons"
        v-for="i in icons" :key="i.id" 
        :title="i.description" @click="changeIcon(i.id)"
        :class="{ selected: i.id === icon }">{{i.id}}</i>
    </div>
    <div class="chronos-icon-picker__subtitle text-sub">{{currentDescription}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: 'language'
      },
    },
    data() {
      return {
        icons: [
          { id: 'language', description: 'Globe' },
          { id: 'work', description: 'Briefcase' },
          { id: 'business', description: 'Business' },
          { id: 'local_grocery_store', description: 'Shopping' },
          { id: 'chat', description: 'Chat' },
          { id: 'location_city', description: 'City' },
          { id: 'school', description: 'School' },
          { id: 'weekend', description: 'Couch' },
          { id: 'dns', description: 'Servers' },
          { id: 'account_balance', description: 'Bank' },
          { id: 'android', description: 'Android' },
          { id: 'album', description: 'Music disc' },
          { id: 'radio', description: 'Radio' },
          { id: 'public', description: 'Globe (alternate)' },
          { id: 'assessment', description: 'Graph' },
          { id: 'assignment', description: 'Assignment' },
          { id: 'bookmark', description: 'Bookmark' },
          { id: 'explore', description: 'Compass' },
          { id: 'fingerprint', description: 'Fingerprint' },
          { id: 'face', description: 'Person' },
          { id: 'favorite', description: 'Heart/Favorite' },
          { id: 'whatshot', description: 'Hot' },
          { id: 'extension', description: 'Extension' },
          { id: 'euro_symbol', description: 'Euro' },
          { id: 'https', description: 'Secure' },
          { id: 'rowing', description: 'Rowing boat' },
          { id: 'schedule', description: 'Clock' },
          { id: 'star_rate', description: 'Star' },
          { id: 'store', description: 'Store' },
          { id: 'event_seat', description: 'Seat' },
          { id: 'timeline', description: 'Upwards graph' },
          { id: 'devices_other', description: 'Devices' },
          { id: 'lightbulb_outline', description: 'Idea/Lightbulb' },
          { id: 'loyalty', description: 'Love tag/loyalty' },
          { id: 'payment', description: 'Credit card' },
          { id: 'perm_media', description: 'Media folder' },
          { id: 'router', description: 'Router' },
          { id: 'speaker', description: 'Speaker' },
          { id: 'smartphone', description: 'Smartphone' },
          { id: 'videogame_asset', description: 'Video game' },
          { id: 'memory', description: 'Computer chip/memory' },
          { id: 'tv', description: 'TV' },
          { id: 'camera_alt', description: 'Camera' },
          { id: 'palette', description: 'Painting' },
          { id: 'ac_unit', description: 'Winter' },
          { id: 'directions_boat', description: 'Boat' },
          { id: 'train', description: 'Train' },
          { id: 'directions_car', description: 'Car' },
          { id: 'flight', description: 'Flight' },
          { id: 'layers', description: 'Layers' },
          { id: 'local_bar', description: 'Wine glass' },
          { id: 'local_atm', description: 'Money bill' },
          { id: 'local_florist', description: 'Flower' },
          { id: 'apps', description: 'Apps' },
          { id: 'all_inclusive', description: 'Infinity' },
        ]
      }
    },
    methods: {
      changeIcon(iconId) {
        this.$emit('changeIcon', iconId)
      }
    },
    computed: {
      currentDescription() {
        return this.icons.find(i => i.id === this.icon).description 
      }
    },
  }
</script>

<style scoped>
.chronos-icon-picker {
  background-color: #fdfdfd;
  display: grid;
  grid-template-columns: repeat(10, 32px);
  grid-gap: 4px;
  padding: 4px;
}

.chronos-icon-picker__icon {
  border-radius: 2px;
  color: #333;
  cursor: pointer;
  display: inline-block;
  font-size: 24px;
  padding: 4px;
  overflow: hidden;
}

.chronos-icon-picker__icon:hover {
  background-color: #eaeaea;
}

.chronos-icon-picker__icon.selected {
  cursor: default;
  background-color: rgba(55, 135, 255, 0.2);
  color: rgba(55, 135, 255);
}

.chronos-icon-picker__subtitle {
  font-size: 12px;
  margin: 10px 0;
}
</style>