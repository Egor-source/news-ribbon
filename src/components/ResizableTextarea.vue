<template>
  <textarea ref="textarea" :value="text" :placeholder="placeholder" @input="setHeight" />
</template>

<script>
export default {
  name: "ResizableTextarea",
  props: {
    text: {
      type: String
    },
    placeholder: {
      text: {
        type: String
      }
    }
  },
  mounted() {
      let observer = new ResizeObserver(this.setHeight);
      observer.observe(this.$refs.textarea);
  },
  methods: {
    setHeight() {
      this.$refs.textarea?.setAttribute('style', `--height:auto`);
      this.$refs.textarea?.setAttribute('style', `--height:${this.$refs.textarea.scrollHeight}px`);
    },
  }
}
</script>

<style scoped>
textarea {
  --height:auto;
  font-size: 1.25rem;
  resize: none;
  overflow: hidden;
  height: var(--height);
}
</style>