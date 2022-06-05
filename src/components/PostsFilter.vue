<template>
  <div class="d-flex gap-3">
    <select ref="select" class="form-select" @change="selectChangHandler">
      <option v-show="!showUndoButton">Выбирите автора</option>
      <option v-for="author in authors" :value="author" :key="author">{{ author }}</option>
    </select>
    <button v-if="showUndoButton" class="btn btn-primary" @click="undoButtonHandler">Очистить</button>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex"

export default {
  name: "PostsFilter",
  computed: {
    ...mapState({
      authors: 'authors'
    })
  },
  data() {
    return {
      showUndoButton: false
    }
  },
  methods: {
    ...mapMutations({
      filterByAuthor: 'filterByField',
      undo: 'undoPostFilter'
    }),
    selectChangHandler(e) {
      this.filterByAuthor({fieldName: 'author', fieldValue: e.target.value});
      this.showUndoButton = true;
    },
    undoButtonHandler() {
      this.undo('author');
      this.showUndoButton = false;
      this.$refs.select.selectedIndex = 0;
    }
  }
}
</script>



