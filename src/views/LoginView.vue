<template>
  <main class="row rounded align-items-center justify-content-center bg-light p-5">
    <div class="col-xl-6 col-md-8 ">
      <img class="w-100" src="https://i.imgur.com/x4XY4zr.png" alt="">
    </div>
    <div class="col-xl-6 col-md-8 d-flex align-items-center justify-content-center">
      <div class="w-100">
        <div class="mb-3 d-flex flex-column align-items-center">
          <p v-if="isRegister" class="logo">註冊</p>
          <p v-else class="logo">到 TrendBook 展開全新社交圈</p>
        </div>
        <div class="mb-3">
          <div class="mb-3" v-if="isRegister">
            <label class="form-label font-customize-style" for="name">名稱</label>
            <input type="text" class="form-control mt-1" id="name" placeholder="輸入名稱" aria-label="輸入名稱" aria-describedby="button-addon2"
              v-model="user.name" @input="formatVerify(true)" :class="state.name ? 'is-invalid' : '' ">
            <div class="invalid-feedback mt-2">
              {{ errorMessage.name }}
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-customize-style" for="Email">Email</label>
            <input type="text" class="form-control" id="Email" placeholder="輸入 Email" aria-label="輸入 Email" aria-describedby="button-addon2"
              v-model="user.email" @input="formatVerify()" @keyup.enter="login" :class="state.email ? 'is-invalid' : '' ">
            <div class="invalid-feedback mt-2">
              {{ errorMessage.email }}
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-customize-style" for="password">密碼</label>
            <input type="password" class="form-control" id="password" placeholder="輸入密碼" aria-label="輸入密碼" aria-describedby="button-addon2"
              v-model="user.password" @input="formatVerify()"  @keyup.enter="login" :class="state.password ? 'is-invalid' : '' ">
            <div class="invalid-feedback mt-2">
              {{ errorMessage.password }}
            </div>
          </div>
          <div class="mb-3" v-if="isRegister">
            <label class="form-label font-customize-style" for="password">再次輸入密碼</label>
            <input type="password" class="form-control" id="password" placeholder="再次輸入密碼" aria-label="再次輸入密碼" aria-describedby="button-addon2"
              v-model="user.confirmPassword" @input="formatVerify(true)"  @keyup.enter="login" :class="state.confirmPassword ? 'is-invalid' : '' ">
            <div class="invalid-feedback mt-2">
              {{ errorMessage.confirmPassword }}
            </div>
          </div>
        </div>
        <div v-if="errorMessage.loginError" class="wrong-msg">
          <span>{{ errorMessage.loginError }}</span>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex" v-if="!isRegister">
            <input placeholder="記住我" class="me-2 mt-1" id="male" type="checkbox" value="true" v-model="savePassWord">
            <label class="me-3" for="male">記住我</label>
          </div>
          <div class="d-flex mt-3" v-if="!isRegister">
            <div class="d-flex">
              <input placeholder="遊客帳號" class="me-2 mt-1" name="touristsAccount" id="account" type="radio" value="0"
                @change="selectTouristsAccount()" v-model="touristsAccount">
              <label class="me-3" for="account">遊客帳號</label>
              <input placeholder="遊客帳號" class="me-2 mt-1" name="touristsAccount" id="account2" type="radio" value="1"
                @change="selectTouristsAccount()" v-model="touristsAccount">
              <label class="me-3" for="account2">遊客帳號2</label>
              <input placeholder="遊客帳號" class="me-2 mt-1" name="touristsAccount" id="account3" type="radio" value="2"
                @change="selectTouristsAccount()" v-model="touristsAccount">
              <label class="me-3" for="account3">遊客帳號3</label>
              <input placeholder="遊客帳號" class="me-2 mt-1" name="touristsAccount" id="account4" type="radio" value="3"
                @change="selectTouristsAccount()" v-model="touristsAccount">
              <label class="me-3" for="account4">遊客帳號4</label>
            </div>
          </div>
          <template v-if="isRegister">
            <button @click="singUp" type="button" class="btn btn-primary btn-customize mt-4">
              註冊
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status"></div>
            </button>
            <button @click="checkButton" type="button" class="btn btn-primary btn-customize-disable mt-4">
              登入
            </button>
          </template>
          <template v-else>
            <button v-if="!isRegister" @click="login" class="btn btn-primary btn-customize mt-4">
              登入
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status"></div>
            </button>
            <button @click="checkButton" type="button" class="btn btn-primary btn-customize mt-4">
              註冊帳號
            </button>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      errorMessage: {
        name: null,
        email: null,
        passWord: null,
        signUpError: null,
        confirmPassword: null,
        loginError: null
      },
      state: {
        name: false,
        email: false,
        passWord: false,
        signUpError: false,
        confirmPassword: false
      },
      loading: false,
      isRegister: false,
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      savePassWord: true,
      touristsAccount: null,
      touristsAccounts: [
        {
          email: 'abcd1234@gmail.com',
          password: 'abcd1234'
        },
        {
          email: 'abcd12345@gmail.com',
          password: 'abcd12345'
        },
        {
          email: 'abcd123456@gmail.com',
          password: 'abcd123456'
        },
        {
          email: 'aabcd1234567@gmail.com',
          password: 'aabcd1234567'
        }
      ]
    }
  },
  methods: {
    formatVerify (singUp) {
      const error = []
      /* eslint-disable no-useless-escape */
      /* eslint-disable no-unneeded-ternary */
      const regExpEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ // 驗證 xxx@xxx.xxx 格式
      const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // 驗證至少 8 碼以上，並數字英文混合
      for (const i in this.state) {
        this.state[i] = false
      }
      if (this.user.name.length < 2 && singUp) {
        this.state.name = true
        this.errorMessage.name = '暱稱至少 2 個字元以上'
        error.push(this.errorMessage.name)
      }
      if (!regExpEmail.test(this.user.email)) {
        this.errorMessage.email = 'Email 格式錯誤'
        this.state.email = true
        error.push(this.errorMessage.email)
      }
      if (!this.user.email) {
        this.errorMessage.email = 'Email 未輸入'
        this.state.email = true
        error.push(this.errorMessage.email)
      }
      if (!regExpPassword.test(this.user.password)) {
        this.errorMessage.password = '密碼需至少 8 碼以上，並數字英文混合'
        this.state.password = true
        error.push(this.errorMessage.passwor)
      }
      if ((this.user.confirmPassword !== this.user.password || !this.user.confirmPassword) && singUp) {
        this.errorMessage.confirmPassword = '與密碼不同'
        this.state.confirmPassword = true
        error.push(this.errorMessage.confirmPassword)
      }
      return error.length === 0
    },
    login () {
      if (!this.formatVerify()) return
      this.loading = true
      this.axios.post(`${process.env.VUE_APP_API}users/sign_in`, this.user)
        .then((response) => {
          localStorage.setItem('test-token', response.data.user.token)
          this.$router.push('/posts')
          this.loading = false
          if (this.savePassWord) {
            localStorage.setItem('tempPassWord', JSON.stringify(this.user))
          } else {
            localStorage.setItem('tempPassWord', '')
          }
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage.loginError = error.response.data.message
        })
    },
    singUp () {
      if (!this.formatVerify(true)) return
      this.loading = true
      this.axios.post(`${process.env.VUE_APP_API}user/sign_up`, this.user)
        .then((response) => {
          localStorage.setItem('test-token', response.data.user.token)
          this.$router.push('/posts')
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage.loginError = error.response.data.message
        })
    },
    checkButton () {
      this.isRegister = !this.isRegister
      this.user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      this.errorMessage.loginError = ''
      for (const i in this.state) {
        this.state[i] = false
      }
    },
    selectTouristsAccount () {
      this.user.email = this.touristsAccounts[this.touristsAccount].email
      this.user.password = this.touristsAccounts[this.touristsAccount].password
    }
  },
  mounted () {
    if (localStorage.getItem('tempPassWord')) {
      this.user = JSON.parse(localStorage.getItem('tempPassWord'))
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Noto+Sans+TC:wght@400;500;700&family=Paytone+One&display=swap');
.font-customize-style {
  font: normal normal normal 16px/24px Noto Sans TC;
}
.logo {
  text-decoration:none;
  font-family: 'Paytone One', sans-serif;
  font: normal normal normal 26px/36px Paytone One;
}
/* 錯誤訊息 */
.wrong-msg {
  font: 14px 'Noto Sans TC';
  color: #F57375;
  text-align: center;
}

/* 登入與註冊按鈕 */
.btn-customize-disable {
  background: #f8f9fa;
  color: black;
}
</style>
