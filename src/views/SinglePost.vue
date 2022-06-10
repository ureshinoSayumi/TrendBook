<template>
  <div class="row">
    <div class="col-xl-8 col-md-12">
      <AlertView
        v-if="!allPost.length"
        :tagText="'資料載入中...'"
      >
      </AlertView>
      <TagView
        v-if="allPost.length"
        :tagText="`[${allPost[0].type}] ${allPost[0].title}`"
        :isSinglePost="false"
      >
      </TagView>
      <!-- 貼文牆 -->
      <postCardlView
        :postData="allPost"
        :loading="loading"
        @get-single-post="getPost"
      >
      </postCardlView>
    </div>
    <div class="col">
      <ItemView
        :modalTitle="'回覆貼文'"
        @get-post-data="getPost"
      >
      </ItemView>
    </div>
  </div>
</template>
<script>
import postCardlView from '../components/postCardlView.vue'
import ItemView from '../components/ItemView.vue'
import TagView from '../components/TagView.vue'
import AlertView from '../components/AlertView.vue'

export default {
  components: {
    postCardlView,
    ItemView,
    TagView,
    AlertView
  },
  data () {
    return {
      allPost: [],
      loading: null
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
    }
  },
  mounted () {
    this.getPost()
  }
}
</script>

<style lang="scss" scoped>
</style>
