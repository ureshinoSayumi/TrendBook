<template>
  <div class="card p-4">
    <div class="card-stand"></div>
    <div class="font-customize-style mx-auto">
      <p class="card-stand-p mt-4 mb-2">{{ tagText }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tagText: String
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
.card-stand-p {
  color: #9B9893;
}
.card {
  border-radius: 8px;
}
.card-stand {
  height: 25px;
  border-bottom: 2px solid black;
}
.card-stand-p {
  color: #9B9893;
}
</style>
