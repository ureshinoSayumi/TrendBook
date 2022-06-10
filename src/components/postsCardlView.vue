<template>
  <div>
    <div class="lodingBlock">
      <div class="spinner-border mx-auto text-light"
        style="font-size: 0.5rem;" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-for="post in postData">
      <div class="card bg-light p-4 mb-3" v-if="$store.state.userInfo" :key="post._id">
        <div class="card-user d-flex">
          <div class="card-user-icon font-customize-style">
            <router-link :to="`/user/${post.user._id}`" href="#">
              <img v-if="post.user.image" :src="post.user.image" alt="">
              <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </router-link>
          </div>
          <div class="d-flex ms-3 mt-2">
            <p>{{ post.user.name }}</p>
            <p class="card-user-date ms-3">{{ formatDate(post.createdAt) }}</p>
          </div>
          <i class="bi bi-three-dots icons-item ms-auto"
            role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false"
            v-if="$store.state.userInfo._id === post.user._id ||
              $store.state.userInfo.auth === '1'">
          </i>
          <ul class="dropdown-menu dropstart" aria-labelledby="dropdownMenuLink">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="deletePost(post)">刪除貼文</a>
            </li>
          </ul>
        </div>
        <router-link :to="`/post/${post._id}`" href="#">
          <div class="d-flex justify-content-between mt-3 hover">
            <div class="d-flex pe-2">
              <div>
                <div class="d-flex">
                  <h3 class="font-customize-style fs-5">[{{ post.type }}]</h3>
                  <p class="font-customize-style fs-5 ps-2">{{ post.title }}</p>
                </div>
                <div class="p-1 mt-3">
                  <p v-if="post.content.length > 50" class="fw-light">{{ post.content.substring(0, 50) }}...</p>
                  <p v-else class="fw-light">{{ post.content }}</p>
                </div>
              </div>
            </div>
            <img v-if="post.image" :src="post.image" alt="">
          </div>
          <div class="d-flex mt-3">
            <i class="bi bi-heart-fill icons-heart"></i>
            <p class="ms-2">{{ post.likes.length }}</p>
            <i class="bi bi-chat-dots-fill icons-heart ms-4"></i>
            <p class="ms-2">{{ post.comments.length }}</p>
          </div>
        </router-link>
      </div>
    </template>
    <div class="lodingBlock mt-3">
      <div class="spinner-border mx-auto text-light"
        style="font-size: 0.5rem;" role="status" v-if="loading && postData.length">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    postData: {
      type: Object,
      default () { return {} }
    },
    loading: {
      type: Boolean
    }
  },
  emits: ['get-all-post'],
  data () {
    return {
      propsLoading: false,
      fromData: {
        comment: null
      },
      isEdit: false
    }
  },
  methods: {
    getAllpost (sort, search) {
      this.$emit('get-all-post', sort, search)
    },
    postComment (post) {
      this.propsLoading = true
      const data = this.fromData
      this.axios.post(`${process.env.VUE_APP_API}posts/${post._id}/comment`, data)
        .then(() => {
          this.getAllpost()
          this.fromData.comment = null
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('傳送失敗')
        })
    },
    setLike (post) {
      const isLike = post.likes.find((item) => item.name === this.$store.state.userInfo.name)
      if (isLike) {
        this.clearLike(post)
        return
      }
      this.propsLoading = true
      this.axios.post(`${process.env.VUE_APP_API}post/${post._id}/like`)
        .then(() => {
          this.getAllpost()
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('按讚失敗')
        })
    },
    clearLike (post) {
      this.propsLoading = true
      this.axios.delete(`${process.env.VUE_APP_API}post/${post._id}/unlike`)
        .then(() => {
          this.getAllpost(this.filter, this.searchPost)
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('收回失敗')
        })
    },
    formatDate (str) {
      const date = new Date(str)
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      return formattedDate
    },
    deletePost (post) {
      this.propsLoading = true
      this.axios.delete(`${process.env.VUE_APP_API}posts/${post._id}`)
        .then(() => {
          this.getAllpost(this.filter, this.searchPost)
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('刪除失敗')
        })
    },
    deleteComment (comment) {
      this.propsLoading = true
      this.axios.delete(`${process.env.VUE_APP_API}posts/${comment._id}/comment`)
        .then(() => {
          this.getAllpost(this.filter, this.searchPost)
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('刪除失敗')
        })
    },
    updataComment (comment) {
      const data = { comment: comment.comment }
      this.isEdit = true
      this.axios.patch(`${process.env.VUE_APP_API}posts/${comment._id}/comment`, data)
        .then(() => {
          this.getAllpost()
          this.isEdit = false
        })
        .catch(() => {
          this.isEdit = false
          alert('傳送失敗')
        })
    },
    editComment (comment) {
      comment.isEdit = true
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.font-customize-style {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.hover:hover {
  opacity: .5;
  cursor: pointer;
}
img {
  overflow: hidden;
  height: 100%;
  width: 80px;
}
p {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000000;
}
.card {
  border-radius: 8px;
}
.card-user-icon {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
  }
}
.card-user-date {
  font-size: 13px;
  color: #9B9893;
}
.icons-item {
  font-size: 1.5rem;
  color: #7952b3;
}
.icons-item:hover {
  opacity: .5;
  cursor: pointer;
}
.icons-heart {
  font-size: 1.2rem;
  color: #7952b3;
}
.lodingBlock {
  display: flex;
}
</style>
