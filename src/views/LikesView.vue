<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-md-12">
      <TagView
        :tagText="'我收藏的貼文'"
      >
      </TagView>
      <AlertView
        v-if="loading"
        :tagText="'資料載入中...'"
      >
      </AlertView>
      <AlertView
        v-if="!loading && !allLikes.length"
        :tagText="'目前尚無收藏'"
      >
      </AlertView>
      <div class="likes-block d-flex flex-column justify-content-center align-items-center bg-light mt-3"
        v-for="like in allLikes" :key="like._id">
        <div class="content w-100 d-flex justify-content-between align-items-center">
          <div class="d-flex ms-3">
            <router-link :to="`/user/${like.user._id}`" href="#">
              <img v-if="like.user.image" class="mt-1" :src="like.user.image" alt="">
              <img v-else class="mt-1" src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
            </router-link>
            <div class="user ms-3">
              <router-link :to="`/user/${like.user._id}`" href="#">
                <p class="name">{{ like.user.name }}</p>
              </router-link>
              <p class="date mt-1">發文時間 {{ formatDate(like.createdAt) }}</p>
            </div>
          </div>
          <div class="d-flex me-3">
            <div class="like-block ms-5" @click="clearLike(like)">
              <i class="bi bi-heart-fill icon ms-1"></i>
              <p class="text">取消</p>
            </div>
            <div class="like-block ms-4">
              <router-link :to="`/post/${like._id}`" href="#">
                <i class="bi bi-arrow-right-circle icon ms-1"></i>
                <p class="text">查看</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TagView from '../components/TagView.vue'
import AlertView from '../components/AlertView.vue'

export default {
  components: {
    TagView,
    AlertView
  },
  data () {
    return {
      allLikes: [],
      loading: false
    }
  },
  methods: {
    getUserLike () {
      this.loading = true
      this.axios.get(`${process.env.VUE_APP_API}users/getLikeList`)
        .then((response) => {
          this.allLikes = response.data.data
          this.loading = false
        })
        .catch((error) => {
          alert('token過期，請先登入')
          console.log(error, 'error')
        })
    },
    clearLike (like) {
      this.loading = true
      this.axios.delete(`${process.env.VUE_APP_API}post/${like._id}/unlike`)
        .then(() => {
          this.getUserLike()
          this.loading = false
        })
        .catch((error) => {
          console.log(error, 'post')
          alert('收回失敗')
        })
    },
    formatDate (dateStr) {
      const date = new Date()
      const formattedDate = `${date.getFullYear(dateStr)}-${(date.getMonth(dateStr) + 1)}-${date.getDate(dateStr)} ${date.getHours(dateStr)}:${date.getMinutes(dateStr)}:${date.getSeconds(dateStr)}`
      return formattedDate
    }
  },
  mounted () {
    this.getUserLike()
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
.likes-block {
  height: 77px;
  border-radius: 8px;
  .content {
    img {
      border-radius: 50%;
      overflow: hidden;
      height: 40px;
      width: 40px;
    }
    .icon {
      font-size: 1.2rem;
      color: #7952b3;
    }
    .like-block:hover {
      opacity: .5;
      cursor: pointer;
    }
  }
}
.text {
  font: normal normal bold 14px/20px Noto Sans TC;
}
.name {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.date {
  font-size: 13px;
  color: #9B9893;
}
</style>
