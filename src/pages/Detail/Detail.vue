<template>
  <nas-page-content class="nas-page-content-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1 class="title">{{ title }}</h1>
    <h2 class="subtitle">
      <span>创建人：{{ founder }}</span>
      <span style="margin-left: 10px;">创建时间：{{ new Date(createtime).toLocaleString() }}</span>
    </h2>
    
    <article class="article" v-if="passageList.length === 0">
      没找到相关内容，来<el-button type="text" @click="create">贡献内容</el-button>吧
    </article>
    <article class="article" v-for="(item, index) in passageList" v-else>
      <div class="content">{{ item.content }}</div>
      <footer class="footer">该片段由&nbsp;&nbsp;<span>{{ item.auther }}</span>&nbsp;&nbsp;贡献于&nbsp;&nbsp;{{ new Date(item.createtime).toLocaleString() }}</footer>
    </article>

    <div class="pagebar clearfix">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        @current-change="currentChange"
        :current-page="currentPage"
        :total="passageSize">
      </el-pagination>
      <div class="page-info">
        共{{ Math.ceil(passageSize/pageSize) }}页
        <el-button type="success" size="small" v-show="Math.ceil(passageSize/pageSize) === currentPageNumber" @click="create">我要贡献内容</el-button>
      </div>
    </div>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
export default {
  name: 'Detail',
  components:{
    NasPageContent
  },
  data(){
    var params = base64Decode(this.$route.params.args);
    console.log(params);
  	return {
      params: params,
      title: params.title,
      founder: params.founder,
      createtime: params.createtime,
      pageSize: 1,
      passageSize: 0,
      currentPageNumber: params.currentPageNumber || 1,
      currentPage: 0,
      firstFromCreatePassage: false,
      passageList: [],
      loading: null,
      form:{
        content: ''
      }
  	}
  },
  created(){
    if(this.params.currentPageNumber !== undefined){
      this.firstFromCreatePassage = true;
    }
    this.queryData();
  },
  methods: {
    create(){
      this.$router.push({
        name: 'CreatePassage',
        params: { 
          args: base64Encode({
            title: this.title,
            founder: this.founder,
            createtime: this.createtime
          })
        }
      });
    },
  	queryData(){
      this.openLoading();
      var value = "0";
      var nonce = "0";
      var gas_price = "1000000";
      var gas_limit = "2000000";
  	  var callGetPassageNum = "getPassageNum";
  	  var callGetPassageNumArgs = "[\"" + this.title + "\"]";
  	  var contractGetPassageNum = {
  		  "function": callGetPassageNum,
  		  "args": callGetPassageNumArgs
  	  };

  	  var callListPassages = "listPassages";
  	  var callListPassagesArgs = "[\"" + this.title + "\",\"1\",\"" + this.currentPageNumber + "\"]";
  	  var contractListPassages = {
  		  "function": callListPassages,
  		  "args": callListPassagesArgs
  	  };

  	  var self = this;
  	  neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractGetPassageNum).then(function (resp) {
    		//console.log(resp);
    		self.passageSize = parseInt(resp.result);
        if(self.firstFromCreatePassage){
          self.currentPage = self.passageSize;
        }
  	  }).catch(function (err) {
  		  //console.log("error:" + err.message)
  	  });

      neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractListPassages).then(function (resp) {
        //console.log(resp);
        self.closeLoading();
        self.passageList = JSON.parse(resp.result);
      }).catch(function (err) {
        //console.log("error:" + err.message)
        self.closeLoading();
      });
  	},
  	currentChange(pageNumber){
      this.currentPageNumber = pageNumber;
      this.firstFromCreatePassage = false;
      this.queryData();
    },
    openLoading(){
      this.loading = this.$loading({
        lock: false,
        text: '正在加载',
        background: 'rgba(255, 255, 255, 0.5)'
      });
    },
    closeLoading(){
      this.loading.close();
    }
  },
  watch: {

  }
}
</script>

<style>
  .nas-page-content-detail .title,
  .nas-page-content-detail .subtitle{
    text-align: center;
    font-weight: normal;
  }
  .nas-page-content-detail .title{
    font-size: 24px;
  }
  .nas-page-content-detail .subtitle{
    font-size: 14px;
    color: #999;
  }
  .nas-page-content-detail .description{
    padding: 20px;
    border: 1px dashed #eeeeee;
    background-color: #fafafa;
    margin-bottom: 20px;
    color: #999;
    font-size: 14px;
    border-radius: 5px;
  }
  .nas-page-content-detail .article{
    margin-top: 20px;
    margin-bottom: 20px; 
    border-radius: 5px;
  }
  .nas-page-content-detail .content{
    min-height: 400px;
    word-wrap: break-word; 
    word-break: normal; 
  }
  .nas-page-content-detail .footer{
    padding-left: 20px;
    padding-right: 20px;
    line-height: 30px;
    background-color: #f0f9eb;
    border:1px dashed #c2e7b0;
    margin-top: 20px; 
    font-size: 14px;
    border-radius: 3px;
  }
</style>
