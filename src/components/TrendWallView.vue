<template>
  <div>
    <!-- 動態牆卡 -->
    <div class="lodingBlock mt-3">
      <div class="spinner-border mx-auto"
        style="font-size: 0.5rem;" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-if="!postBlock">
      <div class="card bg-light mt-3" v-for="post in postData" :key="post._id">
        <div class="card-user">
          <div class="card-user-icon">
            <router-link :to="`/user/${post.user._id}`" href="#">
              <img v-if="post.user.image" :src="post.user.image" alt="">
              <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </router-link>
          </div>
          <div class="card-user-text ms-3">
            <router-link :to="`/user/${post.user._id}`" href="#">
              <p class="card-user-name">{{ post.user.name }}</p>
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
        <div class="card-content mt-4">
          <div class="card-content-text">{{ post.content }}</div>
          <div class="mt-3">
            <img v-if="post.image" class="card-content-img" :src="post.image" alt="">
          </div>
        </div>
        <!-- 讚數 -->
        <div class="card-good-block mt-3">
          <div class="card-good-icon">
            <i class="bi bi-hand-thumbs-up icons-item"
              @click="setLike(post)"></i>
          </div>
          <template v-for="(lilke, index) in post.likes" :key="lilke.id">
            <p v-if="index < 2 " class="card-good-text ms-2 mt-2">{{ lilke.name }}</p>
          </template>
          <p v-if="post.likes.length > 2 " class="card-good-text ms-2 mt-2">...{{ post.likes.length }}人</p>
          <div class="spinner-border spinner-border-sm mt-2 ms-auto" role="status" v-if="propsLoading"></div>
        </div>
        <!-- 使用者留言欄位 -->
        <div class="card-user-input-black mt-3" v-if="true">
          <div class="card-user-input-img">
            <img v-if="$store.state.userInfo.image" :src="$store.state.userInfo.image" alt="">
            <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
          </div>
          <div class="card-user-input ms-2">
            <input v-model="fromData.comment" type="text" placeholder="留言..."
              @keyup.enter="postComment(post)">
            <button class="card-user-input-button"
              @click="postComment(post)">留言</button>
          </div>
        </div>
        <!-- 留言資訊 -->
        <div class="card-message mt-3" v-for="comment in post.comments" :key="comment._id">
          <div class="card-message-block">
            <router-link class="card-user-input-img" :to="`/user/${comment.user._id}`" href="#">
              <img v-if="comment.user.image" :src="comment.user.image" alt="">
              <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </router-link>
            <div class="card-user-text ms-2 mx-2 w-75">
              <router-link :to="`/user/${post.user._id}`" href="#">
                <p class="card-user-name">{{ comment.user.name }}</p>
              </router-link>
              <p class="card-user-date">{{ formatDate(comment.createdAt) }}</p>
              <p v-if="!comment.isEdit" class="card-user-name mt-1">{{ comment.comment }}</p>
              <input class="w-100" v-if="comment.isEdit" v-model="comment.comment" type="text" placeholder="留言..."
                @keyup.enter="updataComment(comment)">
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
              <li><a class="dropdown-item" @click.prevent="editComment(comment)" href="#">編輯貼文</a></li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div class="lodingBlock mt-3">
      <div class="spinner-border mx-auto"
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
      postBlock: false,
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
          alert('收回成功')
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
          alert('刪除成功')
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
          alert('刪除成功')
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
  border: 2px solid black;
  box-shadow: 0px 3px 0px #000400;
  padding: 24px;
}
.card-user {
  height: 45px;
  display: flex;
}
.card-user-icon {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 45px;
    width: 45px;
  }
  font: normal normal bold 16px/24px Noto Sans TC;
  display: flex;
  align-items: center;
}
.card-user-name {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.card-user-date {
  font-size: 13px;
  color: #9B9893;
}
.card-content-text {
  p {
    font: normal normal normal 16px/24px Noto Sans TC;
  }
}
.card-content-img {
  max-width: 100%;
  height: auto;
  border: 2px solid #000400;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.card-good-block {
  display: flex;
}
.icons-item {
  font-size: 1.5rem;
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
.card-user-input-black {
  display: flex;
  justify-content: space-between;
}
.card-user-input-img {
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
  }
}
.card-user-input {
  // border: 2px solid black;
  display: flex;
  width: 100%;
  input {
    border: 2px solid black;
    padding-left: 10px;
    width: 100%;
    border-right: 2px solid black;
  }
  .card-user-input-button {
    border: 2px solid black;
    width: 128px;
    background: #03438D 0% 0% no-repeat padding-box;
    border: 0;
    text-align: center;
    font: normal normal normal 16px/19px Azeret Mono;
    letter-spacing: 0px;
    color: #FFFFFF;
  }
  .card-user-input-button:hover {
    border: 2px solid black;
    border-left: 0;
    color: black;
    background: #EEC32A 0% 0% no-repeat padding-box;
  }
}
// 留言資訊
.card-message {
  border-radius: 12px;
}
.card-message-block {
  display: flex;
  padding: 16px;
  background: #faf9f7;
}
.lodingBlock {
  display: flex;
}
</style>
