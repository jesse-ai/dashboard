<template>
  <div
    id="nav"
    class="container pt-5 mx-auto text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>

  <router-view/>
</template>

<style>

#nav a {
  @apply text-gray-600 font-semibold;
}

#nav a.router-link-exact-active {
  @apply text-primary;
}
</style>
