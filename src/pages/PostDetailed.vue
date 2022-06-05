<template>
  <section v-if="post">
    <div class="row post-header mb-4">
      <div class="col-lg-6 col-xl-4 post-header__img-wrapper ">
        <img :src="post.img" alt="post-img" class="post-header__img">
      </div>
      <div class="col-lg-6 col-xl-8 py-4 px-4 d-flex flex-column post-header__content justify-content-between gap-3">
        <div class="post-header__title-wrapper">
          <h2>{{ post.title }}</h2>
        </div>
        <div class="post-header__author-data">
          <h5 class="post-header__author">{{ post.author }}</h5>
          <p class="post-header__email">{{ post.email }}</p>
        </div>
        <div class="post-header__date">{{ post.date }}</div>
      </div>
    </div>
    <div class="post-content">
      <p class="post-content__text mb-5">{{ post.text }}</p>
      <h3 class="text-bold mb-4">Коментарии</h3>
      <div class="row gy-4">
        <div class="col-lg-6 col-xl-4 col-3xl-3 " v-for="comment in post.comments" :key="comment.id">
          <div class="comment">
            <div class="comment__top">
              <img :src="comment.avatar" alt="avatar" class="comment__avatar">
              <h5 class="comment__user-name">{{ comment.userName }}</h5>
            </div>
            <div class="comment__bottom">
              <p class="comment__text">{{ comment.text }}</p>
              <div class="comment__date">{{ comment.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "PostDetailed",
  computed: {
    post() {
      return this.$store.getters.getPostById(this.$route.params.id)
    }
  },
  created() {
    if (!this.post) {
      this.loadPost(this.$route.params.id);
    } else if (!this.post.comments) {
      this.loadPostContent(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions({
      loadPost: 'loadPostById',
      loadPostContent: 'loadPostContent'
    })
  }
}
</script>

<style scoped lang="scss">
.post-header {
  &__content {
    background-color: #f8f9fa;
  }

  &__img-wrapper {
    @media (max-width: 991px) {
      padding: 0;
    }
    @media (min-width: 991px) {
      padding-right: 0;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__title-wrapper {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
  }

  &__author-data {
    display: flex;
    flex-wrap: wrap;
    row-gap: 5px;
    column-gap: 20px;
  }

  &__author, &__email {
    margin-bottom: 0;
  }

  &__author {
    font-weight: 700;
    color: gray;
  }

  &__date {
    color: gray;
  }
}

.post-content {
  &__text {
    font-size: 20px;
    line-height: 30px;
  }
}

.comment {
  height: 100%;
  padding: 0 15px 20px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: calc(100% - 64px);
    border-radius: 10px;
    background-color: #f8f9fa;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  &__top {
    margin-bottom: 20px;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 auto;
  }

  &__avatar {
    width: 128px;
    height: 128px;
    display: block;
    margin: 0 auto 20px;
    border-radius: 50%;
  }

  &__user-name {
    text-align: center;
    font-weight: 700;
    margin-bottom: 0;
  }

  &__date {
    color: gray;
  }
}


</style>

