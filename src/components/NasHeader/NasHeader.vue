<template>
  <header class="header">
    <div class="wrapper">
      <h1 class="header-title">
        <img :src="logoImage">
        <span class="split"> | </span>
        <span class="title">一起讲故事</span>
      </h1>
      <el-menu :background-color="'#fafafa'" :default-active="$route.name" class="header-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item :index="item.routerName" v-for="(item, index) in menuList" :key="index">{{ item.menuName }}</el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data(){
  	return {
      logoImage: require('./nebulasx60.png'),
      menuList: [
        {"menuName": "首页", "routerName": "Home"},
        {"menuName": "创建故事", "routerName": "Create"},
        {"menuName": "FAQ", "routerName": "FAQ"},
        {"menuName": "联系我们", "routerName": "Contact"}
      ]
  	}
  },
  methods: {
    handleSelect(key, keyPath){
      this.$router.push(key);
    }
  }
}
</script>

<style>
  .header{
    background-color: #fafafa;
    border-bottom: 1px solid #eee;
    height: 80px;
    line-height: 80px;
  }
  .header-title{
    padding: 0;
    margin: 0;
    float: left;
    line-height: 70px;
  }
  .header-menu{
    float: right;
  }
  .header-title img{
    vertical-align: middle;
    width: 160px;
  }
  .header-title .split{
    font-size: 16px;
    font-weight: normal;
    color: #ccc;
    margin: 0 20px
  }
  .header-title .title{
    font-size: 16px;
    font-weight: normal;
  }
  .header .el-menu{
    border-bottom: none;
  }
  .header .el-menu .el-menu-item{
    height: 80px;
    line-height: 80px;
  }
</style>
