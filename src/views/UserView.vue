<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-md-12">
      <TagView
        :tagText="'修改個人資料'"
      >
      </TagView>
      <div class="row-button px-3 mt-4">
        <button :class="tabsState === 'name' ? 'active' : '' " class="px-4 pt-2 pb-2"
          @click="changeTabs('name')" >
          暱稱修改
        </button>
        <button :class="tabsState === 'password' ? 'active' : ''" class="px-4 pt-2 pb-2 ms-2"
          @click="changeTabs('password')">
          重設密碼
        </button>
      </div>
      <div class="card bg-light p-4">
        <div class="ms-5 me-5">
          <template v-if="tabsState === 'name'">
            <div class="input-icon mt-3 mx-auto">
              <div class="user-img mx-auto">
                <img v-if="fromData.image" :src="userUrl ? userUrl : fromData.image" alt="">
                <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
              </div>
              <label class="user-icon-label mt-3">
                上傳大頭貼
                <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status"></div>
                <input v-if="!isLoad" ref="fileInput" type="file" @input="fileReader">
              </label>
            </div>
            <div class="mt-2">
              <label class="form-label font-customize-style" for="name">暱稱</label>
              <input type="text" class="form-control mt-1" id="name" placeholder="輸入暱稱" aria-label="輸入暱稱" aria-describedby="button-addon2"
                v-model="fromData.name" @input="formatVerify()" :class="state.name ? 'is-invalid' : '' ">
              <div class="invalid-feedback mt-2">
                {{ errorMessage.name }}
              </div>
            </div>
            <div class="mt-3">
              <label class="form-label user-radio font-customize-style mb-1">性別</label>
              <input class="me-2" id="male" type="radio" name="sex" value="male" v-model="fromData.sex">
              <label class="form-label font-customize-style me-3" for="male">男性</label>
              <input class="me-2" id="female" type="radio" name="sex" value="female" v-model="fromData.sex">
              <label class="form-label font-customize-style me-3" for="female">女性</label>
              <input class="me-2" id="other" type="radio" name="sex" value="other" v-model="fromData.sex">
              <label class="form-label font-customize-style me-3" for="other">其他</label>
            </div>
            <div class="mt-3">
              <label class="form-label user-radio mb-1">權限</label>
              <input class="me-2" id="GM" type="radio" name="auth" value="1" v-model="fromData.auth">
              <label class="form-label font-customize-style me-3" for="GM">最高權限</label>
              <input class="me-2" id="user" type="radio" name="auth" value="" v-model="fromData.auth">
              <label class="form-label font-customize-style me-3" for="user">訪客權限</label>
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <button  :disabled="isLoad" class="btn btn-primary btn-customize mt-4" @click="patchUserData()">
                更改資料
                <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status"></div>
              </button>
            </div>
          </template>
          <template v-else>
            <div class="mt-2">
              <label class="form-label font-customize-style" for="password">輸入新密碼</label>
              <input type="password" class="form-control mt-1" id="password" placeholder="輸入密碼" aria-label="輸入密碼" aria-describedby="button-addon2"
                v-model="fromData.password" @input="formatVerify(true)" :class="state.password ? 'is-invalid' : '' ">
              <div class="invalid-feedback mt-2">
                {{ errorMessage.password }}
              </div>
            </div>
            <div class="mt-2">
              <label class="form-label font-customize-style" for="confirmPassword">再次輸入新密碼</label>
              <input type="password" class="form-control mt-1" id="confirmPassword" placeholder="再次輸入新密碼" aria-label="再次輸入新密碼" aria-describedby="button-addon2"
                v-model="fromData.confirmPassword" @input="formatVerify(true)" @keyup.enter="changePassword()" :class="state.confirmPassword ? 'is-invalid' : '' ">
              <div class="invalid-feedback mt-2">
                {{ errorMessage.confirmPassword }}
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <button  :disabled="isLoad" class="btn btn-primary btn-customize mt-4" @click="changePassword()">
                更改暱稱
                <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status"></div>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TagView from '../components/TagView.vue'

