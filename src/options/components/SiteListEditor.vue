<template>
  <div class="profiles-sitelist-editor">
    <div class="profiles-sitelist-editor__input" :class="{ error: hasError }">
      <div class="input-text_bare">
        <input type="text" placeholder="Add a domain name (ex: example.com)" v-model="newSite" @keyup.enter="onAddSite"/>
      </div>
      <i class="material-icons" @click="onAddSite(newSite)">add</i>
    </div>
    <div class="profiles-sitelist-editor__item-list">
      <div class="profiles-sitelist-editor__item" v-for="site in list" :key="site">
        <span>{{site}}</span>
        <i class="material-icons" @click="onDeleteSite(site)">delete</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: [Array, Boolean],
        default: () => []
      },
    },
    data() {
      return {
        validateRegex: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
        newSite: '',
        hasError: false
      }
    },
    methods: {
      onAddSite() {    // => String
        if (!this.isCorrectFormat(this.newSite) || this.isDuplicate(this.newSite)) {
          console.log(!this.isCorrectFormat(this.newSite), this.isDuplicate(this.newSite))
          this.hasError = true
          return
        }

        let newList = this.list
        newList = newList.concat([ this.newSite ])

        this.$emit('listChange', newList)

        this.newSite = ''
        this.hasError = false
      },
      isCorrectFormat(url) {   // true if the user typed a hostname
        return this.validateRegex.test(url)
      },
      isDuplicate(url) {
        return this.list.indexOf(url) !== -1
      },
      onDeleteSite(url) {
        let newList = this.list
        newList = newList.filter(u => u !== url)

        this.$emit('listChange', newList)
      }
    },
  }
</script>

<style scoped>
.profiles-sitelist-editor__input {
  box-shadow: 0 2px 8px rgba(100, 100, 100, .1);
  display: inline-flex;
  background-color: #fdfdfd;
  border-radius: 2px;
  align-items: center;
  transition: 150ms ease;
}

.profiles-sitelist-editor__input .material-icons {
  cursor: pointer;
  font-size: 18px;
  padding: 0 6px;
  color: rgba(0, 0, 0, .6);
}

.profiles-sitelist-editor__input .material-icons:hover {
  color: rgba(0, 0, 0, .8);
}

.profiles-sitelist-editor__input.error {
  box-shadow: 0 2px 8px rgba(220, 30, 30, .1);
  color: rgb(220, 30, 30);
}

.profiles-sitelist-editor__input.error input {
  color: rgb(220, 30, 30);
}

.profiles-sitelist-editor__item-list {
  padding: 5px 0;
}

.profiles-sitelist-editor__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 6px 12px;
  color: rgba(0, 0, 0, .7);
}

.profiles-sitelist-editor__item .material-icons {
  color: rgba(0, 0, 0, .7);
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
}

.profiles-sitelist-editor__item .material-icons:hover {
  color: rgba(0, 0, 0, .9);
}
</style>