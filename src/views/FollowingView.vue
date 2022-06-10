<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-md-12">
      <TagView
        :tagText="'我追蹤的用戶'"
      >
      </TagView>
      <AlertView
        v-if="loading"
        :tagText="'資料載入中...'"
      >
      </AlertView>
      <AlertView
        v-if="!loading && !allFollowing.length"
        :tagText="'目前尚無追蹤'"
      >
      </AlertView>
      <div class="following-block d-flex flex-column justify-content-center align-items-center bg-light mt-3"
        v-for="following in allFollowing" :key="following._id">
        <div class="content" v-if="following">
          <router-link class="ms-3" :to="`/user/${following.user._id}`" href="#">
            <img v-if="following.user.image" class="mt-1" :src="following.user.image" alt="">
            <img v-else class="mt-1" src="https://upload.cc/i1/2022/05/31/dVpHNT.png" alt="">
          </router-link>
          <div class="ms-3">
            <router-link :to="`/user/${following.user._id}`" href="#">
              <p class="name">{{ following.user.name }}</p>
            </router-link>
            <p class="date mt-1">發文時間 {{ formatDate(following.createdAt) }}</p>
          </div>
          <div class="ms-auto">
            <button class="btn btn-primary btn-customize me-4" @click="unfollow(following.user)"
              data-bs-toggle="modal" data-bs-target="#exampleModal">
              取消追蹤
            </button>
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
      allFollowing: [],
      loading: false
    }
  },
  methods: {
    getFollowing () {
      this.loading = true
      this.axios.get(`${process.env.VUE_APP_API}users/following`)
        .then((response) => {
          this.allFollowing = response.data.data
          this.loading = false
        })
        .catch((error) => {
          alert('token過期，請先登入')
          console.log(error, 'error')
        })
    },
    unfollow (user) {
      this.loading = true
      this.axios.delete(`${process.env.VUE_APP_API}users/${user._id}/unfollow`)
        .then(() => {
          this.getFollowing()
          this.loading = false
        })
        .catch((error) => {
          console.log(error, 'unfollow')
        })
    },
    formatDate (dateStr) {
      const date = new Date()
      const formattedDate = `${date.getFullYear(dateStr)}-${(date.getMonth(dateStr) + 1)}-${date.getDate(dateStr)} ${date.getHours(dateStr)}:${date.getMinutes(dateStr)}:${date.getSeconds(dateStr)}`
      return formattedDate
    }
  },
  mounted () {
    this.getFollowing()
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
.following-block {
  height: 77px;
  border-radius: 8px;
  // border: 2px solid black;
  // box-shadow: 0px 3px 0px #000400;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  a {
    text-decoration:none
  }
}
.content {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  img {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
  }
}

.follow-unfollow {
  display: inline-block;
  background: #EFECE7 0% 0% no-repeat padding-box;
  border: 2px solid #000400;
  border-radius: 8px;
  box-shadow: 0px 2px 0px #000400;
  padding: 6px 32px;
  font: normal normal bold 16px/24px Noto Sans TC;
}
.follow-unfollow:hover {
  opacity: .5;
}
.text {
  font: normal normal bold 14px/20px Noto Sans TC;
  letter-spacing: 0px;
  color: #000400;
  opacity: 1;
}
.name {
  font: normal normal bold 16px/24px Noto Sans TC;
}
.date {
  font-size: 13px;
  color: #9B9893;
}
</style>
