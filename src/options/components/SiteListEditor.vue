<template>
  <div class="profiles-sitelist-editor">
    <div class="profiles-sitelist-editor__item"></div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        validateRegex: /^(?!http|https|https:\/\/|http:\/\/)([?a-zA-Z0-9-.\+]{2,256}\.[a-z]{2,64}\b)/gm
      }
    },
    methods: {
      onAddSite(newSite) {    // => String
        if (!this.validateHost(newSite)) return

        let newList = this.list
        newList.push(newSite)

        this.$emit('input', newList)
      },
      validateHost(url) {
        return this.validateRegex.test(url)
      }
    },
  }
</script>

<style scoped>

</style>