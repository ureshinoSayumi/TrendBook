<template>
  <div class="row">
    <div class="col-xl-8 col-md-12">
      <div class="follow-block d-flex align-items-center bg-light mb-3" v-if="user && $store.state.userInfo">
        <img v-if="user.image" :src="user.image" alt="">
        <img v-else src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
        <div class="follow-block-data ms-2 me-4">
          <h6 class="font-customize-style">{{ user.name }}</h6>
          <p class="mt-2">{{ user.followers.length }}人追蹤</p>
        </div>
        <div v-if="user._id !== $store.state.userInfo._id" class="ms-auto">
          <button v-if="isFollow === -1" @click="follow" class="btn btn-primary btn-customize me-3" >
            追蹤
          </button>
          <button v-else @click="unfollow" class="btn btn-primary btn-customize me-3" >
            取消追蹤
          </button>
        </div>
      </div>
      <!-- 搜尋 -->
      <div class="row">
        <div class="col-xl-6 col-md-12 mb-3">
          <select class="form-select" aria-label="Default select example"
            v-model="filter" @change="getPost(filter, searchPost)">
            <option value="">最新貼文</option>
            <option value="asc">最舊貼文</option>
          </select>
        </div>
        <div class="col-xl-6 col-md-12 mb-3">
          <div class="input-group">
            <input type="text" class="form-control border-0 pt-2 pb-2" placeholder="搜尋貼文" aria-label="搜尋貼文" aria-describedby="button-addon2"
              v-model="searchPost" @keyup.enter="getPost(filter, searchPost)">
            <button class="border-0 text-light bg-primary"
              @click="getPost(filter, searchPost)">
              <i class="bi bi-search" style="font-size: 1.7rem;"></i>
            </button>
          </div>
        </div>
      </div>
      <AlertView
        v-if="loading"
        :tagText="'資料載入中...'"
      >
      </AlertView>
      <AlertView
        v-if="!loading && !allPost.length"
        :tagText="'目前尚無動態'"
      >
      </AlertView>
      <!-- 貼文牆 -->
      <postsCardlView
        :postData="allPost"
        :loading="loading"
        @get-all-post="getPost"
      >
      </postsCardlView>
    </div>
    <div class="col">
      <ItemView
        :modalTitle="'發表貼文'"
        @get-post-data="getPost"
      >
      </ItemView>
    </div>
  </div>
</template>
<script>
import postsCardlView from '../components/postsCardlView.vue'
import ItemView from '../components/ItemView.vue'
import AlertView from '../components/AlertView.vue'

export default {
  components: {
    postsCardlView,
    ItemView,
    AlertView
  },
  data () {
    return {
      searchPost: '',
      filter: '',
      allPost: [],
      loading: null,
      user: null,
      isFollow: false,
      page: 2,
      scrollEvent: null
    }
  },
  methods: {
    getPost (sort = '-createdAt', search = '', page = 1, scroll = false) {
      if (this.loading) return
      this.loading = true
      const filter = {
        sort: `?timeSort=${sort}`,
        search: `&q=${search}`,
        page: `&page=${page}`
      }
      this.axios.get(`${process.env.VUE_APP_API}post/user/${this.$route.params.id}${filter.sort}${filter.search}${filter.page}`)
        .then((response) => {
          if (scroll) {
            if (!response.data.data.length) {
              window.removeEventListener('scroll', this.scrollEvent)
            }
            this.page += 1
            const temp = this.allPost.concat(response.data.data)
            this.allPost = temp
          } else {
            this.allPost = response.data.data
            this.page = 2
          }
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getPost')
        })
    },
    getUser () {
      this.axios.get(`${process.env.VUE_APP_API}users/${this.$route.params.id}`)
        .then((response) => {
          this.user = response.data.data
          this.isFollow = this.user.followers.findIndex(item => item.user._id === this.$store.state.userInfo._id)
        })
        .catch((error) => {
          console.log(error, 'getUser')
        })
    },
    follow () {
      this.axios.post(`${process.env.VUE_APP_API}users/${this.$route.params.id}/follow`)
        .then((response) => {
          this.getPost()
          this.getUser()
          console.log(response, 'follow')
        })
        .catch((error) => {
          console.log(error.response.data.message, 'follow')
          alert(error.response.data.message)
        })
    },
    unfollow () {
      this.axios.delete(`${process.env.VUE_APP_API}users/${this.$route.params.id}/unfollow`)
        .then(() => {
          this.getPost()
          this.getUser()
        })
        .catch((error) => {
          console.log(error, 'unfollow')
        })
    },
    buildThrottle () {
      function throttle (fn, delay) {
        let last = 0
        return function (...args) {
          const now = Date.now()
          if (now - last > delay) {
            last = now
            fn.apply(this, args)
          }
        }
      }
      const throttleTask = throttle(this.getPost, 1000)
      this.scrollEvent = () => {
        const isBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - 100
        if (isBottom) {
          throttleTask(this.filter, this.searchPost, this.page, true)
        }
      }
    },
    buildScrollEvent () {
      this.buildThrottle()
      window.addEventListener('scroll', this.scrollEvent)
    }
  },
  mounted () {
    this.getPost()
    this.getUser()
    this.buildScrollEvent()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  watch: {
    $route () {
      if (this.$route.name === 'single-user') {
        this.getPost()
        this.getUser()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.font-customize-style {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.form-select {
  height: 40px;
}
.follow-block {
  height: 80px;
  border-radius: 8px;
  img {
    border-radius: 8px 0px 0px 8px;
    // border-right: 2px solid black;
    overflow: hidden;
    height: 100%;
    width: 80px;
  }
}
.follow-block-data {
  max-width: 260px;
  padding: 16px 5px;
}
.btn-customize {
  padding: 6px 32px;
}
</style>
