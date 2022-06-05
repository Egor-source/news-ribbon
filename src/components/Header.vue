<template>
  <header class="p-3 bg-dark mb-4">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink class="h2 text-white" to="/">NewsRibbon</RouterLink>
        <RouterLink class="text-white" to="/create-post">+ Создать пост</RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>


