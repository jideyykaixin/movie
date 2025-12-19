<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <p>&copy; 2023 MovieHub. All rights reserved.</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
  text-align: center;
  color: #ccc;
  padding: 20px 0;
}
</style>