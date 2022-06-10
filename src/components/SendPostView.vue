<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true" ref="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-light">
          <h5 class="modal-title" id="exampleModalLabel"
            @click="myModal.hide()">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3" v-if="title === '發表貼文'">
            <div class="col-xl-3">
              <select class="form-select" aria-label="Default select example"
                v-model="postData.type">
                <option value="閒聊">閒聊</option>
                <option value="問題">問題</option>
                <option value="心得">心得</option>
                <option value="新聞">新聞</option>
              </select>
            </div>
            <div class="col-xl-9">
              <div class="input-group">
                <input type="text" class="form-control pt-2 pb-2" placeholder="輸入標題" aria-label="輸入標題" aria-describedby="button-addon2"
                  v-model="postData.title">
              </div>
            </div>
          </div>
          <label for="exampleFormControlTextarea1" class="form-label">內容</label>
          <textarea v-model="postData.content" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
          <label class="card-post-input font-customize-style2 mt-3">
            上傳圖片
            <input ref="fileInput" type="file" @input="fileReader">
            <div v-if="propsLoading" class="spinner-border spinner-border-sm" role="status" ></div>
          </label>
          <img v-if="postData.image" class="card-content-img mt-3" :src="postData.image" alt="">
          <button :disabled="propsLoading" class="card-post-button btn-primary mt-4 mx-auto"
            v-if="title === '發表貼文'" @click="postPost()">
            送出
          </button>
          <button :disabled="propsLoading" class="card-post-button btn-primary mt-4 mx-auto"
            v-else @click="postComment()">
            送出
          </button>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    title: String
  },
  emits: ['get-all-post'],
  data () {
    return {
      propsLoading: false,
      postData: {
        title: null,
        type: '閒聊',
        content: null,
        image: null
      },
      myModal: null
    }
  },
  methods: {
    getPost () {
      this.$emit('get-all-post')
    },
    postPost () {
      this.propsLoading = true
      const data = this.postData
      this.axios.post(`${process.env.VUE_APP_API}posts`, data)
        .then(() => {
          this.propsLoading = false
          this.postData.type = '閒聊'
          this.postData.title = null
          this.postData.content = null
          this.postData.image = null
          this.getPost()
          alert('傳送成功')
          this.$store.state.switch = false
        })
        .catch((error) => {
          console.log(error, 'post')
          this.propsLoading = false
          alert('傳送失敗')
        })
    },
    fileReader () {
      this.propsLoading = true
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！')
      }
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      this.axios.post(`${process.env.VUE_APP_API}upload`, formData)
        .then((response) => {
          console.log(response, 'filterasd')
          this.postData.image = response.data.imgUrl
          this.propsLoading = false
        })
        .catch((error) => {
          console.log(error, 'filter')
        })
    },
    postComment () {
      this.propsLoading = true
      const data = {
        comment: this.postData.content,
        image: this.postData.image
      }
      this.axios.post(`${process.env.VUE_APP_API}posts/${this.$route.params.id}/comment`, data)
        .then(() => {
          this.getPost()
          this.myModal.hide()
          this.postData.content = null
          this.postData.image = null
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('傳送失敗')
        })
    }
  },
  mounted () {
    console.log(this.$refs.myModal, 'this.$refs.myModal')
    // this.myModal = new Modal(this.$refs.myModal)
    // const myModalEl = document.getElementById('myModal')
    // myModalEl.addEventListener('hidden.bs.modal', function (event) {
    //   console.log('// do something...')
    // })
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.form-select {
  height: 42px;
}
.font-customize-style {
  font: normal normal bold 20px/24px Azeret Mono;
}
.font-customize-style2 {
  font: normal normal normal 16px/24px Noto Sans TC;
}
.btn-customize {
  display:block;
  padding: 16px 130px;
}
// 張貼文章
p {
  margin: 0;
}
.card {
  border-radius: 8px;
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
  max-width: 100%;
  height: auto;
  border: 2px solid #000400;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
</style>
