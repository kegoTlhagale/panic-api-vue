<template>
  <div class="vue-bg justify-content-center">

      <div class="rounded shadow bg-white text-left p-5 container col-8">
      <h2 class="text-center space">Sign up</h2>

      <form id="signin-form" @submit.prevent="submit">
        <div class="row">
          <div class="col-12 mb-4 form-group">
            <input type="checkbox" id="checkbox" v-model="userData.checked">
            <label for="checkbox">Emergency Responder</label>
          </div>

          <div class="col-12 mb-4 form-group">
            <label class="col-form-label col-form-label-lg"
              >Name <span class="text-danger">*</span></label
            >
            <input
              v-model="userData.name"
              type="text"
              class="form-control form-control-lg"
            />
          </div>

          <div class="col-12 mb-4 form-group">
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

          <div
            v-if="!userData.checked"
            class="col-12 mb-4 form-group"
          >
            <label class="col-form-label col-form-label-lg"
              >Address<span class="text-danger">*</span></label
            >
            <input v-model="userData.address" type="text" class="form-control form-control-lg" />
          </div>

          <div class="col-12 mb-4 form-group">
            <label class="col-form-label col-form-label-lg"
              >Phone number<span class="text-danger">*</span></label
            >
            <input v-model="userData.phoneNumber" type="text" class="form-control form-control-lg" />
          </div>

          <div
            class="col-12 mb-4 form-group text-center"
          >
            <button class="btn btn-vue btn-lg col-2">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'Register',

  setup () {
    //  data binding
    const userData = reactive({
      name: '',
      email: '',
      password: '',
      checked: false,
      address: '',
      phoneNumber: ''
    })

    const router = useRouter()
    const store = useStore()

    const submit = async () => {
      console.log('data', userData)
      const registerUserUrl = 'http://localhost:8080/api/user/register'
      const registerResponderUrl = 'http://localhost:8080/api/responder/register'

      const checked = userData.checked
      const { name, email, password, phoneNumber, address } = userData

      if (checked) {
        // first responder register
        const newResponder = { name, email, password, phone_number: phoneNumber }
        axios.post(registerResponderUrl, { ...newResponder }, { headers: { 'Content-Type': 'application/json' } })
          .then(async (response) => {
            const { status, data } = response
            const { success } = data

            if (status === 200 && success) {
              await router.push('/')
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
        // user register
        const newUser = { name, email, password, phone_number: phoneNumber, address }
        axios.post(registerUserUrl, { ...newUser }, { headers: { 'Content-Type': 'application/json' } })
          .then(async (response) => {
            const { status, data } = response
            const { success } = data

            if (status === 200 && success) {
              await router.push('/')
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
  display: flex;
  padding: 20px;
}
</style>
function target(target: any, arg1: { name: string; email: string; password:
string }) { throw new Error('Function not implemented.') }
