<template>
  <div class="row">
    <div class="col-xl-8 col-md-12">
      <!-- 搜尋 -->
      <div class="row">
        <div class="col-xl-6 col-md-12 mb-3">
          <select class="form-select" aria-label="Default select example"
            v-model="filter" @change="getAllPost(filter, searchPost)">
            <option value="">最新貼文</option>
            <option value="asc">最舊貼文</option>
          </select>
        </div>
        <div class="col-xl-6 col-md-12 mb-3">
          <div class="input-group">
            <input type="text" class="form-control border-0 pt-2 pb-2" placeholder="搜尋貼文" aria-label="搜尋貼文" aria-describedby="button-addon2"
              v-model="searchPost" @keyup.enter="getAllPost(filter, searchPost)">
            <button class="border-0 text-light bg-primary" @click="getAllPost(filter, searchPost)">
              <i class="bi bi-search" style="font-size: 1.7rem;"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- 貼文牆 -->
      <postsCardlView
        :postData="allPost"
        :loading="loading"
        @get-all-post="getAllPost"
      >
      </postsCardlView>
      <!-- 如果沒有貼文 -->
      <AlertView
        v-if="!loading && !allPost.length"
        :tagText="'目前尚無動態，新增一則貼文吧！'"
      >
      </AlertView>
    </div>
    <div class="col-xl-4 col-md-12">
      <ItemView
        :modalTitle="'發表貼文'"
        @get-post-data="getAllPost"
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
      name: 'TenndView',
      // 輸入框
      searchPost: '',
      // select
      filter: '',
      allPost: [],
      loading: null,
      page: 2,
      scrollEvent: null
    }
  },
  methods: {
    getAllPost (sort = '-createdAt', search = '', page = 1, scroll = false) {
      if (this.loading) return
      this.loading = true
      const filter = {
        sort: `?timeSort=${sort}`,
        search: `&q=${search}`,
        page: `&page=${page}`
      }
      this.axios.get(`${process.env.VUE_APP_API}posts${filter.sort}${filter.search}${filter.page}`)
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
          console.log(error, 'getAllPost')
        })
    },
    getPost () {
      this.loading = true
      this.axios.get(`${process.env.VUE_APP_API}posts/${this.$route.params.id}`)
        .then((response) => {
          this.allPost = response.data.data
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error, 'getAllPost')
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
      const throttleTask = throttle(this.getAllPost, 1000)
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
    if (this.$route.params.id) {
      this.getPost()
    } else {
      this.getAllPost()
    }
    this.buildScrollEvent()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style lang="scss" scoped>
.form-select {
  height: 40px;
}
// 如果沒有貼文
.font-customize-style {
  font: normal normal bold 16px/24px Noto Sans TC;
}
</style>
