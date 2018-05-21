<template>
  <nas-page-content class="nas-page-content-create-passage">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="javascript:;" @click="$router.go(-1)">{{ title }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>贡献内容</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form">
      <el-form-item label="故事标题">
        <el-input v-model="title" clearable disabled></el-input>
      </el-form-item>
      <el-form-item label="故事内容">
        <el-input type="textarea" v-model="form.content" rows="15" clearable @keyup.native="textareaChange"></el-input>
        <div class="textarea-status clearfix">
          <div class="pull-left text">
            {{ form.content.length }}/{{count}}
            <span class="tips" v-show="showTips">超出字数限制！</span>
          </div>
          <div class="pull-right"><a class="clear" href="javascript:;" @click="form.content=''">清空</a></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="hui-btn-block">提交</el-button>
      </el-form-item>
    </el-form>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
export default {
  name: 'CreatePassage',
  components:{
    NasPageContent
  },
  data(){
    var params = base64Decode(this.$route.params.args);
  	return {
      count: 800,
      showTips: false,
      title: params.title,
      founder: params.founder,
      createtime: params.createtime,
      form: {
        content: ''
      }
  	}
  },
  created(){

  },
  mounted(){

  },
  methods: {
    textareaChange(){
      if(this.form.content.length > this.count){
        this.showTips = true;
      }else{
        this.showTips = false;
      }
    },
    onSubmit() {
      var self = this;
      var value = "0";
      var nonce = "0"
      var gas_price = "1000000"
      var gas_limit = "2000000"
      var content = this.form.content.trim();
      content = HTMLDecode(content);

      if (content === "") {
        this.$message({
          message: '故事内容不能为空哦',
          type: 'warning'
        });
        return;
      }

      var intervalQuery = 0;
      var callAppendPassage = "appendPassage";
  	  var callAppendPassageArgs = "[\"" + this.title + "\",\"" + content + "\"]";
  	  var serialNumber = nebPay.call(dappAddress,"0",callAppendPassage,callAppendPassageArgs, {
        callback: NebPay.config.testnetUrl, //在测试网查询
    		listener: function(resp) {
    			//console.log(resp);
          intervalQuery = setInterval(function() {
            queryResultInfo();
          }, 10000);
    		}
  	  });

      function queryResultInfo() {
        nebPay.queryPayInfo(serialNumber).then(function (resp) {
          var respObject = JSON.parse(resp)
          //console.log(respObject);
          //code==0交易发送成功, status==1交易已被打包上链
          if(respObject.code === 0 && respObject.data.status === 1){  
  				  clearInterval(intervalQuery);
  				  if ("Error: Story has already existed" === resp.result) {
    					//TODO 跳转到创建故事页面
    					return;
  				  } else {
    					//跳转到内容列表页的最后一页
              self.$alert('故事内容添加成功', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  self.view();
                }
              });
  				  }
          }
        }).catch(function (err) {
          //console.log("error:" + err.message)
        })
      }
    },
    view(){
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
      var self = this;
      neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contractGetPassageNum).then(function (resp) {
        console.log('result:'+resp.result);
        var passageSize = parseInt(resp.result);
        self.goDetail(passageSize);
      }).catch(function (err) {
        console.log("error:" + err.message)
      });      
    },
    goDetail(passageSize){
      this.$router.replace({
        name: 'Detail',
        params: { 
          args: base64Encode({
            title: this.title,
            founder: this.founder,
            createtime: this.createtime,
            currentPageNumber: passageSize
          })
        }
      });
    }
  },
  watch: {

  }
}
</script>

<style>
  .nas-page-content-create .hui-btn-block{
    width: 100%;
  }
  .nas-page-content-create .el-form-item__label{
    float: none;
  }
</style>
