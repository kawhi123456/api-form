<template>
  <div class="approval">
    <div class="top">
      <div class="title">假期管理</div>
      <div class="create">
        <el-button size="small" @click="createNewTemplate">创建新模板</el-button>
      </div>
    </div>
    <div class="content">
      <div class="content-card" @click="jumpToDetail">
        <i class="iconfont icon-qingjia"></i>
        <p>请假</p>
      </div>
      <div class="content-card" @click="jumpToDetail">
        <i class="iconfont icon-chucha"></i>
        <p>出差</p>
      </div>
    </div>

    <div class="title">人事管理</div>
    <div class="content">
      <div class="content-card" @click="jumpToDetail">
        <i class="iconfont icon-ruzhishenqing"></i>
        <p>入职审批</p>
      </div>
      <div class="content-card" @click="jumpToDetail">
        <i class="iconfont icon-zhuanzheng"></i>
        <p>转正</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      jumpToDetail() {
        this.$router.push({
          path: './form'
        })
      },
      createNewTemplate() {
        this.$router.push({
          path: './createTemplate'
        })
      }
    }
  }
</script>

<style scoped>
  .top {
    display: flex;
    justify-content: space-between;
  }

  .approval {
    margin: 0 20px;
  }

  .content {
    margin-top: 20px;
    padding-bottom: 34px;
    display: flex;
    border-bottom: 1px solid #ECECEC;
  }

  .content-card {
    width: 190px;
    height: 70px;
    border-radius: 5px;
    border: 1px solid #ECECEC;
    display: flex;
    align-items: center;
    margin-right: 12px;
  }

  .content-card p {
    display: inline-block;
  }

  .iconfont {
    font-size: 37px !important;
    background: white;
    color: #3296FA;
    margin-left: 17px;
    margin-right: 12px;
  }

  .title,
  .create {
    margin-top: 20px;
  }

  .content-card:hover {
    cursor: pointer;
    border: 1px solid #3296FA;
  }
</style>