<template>
  <div>
    <ul class="card col-items flex-column p-4 bg-light">
      <li>
        <button class="btn btn-primary btn-customize mb-4" @click="showModal()">
          {{ modalTitle }}
        </button>
      </li>
      <li class="mb-4">
        <router-link v-if="$store.state.userInfo" :to="`/user/${$store.state.userInfo._id}`" class="card-user-icon d-flex align-items-center">
          <img v-if="$store.state.userInfo.image" :src="$store.state.userInfo.image" alt="">
          <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
          <span class="ms-3">{{ $store.state.userInfo.name }}</span>
        </router-link>
      </li>
      <li class="mb-4">
        <router-link to="/following" class="card-user-icon d-flex align-items-center">
          <div class="card-user-icon-border d-flex align-items-center justify-content-center">
            <i class="bi bi-bell-fill icons-item" style="font-size: 1.5rem;"></i>
          </div>
          <span class="ms-3">追蹤名單</span>
        </router-link>
      </li>
      <li class="mb-4">
        <router-link to="/likes" class="card-user-icon d-flex align-items-center">
          <div class="card-user-icon-border d-flex align-items-center justify-content-center">
            <i class="bi bi-heart-fill icons-item mt-1"></i>
          </div>
          <span class="ms-3">我收藏的文章</span>
        </router-link>
      </li>
    </ul>
    <ul class="col-items-RWD">
      <router-link v-if="$store.state.userInfo" :to="`/user/${$store.state.userInfo._id}`" class="card-user-icon d-flex align-items-center">
        <div class="card-user-icon-border d-flex align-items-center justify-content-center">
          <i class="bi bi-house-door-fill icons-item"></i>
        </div>
      </router-link>
      <router-link to="/following" class="card-user-icon d-flex align-items-center">
        <div class="card-user-icon-border d-flex align-items-center justify-content-center">
          <i class="bi bi-bell-fill icons-item"></i>
        </div>
      </router-link>
      <router-link to="/likes" class="card-user-icon d-flex align-items-center">
        <div class="card-user-icon-border d-flex align-items-center justify-content-center">
          <i class="bi bi-heart-fill icons-item mt-1"></i>
        </div>
      </router-link>
      <div class="card-user-icon d-flex align-items-center">
        <div class="card-user-icon-border d-flex align-items-center justify-content-center" @click="showModal()">
          <i class="bi bi-chat-dots-fill icons-item"></i>
        </div>
      </div>
    </ul>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true" ref="myModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-light">
            <h5 class="modal-title" id="exampleModalLabel"
              @click="hideModal()">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="needs-validation" novalidate>
              <div class="row" v-if="modalTitle === '發表貼文'">
                <div class="col-xl-3 mb-3">
                  <select class="form-select" aria-label="Default select example"
                    v-model="postData.type">
                    <option value="閒聊">閒聊</option>
                    <option value="問題">問題</option>
                    <option value="心得">心得</option>
                    <option value="新聞">新聞</option>
                  </select>
                </div>
                <div class="col-xl-9 mb-3">
                  <div class="input-group">
                    <input type="text" class="form-control pt-2 pb-2" placeholder="輸入標題" aria-label="輸入標題" aria-describedby="button-addon2"
                      v-model="postData.title" :class="state.title ? 'is-invalid' : '' ">
                    <div class="invalid-feedback">
                      {{ errorMessage.title }}
                    </div>
                  </div>
                </div>
              </div>
              <label for="exampleFormControlTextarea1" class="form-label">內容</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="6"
                v-model="postData.content" :class="state.content ? 'is-invalid' : '' ">
              </textarea>
              <div class="invalid-feedback">
                {{ errorMessage.content }}
              </div>
              <img v-if="postData.image" class="card-content-img mt-3" :src="postData.image" alt="">
              <label class="card-post-input font-customize-sm-style mt-3">
                上傳圖片
                <input ref="fileInput" type="file" @input="fileReader">
                <div v-if="propsLoading" class="spinner-border spinner-border-sm" role="status" ></div>
              </label>
              <button :disabled="propsLoading" class="card-post-button btn-primary mt-4 mx-auto"
                v-if="modalTitle === '發表貼文'" @click="postPost()">
                送出
              </button>
              <button :disabled="propsLoading" class="card-post-button btn-primary mt-4 mx-auto"
                v-else @click="postComment()">
                送出
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    modalTitle: String
  },
  emits: ['get-post-data'],
  data () {
    return {
      propsLoading: false,
      postData: {
        title: '',
        type: '閒聊',
        content: '',
        image: null
      },
      state: {
        title: '',
        content: ''
      },
      errorMessage: {
        title: null,
        content: null
      },
      myModal: null
    }
  },
  methods: {
    formatVerify (isPost) {
      const error = []
      for (const i in this.state) {
        this.state[i] = false
      }
      if (!this.postData.title && isPost) {
        this.state.title = true
        this.errorMessage.title = '標題必填'
        error.push('標題必填')
      }
      if (this.postData.title.length > 30 && isPost) {
        this.state.title = true
        this.errorMessage.title = '標題字數不可大於 30 字'
        error.push('標題字數不可大於 30 字')
      }
      if (!this.postData.content) {
        this.state.content = true
        this.errorMessage.content = '內文必填'
        error.push('內文必填')
      }
      return error.length === 0
    },
    getPostData () {
      this.$emit('get-post-data')
    },
    postPost () {
      if (!this.formatVerify(true)) return
      this.propsLoading = true
      const data = this.postData
      this.axios.post(`${process.env.VUE_APP_API}posts`, data)
        .then(() => {
          this.propsLoading = false
          this.postData.type = '閒聊'
          this.postData.title = null
          this.postData.content = null
          this.postData.image = null
          this.hideModal()
          this.getPostData()
          this.$store.state.switch = false
        })
        .catch((error) => {
          console.log(error.response, 'post')
          this.propsLoading = false
          alert('傳送失敗')
        })
    },
    fileReader () {
      this.propsLoading = true
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！')
        this.propsLoading = false
        return
      }
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      this.axios.post(`${process.env.VUE_APP_API}upload`, formData)
        .then((response) => {
          this.postData.image = response.data.imgUrl
          this.propsLoading = false
        })
        .catch((error) => {
          console.log(error, 'filter')
        })
    },
    postComment () {
      if (!this.formatVerify()) return
      this.propsLoading = true
      const data = {
        comment: this.postData.content,
        image: this.postData.image
      }
      this.axios.post(`${process.env.VUE_APP_API}posts/${this.$route.params.id}/comment`, data)
        .then(() => {
          this.getPostData()
          this.hideModal()
          this.postData.content = null
          this.postData.image = null
          this.propsLoading = false
        })
        .catch((error) => {
          this.propsLoading = false
          console.log(error.response)
          alert('傳送失敗')
        })
    },
    showModal () {
      this.myModal.show()
      this.postData = {
        title: '',
        type: '閒聊',
        content: '',
        image: null
      }
      this.state = {
        title: '',
        content: ''
      }
      this.errorMessage = {
        title: null,
        content: null
      }
    },
    hideModal () {
      this.myModal.hide()
    }
  },
  mounted () {
    this.myModal = new Modal(this.$refs.myModal)
  }
}
</script>

