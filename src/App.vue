<template>
  <Nav />
  <main class="form-signin">
    <div>
      <router-view/>
    </div>
  </main>
</template>

<script>
import Nav from '@/components/Nav'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { Nav },
  setup () {
    const store = useStore()
    const auth = computed(() => store.state.loggedIn)

    return {
      auth
    }
  }
}
</script>

<style>
.form-signin {
  width: 100%;
  margin: auto;
}
</style>
