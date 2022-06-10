<template>
  <div>
    <div class="lodingBlock">
      <div class="spinner-border mx-auto text-light"
        style="font-size: 0.5rem;" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-for="post in postData" :key="post._id">
      <div class="card bg-light p-4 mb-3">
        <div class="card-user d-flex">
          <div class="card-user-icon font-customize-style">
            <router-link :to="`/user/${post.user._id}`" href="#">
              <img v-if="post.user.image" :src="post.user.image" alt="">
              <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </router-link>
          </div>
          <div class="ms-3">
            <router-link :to="`/user/${post.user._id}`" href="#">
              <p class="font-customize-style">{{ post.user.name }}</p>
            </router-link>
            <p class="card-user-date">{{ formatDate(post.createdAt) }}</p>
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
        <div class="mt-4">
          <div class="font-customize-style">{{ post.content }}</div>
          <div class="mt-3">
            <img v-if="post.image" class="card-content-img" :src="post.image" alt="">
          </div>
        </div>
        <!-- 讚數 -->
        <div class="d-flex mt-3">
          <div class="card-good-icon">
            <i class="bi bi-heart icons-item" @click="setLike(post, 'like')"
              v-if="post.likes.findIndex((i) => i._id === $store.state.userInfo._id) === -1 || post.likes.length === 0"></i>
            <i v-else class="bi bi-heart-fill icons-item"
              @click="clearLike(post, 'like')"></i>
          </div>
          <template v-for="(lilke, index) in post.likes" :key="lilke.id">
            <p v-if="index < 2 " class="card-good-text ms-2 mt-2">{{ `${lilke.name},` }}</p>
          </template>
          <p v-if="post.likes.length > 2 " class="card-good-text ms-2 mt-2">{{ `...${post.likes.length}人` }}</p>
          <div class="spinner-border spinner-border-sm mt-2 ms-auto" role="status" v-if="propsLoading"></div>
        </div>
      </div>
      <div class="card p-4 mb-3" v-for="comment in post.comments" :key="comment._id">
        <div class="card-user d-flex">
          <div class="card-user-icon font-customize-style">
            <router-link :to="`/user/${comment.user._id}`" href="#">
              <img v-if="comment.user.image" :src="comment.user.image" alt="">
              <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </router-link>
          </div>
          <div class="ms-3">
            <router-link :to="`/user/${comment.user._id}`" href="#">
              <p class="font-customize-style">{{ comment.user.name }}</p>
            </router-link>
            <p class="card-user-date">{{ formatDate(comment.createdAt) }}</p>
          </div>
          <i class="bi bi-three-dots icons-item ms-auto"
            role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false"
            v-if="$store.state.userInfo._id === comment.user._id ||
              $store.state.userInfo.auth === '1'">
          </i>
          <ul class="dropdown-menu dropstart" aria-labelledby="dropdownMenuLink">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="deleteComment(comment)">刪除留言</a>
            </li>
          </ul>
        </div>
        <div class="card-content mt-4">
          <div class="font-customize-style">{{ comment.comment }}</div>
          <div class="mt-3">
            <img v-if="comment.image" class="card-content-img" :src="comment.image" alt="">
          </div>
        </div>
        <!-- 讚數 -->
        <div class="d-flex mt-3">
          <div class="card-good-icon">
            <i class="bi bi-heart icons-item" @click="setLike(comment, 'commentLikes')"
              v-if="comment.likes.findIndex((i) => i._id === $store.state.userInfo._id) === -1 || comment.likes.length === 0"></i>
            <i v-else class="bi bi-heart-fill icons-item"
              @click="clearLike(comment, 'commentLikes')"></i>
          </div>
          <template v-for="(lilke, index) in comment.likes" :key="lilke.id">
            <p v-if="index < 2 " class="card-good-text ms-2 mt-2">{{ lilke.name }},</p>
          </template>
          <p v-if="comment.likes.length > 2 " class="card-good-text ms-2 mt-2">{{ `...${comment.likes.length}人`}}</p>
          <div class="spinner-border spinner-border-sm mt-2 ms-auto" role="status" v-if="propsLoading"></div>
        </div>
      </div>
    </template>
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
  emits: ['get-single-post'],
  data () {
    return {
      propsLoading: false,
      postBlock: false,
      fromData: {
        comment: null
      },
      isEdit: false
    }
  },
  methods: {
    getAllpost (sort, search) {
      this.$emit('get-single-post', sort, search)
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
    setLike (data, router) {
      this.propsLoading = true
      this.axios.post(`${process.env.VUE_APP_API}post/${data._id}/${router}`)
        .then(() => {
          this.getAllpost()
          this.propsLoading = false
        })
        .catch(() => {
          this.propsLoading = false
          alert('按讚失敗')
        })
    },
    clearLike (data, router) {
      this.propsLoading = true
      router = router === 'like' ? 'unlike' : 'commentUnlike'
      this.axios.delete(`${process.env.VUE_APP_API}post/${data._id}/${router}`)
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
p {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000000;
}
.button:hover {
  color: black;
  background: #EEC32A 0% 0% no-repeat padding-box;
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
.card-content-img {
  max-width: 100%;
  height: auto;
  // border: 2px solid #000400;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.icons-item {
  font-size: 1.5rem;
  color: #7952b3;
}
.icons-item:hover {
  opacity: .5;
  cursor: pointer;
}
.card-good-text{
  text-align: left;
  font: normal normal normal 16px/27px Baloo Da 2;
  letter-spacing: 0px;
  color: #000400;
  opacity: 1;
}
.lodingBlock {
  display: flex;
}
</style>
