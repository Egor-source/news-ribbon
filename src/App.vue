<template>
  <Header/>
  <main>
    <div class="container">
      <router-view v-slot="{Component,route}">
        <keep-alive :include="getKeepAliveComponents()">
          <component :is="Component" :key="route.name"/>
        </keep-alive>
      </router-view>
    </div>
  </main>
  <Footer/>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {Header, Footer},
  methods: {
    getKeepAliveComponents() {
      return this.$router.getRoutes().reduce((names, {meta}) => {
        if (meta.componentName) {
          names.push(meta.componentName)
        }
        return names
      }, [])
    }
  }
}
</script>


