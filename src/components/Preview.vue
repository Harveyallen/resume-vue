<template>
  <div class="preview">
    <ResumePreview></ResumePreview>
    <div class="goback" @click="goback">返回</div>
  </div>
</template>

<script>
import ResumePreview from '@/components/ResumePreview'
export default {
  name: 'preview',
  components: {
    ResumePreview
  },
  methods: {
    goback() {
      this.$router.replace('/main')
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  min-width: 1024px;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.goback {
  position: fixed;
  right: 100px;
  top: 20px;
  font-size: 1.5rem;
  background: #2d78f4;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px #ccc;
    border-bottom: 1px solid #ccc;
    opacity: .95;
  }
}
</style>