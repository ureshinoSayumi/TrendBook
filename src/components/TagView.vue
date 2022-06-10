<template>
  <div class="d-flex mb-3">
    <div v-if="!isSinglePost" class="tag-block d-flex align-items-center me-3 bg-light">
      <i @click="$router.go(-1)" class="bi bi-arrow-left-square icons-item ms-3 me-3"></i>
    </div>
    <div class="tag-block d-flex align-items-center w-100 bg-light"
      :class=" isSinglePost ? 'justify-content-center' : ''">
      <h2 :class=" isSinglePost ? 'text-center' : 'ps-3'">{{ tagText }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tagText: String,
    isSinglePost: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.tag-block {
  height: 64px;
  border-radius: 8px;
  h2 {
    font: normal normal bold 20px/24px Azeret Mono;
  }
}
.icons-item {
  font-size: 2rem;
  color: #7952b3;
}
.icons-item:hover {
  opacity: .5;
  cursor: pointer;
}
</style>
