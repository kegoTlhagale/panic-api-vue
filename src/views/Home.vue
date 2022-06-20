 <template>
  <section class="vh-100" v-if="auth">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-4">
            <h3
            v-if="!responder"
            class="mb-4 pb-2 fw-normal text-center">Press button for help</h3>
            <div
            v-if="!responder"
            class="col-12 mb-4 form-group text-center">
              <button
              @click="panic()"
              class="btn btn-vue btn-lg">Panic</button>
            </div>
          <div v-if="responder" class="col-12 d-flex h-50 justify-content-center mt-4 p-2">
            <p v-if="!panics.length">
              There are currently no panics
            </p>
            <ul>
              <div class="rounded shadow bg-white text-left p-5 container col-8">
                <li v-for="(panic, index) in panics" :key="panic.Location">
                  <h1>Panic {{index+1}}</h1>
                  <p>Location: {{ panic.Location }}</p>
                  <p>Phone number: {{ panic.PhoneNumber }}</p>
                </li>
              </div>

            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',

  setup () {
    const store = useStore()
    const auth = computed(() => store.state.loggedIn)
    const user = computed(() => store.state.adminUser)
    const responder = computed(() => store.state.responder)
    const loginResponderUrl = 'http://localhost:8080/api/panics'

    const panics = ref([])

    const panic = async () => {
      const success = (position: any) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const payload = {
          longitude,
          latitude,
          user: store.state.user,
          phone: store.state.number
        }

        axios.post(loginResponderUrl, { ...payload }, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
            console.log('response', response)
            const { status, data } = response
            const { success } = data

            if (status === 200 && success) {
              alert('Panic created successfully')
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

      const error = (err: any) => {
        console.log(err)
        alert('Something went wrong. Please try again')
      }

      navigator.geolocation.getCurrentPosition(success, error)
    }

    const getPanics = async () => {
      axios.get(loginResponderUrl)
        .then((response) => {
          console.log('response getPanics', response)
          const { status, data } = response
          const { success } = data

          console.log('data', data)
          if (status === 200 && success) {
            // alert('Panic created successfully')
            panics.value = data.panics
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

    if (responder.value) {
      getPanics()
    }

    return {
      panic,
      responder,
      auth,
      user,
      panics
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
  background: white;
}
</style>

  function created() {
    throw new Error('Function not implemented.')
  }
