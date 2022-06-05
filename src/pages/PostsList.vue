<template>
  <div class="row mb-3 gy-2">
    <div class="col-lg-6">
      <h6>Авторы</h6>
      <PostsFilter/>
    </div>
    <div class="col-lg-6">
      <h6>Сортировка</h6>
      <PostSorting/>
    </div>
  </div>
  <div class="row gy-4">
    <transition-group name="post">
      <div class="col-sm-6 col-lg-4 col-3xl-3" v-for="post in posts" :key="post.id">
        <router-link class="post-card" :style="`--img:url(${post.img})`" :to="`/detailed/${post.id}`">
          <h3 class="post-card__title mb-3">{{ post.title }}</h3>
          <div class="d-flex align-items-end gap-3">
            <p class="post-card__author">{{ post.author }}</p>
            <div class="post-card__date">{{ post.date }}</div>
          </div>
        </router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import PostsFilter from "@/components/PostsFilter";
import PostSorting from "@/components/PostSorting";

export default {
  name: "PostsList",
  components: { PostsFilter, PostSorting},
  computed: {
    ...mapState({
      posts: 'posts'
    })
  },
  created() {
    this.loadPosts();
  },
  methods: {
    ...mapActions({
      loadPosts: 'loadPosts'
    })
  }
}
</script>

<style scoped lang="scss">

.post-item {
  display: inline-block;
  margin-right: 10px;
}

.post-enter-active,
.post-leave-active {
  transition: all .5s ease;
}

.post-enter-from,
.post-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.post-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  border-radius: 20px;
  color: #fff;
  min-height: 100%;
  background-blend-mode: multiply;
  background-image: var(--img);
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, .6);
  transition: .3s;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }

  &__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__author {
    margin-bottom: 0;
    font-weight: 700;
    white-space: nowrap;
  }

  &__date {
    color: #cfcfcf;
  }
}
</style>
