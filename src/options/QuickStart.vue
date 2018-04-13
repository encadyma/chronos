<template>
  <div>
    <h1>Welcome to Chronos!</h1>
    <p>Thank you for installing Chronos. Chronos is a tabs extension that can help you spend time productively on the web. <b>Here are some cool tips to know to make your experience even better:</b></p>
    <div class="options-quick-start-panel" v-for="topic in helpTopics" :key="topic.id">
      <div class="options-quick-start-panel-heading" @click="toggleTopicClick(topic.id)" :class="{ selected: selectedTopic === topic.id }">
        <i class="material-icons" v-if="selectedTopic === topic.id">remove_circle</i>
        <i class="material-icons" v-else>add_circle</i>
        <span>Tip #{{topic.id}}: {{topic.title}}</span>
      </div>
      <img class="options-quick-start-panel-image" :src="topic.img" width="100%" v-if="selectedTopic === topic.id"/>
    </div>
  </div>
</template>

<style scoped>
p {
  line-height: 1.5;
}

.options-quick-start-panel {
  margin: 10px 0;
}

.options-quick-start-panel-heading {
  font-weight: 600;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  transition: 150ms ease;
}

.options-quick-start-panel-heading:hover,
.options-quick-start-panel-heading.selected {
  color: rgb(55, 135, 255);
}

.options-quick-start-panel-heading .material-icons {
  vertical-align: middle;
}

.options-quick-start-panel-heading span {
  margin-left: 10px;
  vertical-align: middle;
}
</style>

<script>
export default {
  data() {
    return {
      helpTopics: [
        { id: 1, img: '../screenshots/Guide1.png', title: 'Navigating around' },
        { id: 2, img: '../screenshots/Guide2.png', title: 'Quickly manage your tabs' },
        { id: 3, img: '../screenshots/Guide3.png', title: 'Use States to save tabs for later' },
        { id: 4, img: '../screenshots/Guide4.png', title: 'Know what a Profile is' },
        { id: 5, img: '../screenshots/Guide5.png', title: 'Use Profiles to block websites' },
      ],
      selectedTopic: 0
    }
  },
  mounted() {
    browser.storage.local.set({ hasAccessedQuickstart: true })
  },
  methods: {
    toggleTopicClick(topicId) {
      if (this.selectedTopic === topicId) this.selectedTopic = 0
      else this.selectedTopic = topicId
    }
  },
}
</script>