export default {
  components: {
    TagView
  },
  data () {
    return {
      isLoad: false,
      tabsState: 'name', // name or passwoed
      userUrl: null,
      fromData: {
        name: this.$store.state.userInfo.name,
        sex: this.$store.state.userInfo.sex || 'male',
        image: this.$store.state.userInfo.image,
        password: '',
        confirmPassword: '',
        auth: this.$store.state.userInfo.auth || ''
      },
      errorMessage: {
        name: null,
        passWord: null,
        confirmPassword: null,
        changeError: null
      },
      state: {
        name: null,
        sex: null,
        image: null,
        password: null,
        confirmPassword: null
      }
    }
  },
  methods: {
    changePassword () {
      if (!this.formatVerify()) return
      this.isLoad = true
      const data = this.fromData
      this.axios.post(`${process.env.VUE_APP_API}users/updatePassword`, data)
        .then(() => {
          this.getUserData()
          this.fromData = {
            name: this.$store.state.userInfo.name,
            sex: this.$store.state.userInfo.sex,
            image: this.$store.state.userInfo.image,
            password: '',
            confirmPassword: '',
            auth: ''
          }
          this.isLoad = false
          alert('修改成功')
        })
        .catch((errr) => {
          this.isLoad = false
          alert('修改失敗')
        })
    },
    patchUserData () {
      if (!this.formatVerify()) return
      this.isLoad = true
      const data = this.fromData
      this.axios.patch(`${process.env.VUE_APP_API}users/updateProfile`, data)
        .then(() => {
          this.getUserData()
          this.fromData.password = ''
          this.fromData.confirmPassword = ''
          this.isLoad = false
        })
        .catch(() => {
          this.isLoad = false
          alert('修改失敗')
        })
    },
    getUserData () {
      this.axios.get(`${process.env.VUE_APP_API}users/profile`)
        .then((response) => {
          this.$store.commit('setUserInfo', response.data.data.user)
        })
        .catch(() => {
          alert('token過期，請先登入')
        })
    },
    changeTabs (str) {
      this.tabsState = str
    },
    fileReader () {
      this.isLoad = true
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！')
        this.isLoad = false
        return
      }
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      this.axios.post(`${process.env.VUE_APP_API}upload`, formData)
        .then((response) => {
          this.userUrl = response.data.imgUrl
          this.fromData.image = response.data.imgUrl
          this.patchUserData()
          this.isLoad = false
        })
        .catch(() => {
          alert('上傳失敗')
        })
    },
    formatVerify (singUp) {
      /* eslint-disable no-useless-escape */
      /* eslint-disable no-unneeded-ternary */
      const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      const error = []

      for (const i in this.state) {
        this.state[i] = false
      }
      if (this.fromData.name.length < 2) {
        this.state.name = true
        this.errorMessage.name = '暱稱至少 2 個字元以上'
        error.push('name')
      }
      if (!regExpPassword.test(this.fromData.password) && singUp) {
        this.errorMessage.password = '密碼需至少 8 碼以上，並中英混合'
        this.state.password = true
        error.push('signUpError')
      }
      if ((this.fromData.confirmPassword !== this.fromData.password || !this.fromData.confirmPassword) && singUp) {
        this.errorMessage.confirmPassword = '與密碼不同'
        this.state.confirmPassword = true
        error.push('confirmPassword')
      }
      return error.length === 0
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.font-customize-style {
  font: normal normal normal 16px/24px Noto Sans TC;
}
.card {
  border-radius: 8px;
  border: 2px solid #2c3e50;
}
.input-icon {
  width: 128px;
}
.user-img {
  img {
    height: 128px;
    width: 128px;
  }
  border-radius:50%;
  overflow: hidden;
}
.user-icon-label {
  width: 128px;
  padding: 3px 6px;
  border-radius: 4px;
  text-align: center;
  letter-spacing: 0px;
  color: #FFFFFF;
  background: #000400 0% 0% no-repeat padding-box;
  border: 0;
  font: normal normal normal 16px/24px Noto Sans TC;
  input {
    display: none;
  }
}
.user-radio {
  display: block;
}
.btn-customize {
  padding: 20px 115px;
}
.row-button {
  button {
    background: #FFFFFF;
    border: 0;
  }
  .active {
    background: #7952b3;
    color: #FFFFFF;
  }
}
</style>