<style lang="scss" scoped>
.icons-item {
  font-size: 1.5rem;
  color: #7952b3;
}
.btn-customize {
  padding: 20px 115px;
}
.card {
  max-width: 353px;
  border-radius: 8px;
}
.card-user-icon {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 45px;
    width: 45px;
  }
  text-decoration:none;
  color: black;
  font: normal normal bold 16px/24px Noto Sans TC;
}
.card-user-icon:hover {
  cursor: pointer;
  opacity: .5;
}
.card-user-icon-border {
  width: 45px;
  height: 45px;
  border-radius: 99em;
  border: 2px solid #7952b3;
  background: #E2EDFA 0% 0% no-repeat padding-box;
}
.col-items-RWD {
  display: none;
}
.col-items {
  display: flex;
}
@media (max-width:1200px){
  .col-items {
    display: none;
  }
  .col-items-RWD {
    display: flex;
    justify-content: space-around;
    padding: 0;
    position:fixed;
    top: 90%;
    left: 50%;
    width: 360px;
    margin-left:-180px;
    // margin-top:-180px;
    height: 65px;
    background: #EFECE7 0% 0% no-repeat padding-box;
    border: 3px solid #000400;
    border-radius: 32px;
    opacity: 1;
  }
  .card-user-icon-border {
    background: #FFFFFF 0% 0% no-repeat padding-box;
  }
  .blue {
    color: white;
    background: #03438D 0% 0% no-repeat padding-box;
  }
}
// modal
.form-select {
  height: 42px;
}
.font-customize-style {
  font: normal normal bold 20px/24px Azeret Mono;
}
.font-customize-sm-style {
  font: normal normal normal 16px/24px Noto Sans TC;
}
// .btn-customize {
//   display:block;
//   padding: 16px 130px;
// }
// 張貼文章
p {
  margin: 0;
}
.card-post-input {
  width: 128px;
  padding: 3px 6px;
  border-radius: 4px;
  text-align: center;
  letter-spacing: 0px;
  color: #FFFFFF;
  background: #000400 0% 0% no-repeat padding-box;
  border: 0;
  input {
    display: none;
  }
}
.card-post-button {
  display:block;
  padding: 16px 130px;
}
.card-content-img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}
</style>
