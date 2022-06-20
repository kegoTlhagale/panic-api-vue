<template>
  <div class="vue-bg justify-content-center">
      <div class="rounded shadow bg-white text-left p-5 container col-8">
      <h2 class="text-center space">Sign in</h2>
      <form id="signin-form" @submit.prevent="submit">
        <div class="row">
          <div class="col-12 mb-4 form-group">
            <input type="checkbox" id="checkbox" v-model="userData.checked">
            <label for="checkbox">Emergency Responder</label>
          </div>

          <div class="col-12 mb-2 form-group">
            <label class="col-form-label col-form-label-lg"
              >Email <span class="text-danger">*</span></label
            >
            <input
              v-model="userData.email"
              type="email"
              class="form-control form-control-lg"
            />
          </div>

          <div class="col-12 mb-4 form-group">
            <label class="col-form-label col-form-label-lg"
              >Password <span class="text-danger">*</span></label
            >
            <input v-model="userData.password" type="password" class="form-control form-control-lg" />
          </div>

          <div class="col-12 form-group text-center">
            <button class="btn btn-vue btn-lg col-2">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'Login',

  setup () {
    const userData = reactive({
      email: '',
      password: '',
      checked: false,
      loggedIn: false
    })

    const store = useStore()
    const router = useRouter()

    const submit = async () => {
      const loginUserUrl = 'http://localhost:8080/api/user/login'
      const loginResponderUrl = 'http://localhost:8080/api/responder/login'
      const { email, password, checked } = userData
      const authUser = { email: email.toLowerCase(), password: password }

      if (checked) {
        // responder login
        const authResponder = { email: email.toLowerCase(), password: password }
        await axios.post(loginResponderUrl, { ...authResponder }, { headers: { 'Content-Type': 'application/json' } })
          .then(async (response) => {
            console.log('response', response)
            const { status, data } = response
            const { success } = data

            if (status === 200 && success) {
              await store.dispatch('setAuth', true)
              await store.dispatch('setResponder', true)
              await router.push('/home')
            } else {
              alert('Something went wrong. Please try again')
            }
          })
          .catch((error) => {
            console.log('checked err', error)
            const { response } = error
            const { data } = response
            alert(`${data.message}` || 'Something went wrong. Please try again')
          })
      } else {
        // user login
        axios.post(loginUserUrl, { ...authUser }, { headers: { 'Content-Type': 'application/json' } })
          .then(async (response) => {
            console.log('response', response)
            const { status, data } = response
            const { success, user } = data

            if (status === 200 && success) {
              await store.dispatch('setAuth', true)
              await store.dispatch('setUser', user.UserID)
              await store.dispatch('setNumber', user.PhoneNumber)

              await router.push('/home')
            } else {
              alert('Something went wrong. Please try again')
            }
          })
          .catch((error) => {
            console.log('err', error)
            const { response } = error
            const { data } = response

            alert(`${data.message}` || 'Something went wrong. Please try again')
          })
      }
    }
    return {
      userData,
      submit
    }
  }
}
</script>

<style>
.btn-vue {
  background: #53b985;
  color: #31485d;
  font-weight: bold;
}

.vue-bg {
  padding: 30px;
  display: flex;
}
</style>
