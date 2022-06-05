<template>
  <select  class="form-select" @change="selectChangeHandler">
    <option value="asc">Заголовок, по возрастанию</option>
    <option value="desc">Заголовок, по убыванию</option>
  </select>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "PostSorting",
  methods:{
    ...mapMutations({
      sortByTitle:'sortByField'
    }),
    selectChangeHandler(e){
      this.sortByTitle({
        fieldName:'title',
        order:e.target.value,
        compareFunction: (next,current)=> next.localeCompare(current)
      })
    }
  }
}
</script>

