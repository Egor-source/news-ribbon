<template>
  <div class="create-form-wrapper">
    <form @submit.prevent="submitFormHandler" class="create-form">
      <input type="text" class="form-control form-control-lg mb-3" placeholder="Автор" v-model="post.author" required>
      <input type="text" class="form-control form-control-lg mb-3" placeholder="Заголовок поста" v-model="post.title"
             required>
      <input type="email" class="form-control form-control-lg mb-3" placeholder="Почта" v-model="post.email" required>
      <input type="file" class="form-control form-control-lg mb-3" accept=".jpg,.png" required
             @change="fileInputChangeHandler">
      <ResizableTextarea class="form-control mb-3" :placeholder="'Текст поста'" rows="1" :text="post.text"
                         @input="textareaInputHandler" required/>
      <button class="btn btn-primary btn-lg" type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import ResizableTextarea from "@/components/ResizableTextarea";
import parseDate from "@/js/parseDate";
import {mapMutations} from "vuex";
import {v4} from "uuid"

export default {
  name: "CreateNewPost",
  components: {ResizableTextarea},
  data() {
    return {
      post: {
        id: '',
        author: '',
        title: '',
        email: '',
        img: '',
        text: '',
        date: ''
      }
    }
  },
  methods: {
    ...mapMutations({
      addPost: 'addPost'
    }),
    fileInputChangeHandler(e) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {
        this.post.img = reader.result;
      }
    },
    textareaInputHandler(e) {
      this.post.text = e.target.value;
    },
    submitFormHandler() {
      this.post.date = parseDate(Date.now());
      this.post.id = v4();
      this.addPost(this.post);
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.create-form-wrapper {
  display: flex;
  justify-content: center;

  .create-form {
    border-radius: 20px;
    box-shadow: 0px 0px 19px 3px rgba(34, 60, 80, 0.2);
    padding: 30px 20px;
    width: 100%;
    @media (min-width: 991px) {
      width: 50%;
    }
  }
}
</style>