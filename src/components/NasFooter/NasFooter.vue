<template>
  <div class="footer">
  	<div class="wrapper">
		  <img :src="logoImage" width="160">
  		<div class="menu-list">
        <a href="javascript:;" class="menu-item" v-for="(item, index) in menuList" @click="handleSelect(item.routerName)">
          {{ item.menuName }}
          <span class="split" v-if="index < menuList.length - 1">|</span>
        </a>
      </div>
      <p class="copyright">Copyright © 2017-2018 xxx.xxx</p>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'NasFooter',
  data(){
    return {
      logoImage: require('../NasHeader/nebulasx60.png'),
      menuList: [
        {"menuName": "首页", "routerName": "Home"},
        {"menuName": "创建故事", "routerName": "Create"},
        {"menuName": "FAQ", "routerName": "FAQ"},
        {"menuName": "联系我们", "routerName": "Contact"}
      ]
    }
  },
  methods: {
    handleSelect(key){
      this.$router.push(key);
    }
  }
}
</script>

<style>
  .footer{
    background-color: #fafafa;
    text-align: center;
  }
  .footer .wrapper{
  	padding: 20px;
  }
  .copyright{
    font-size: 14px;
    color: #999;
    margin: 15px 0 0 0;
  }
  .menu-list,
  .menu-item{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu-list{
    margin-top: 15px; 
  }
  .menu-item{
    display: inline-block;
    font-size: 14px;
    color: #666;
    text-decoration: none;
  }
  .menu-item:hover{
    color: #444;
  }
  .menu-list .split{
    color: #ccc;
    margin-left: 12px;
    margin-right: 15px; 
  }
</style>
