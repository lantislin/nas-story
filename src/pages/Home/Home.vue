<template>
  <nas-page-content class="nas-page-content-home">

    <div class="searchbar">
      <el-input
        placeholder="请输入故事标题"
        v-model="searchName"
        @keyup.native="onKeyup"
        clearable>
        <el-button type="primary" slot="append" icon="el-icon-search" @click="onSearch"></el-button>
      </el-input>
    </div>
    
    <div class="stories">
      <div class="empty" v-if="storyList.length === 0">
        未查询到相关故事，来<el-button type="text" @click="create">创建故事</el-button>吧
      </div>
      <div class="card" v-for="(item, index) in storyList" :key="index" v-else>
        <div class="card-header clearfix">
          <h2 class="card-title pull-left">{{ item.title }}</h2>
          <span class="card-time pull-right">共{{ item.passageSize }}页</span>
        </div>
        <div class="card-content">
          {{ item.description }}
        </div>
        <div class="card-footer clearfix">
          <div class="pull-left">
            <span>{{ item.founder}}</span>
            <span>&nbsp;创建于&nbsp;{{ new Date(item.createtime).toLocaleString() }}</span>
          </div>
          <el-button type="text" class="pull-right" @click="view(item)">查看全部</el-button>
        </div>
      </div>
    </div>

    <div class="pagebar clearfix">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        @current-change="currentChange"
        :total="storyNum">
      </el-pagination>
      <div class="page-info">
        共{{ storyNum }}条记录
      </div>
    </div>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
export default {
  name: 'Home',
  components:{
    NasPageContent
  },
  data(){
    var params = this.$route.params.args ? base64Decode(this.$route.params.args) : null;
  	return {
      searchName: params ? (params.title || '') : '',
      storyNum : 0,
      storyList: [],
      loading: null
  	}
  },
  created(){
    if(this.searchName){
      this.currentChange();
    }else{
      this.queryData();
    }
  },
  mounted(){
    
  },
  methods: {
    queryData(){
      this.openLoading();
      var value = "0";
      var nonce = "0";
      var gas_price = "1000000";
      var gas_limit = "2000000";
  	  var callGetStoryNum = "getStoryNum";
  	  var callGetStoryNumArgs = "[]";
  	  var contractGetStoryNum = {
  		  "function": callGetStoryNum,
  		  "args": callGetStoryNumArgs
  	  };
      var callListStorys = "listStorys";
      var callListStorysArgs = "[\"5\",\"1\"]";
      var contractListStorys = {
        "function": callListStorys,
        "args": callListStorysArgs
      };
      var self = this;
  	  neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractGetStoryNum).then(function (resp) {
    		console.log(resp);
    		self.storyNum = parseInt(resp.result);
  	  }).catch(function (err) {
  		  console.log("error:" + err.message)
  	  })
      neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractListStorys).then(function (resp) {
        console.log(resp);
        self.closeLoading();
        self.storyList = JSON.parse(resp.result);
      }).catch(function (err) {
        self.closeLoading();
        console.log("error:" + err.message)
      })
    },
    currentChange(pageNumber){
      this.openLoading();
      console.log(pageNumber);
      var value = "0";
      var nonce = "0"
      var gas_price = "1000000"
      var gas_limit = "2000000"
  	  var callGetStoryNum = "getStoryNum";
  	  var callGetStoryNumArgs = "[]";
  	  var contractGetStoryNum = {
  		  "function": callGetStoryNum,
  		  "args": callGetStoryNumArgs
  	  };
      var callListStorys = "listStorys";
      var callListStorysArgs = "[\"5\",\"" + pageNumber + "\"]";
      var contractListStorys = {
        "function": callListStorys,
        "args": callListStorysArgs
      };
      var self = this;
  	  neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractGetStoryNum).then(function (resp) {
    		console.log(resp);
        self.closeLoading();
    		self.storyNum = parseInt(resp.result);
  	  }).catch(function (err) {
        self.closeLoading();
  		  console.log("error:" + err.message)
  	  });
      neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractListStorys).then(function (resp) {
        console.log(resp);
        self.closeLoading();
        self.storyList = JSON.parse(resp.result);
      }).catch(function (err) {
        self.closeLoading();
        console.log("error:" + err.message)
      });
    },
    onKeyup(ev){
      if(ev.keyCode == 13){
        this.onSearch();
      }
    },
    onSearch(){
      this.openLoading();
      var from = Account.NewAccount().getAddressString();
      var value = "0";
      var nonce = "0"
      var gas_price = "1000000"
      var gas_limit = "2000000"
      var callGetStory = "getStory";
      var callGetStoryArgs = "[\"" + this.searchName + "\"]";
      var contractGetStory = {
        "function": callGetStory,
        "args": callGetStoryArgs
      }
  	  var callGetStoryNum = "getStoryNum";
  	  var callGetStoryNumArgs = "[]";
  	  var contractGetStoryNum = {
  		  "function": callGetStoryNum,
  		  "args": callGetStoryNumArgs
  	  };
  	  var callListStorys = "listStorys";
      var callListStorysArgs = "[\"5\",\"1\"]";
      var contractListStorys = {
        "function": callListStorys,
        "args": callListStorysArgs
      };
      var self = this;

  	  if (this.searchName.trim() != "") {
    		neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractGetStory).then(function (resp) {
    			console.log(resp);
          self.closeLoading();
    			var story = JSON.parse(resp.result);
    			if (story === null) {
    				self.storyNum = 0;
    				self.storyList = [];
    			} else {
    				self.storyNum = 1;
    				self.storyList = [story];
    			}
    		}).catch(function (err) {
          self.closeLoading();
    			console.log("error:" + err.message)
    		})
  	  } else {
  	    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractGetStoryNum).then(function (resp) {
    			console.log(resp);
          self.closeLoading();
    			self.storyNum = parseInt(resp.result);
    		}).catch(function (err) {
          self.closeLoading();
    			console.log("error:" + err.message)
    		})
    		neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractListStorys).then(function (resp) {
    			console.log(resp);
          self.closeLoading();
    			self.storyList = JSON.parse(resp.result);
    		}).catch(function (err) {
          self.closeLoading();
    			console.log("error:" + err.message)
    		})
  	  }
    },
    view(item){
      this.$router.push({
        name:'Detail', 
        params: { 
          args: base64Encode({
            title: item.title,
            founder: item.founder,
            createtime: item.createtime
          })
        }
      });
    },
    create(){
      this.$router.push({
        name:'Create', 
        params: { 
          args: base64Encode({
            title: this.searchName
          })
        }
      });
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
  .nas-page-content-home{
    min-width: 600px;
  }
  .searchbar{
    margin-bottom: 30px; 
  }
  .card{
    border:1px solid #e8e8e8;
    border-radius: 5px;
    margin-bottom: 20px; 
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .card-header{
    padding-left: 15px;
    padding-right: 15px; 
    line-height: 50px;
    border-bottom: 1px dashed #eee;
    background-color: #fafafa;
    border-radius: 5px 5px 0 0; 
  }
  .card-title{
    font-size: 18px;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  .card-content{
    padding: 15px;
    color: #666;
    word-wrap: break-word; 
    word-break: normal; 
  }
  .card-time{
    font-size: 14px;
    color: #999;
  }
  .card-footer{
    margin-top: 20px;
    color: #999;
    padding-left: 15px;
    padding-right: 15px; 
    line-height: 40px;
    border-top: 1px dashed #eee;
    background-color: #fafafa;
    border-radius: 0 0 5px 5px; 
  }
  .stories .empty{
    margin-bottom: 30px; 
  }
</style>
