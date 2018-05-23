<template>
  <nas-page-content class="nas-page-content-create">
    <el-form ref="form" :model="form">
      <el-form-item label="故事标题">
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="故事简述">
        <el-input type="textarea" v-model="form.description" rows="10" clearable @keyup.native="textareaChange"></el-input>
        <div class="textarea-status clearfix">
          <div class="pull-left text">
            {{ form.description.length }}/{{count}}
            <span class="tips" v-show="showTips">超出字数限制！</span>
          </div>
          <div class="pull-right"><a class="clear" href="javascript:;" @click="form.description=''">清空</a></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="hui-btn-block">立即创建</el-button>
      </el-form-item>
    </el-form>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
export default {
  name: 'Create',
  components:{
    NasPageContent
  },
  data(){
    var params = this.$route.params.args ? base64Decode(this.$route.params.args) : null;
  	return {
      count: 200,
      showTips: false,
      form: {
        title: params ? (params.title || '') : '',
        description: ''
      }
  	}
  },
  created(){

  },
  mounted(){

  },
  methods: {
    textareaChange(){
      if(this.form.description.length > this.count){
        this.showTips = true;
      }else{
        this.showTips = false;
      }
    },
    onSubmit() {
      var self = this;
      var value = "0";
      var nonce = "0"
      var gas_price = "1000000";
      var gas_limit = "2000000";
      var title = this.form.title.trim();
      var description = this.form.description.trim();
      description = HTMLDecode(description);
      
      if (title === "") {
        this.$message({
          message: '故事标题不能为空哦',
          type: 'warning'
        });
        return;
      }
      if (description === "") {
        this.$message({
          message: '故事内容不能为空哦',
          type: 'warning'
        });
        return;
      }

      var intervalQuery = 0;
      var callCreateStory = "createStory";
      var callCreateStoryArgs = "[\"" + title + "\",\"" + description + "\"]";
      var serialNumber = nebPay.call(dappAddress,"0",callCreateStory,callCreateStoryArgs, {
        callback: payCallbackUrl, 
        listener: function(resp) {
          //console.log(resp);
          intervalQuery = setInterval(function() {
            queryResultInfo();
          }, 10000);
        }
      });

      function queryResultInfo() {
        nebPay.queryPayInfo(serialNumber, {callback: payCallbackUrl}).then(function(resp) {
          var respObject = JSON.parse(resp)
          //console.log(respObject);
          //code==0交易发送成功, status==1交易已被打包上链
          if(respObject.code === 0 && respObject.data.status === 1) { 	
        	clearInterval(intervalQuery);
			var storyNum = parseInt(resp.result);
            if (0 === storyNum) {
                self.$alert('故事"' + title + '"已经存在了，你可以搜索并参与该故事的后续创作哦', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      self.view();
                    }
                });
        	} else {
                self.$alert('你已经成功创建了故事"' + title + '"', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  self.view();
                }
              });
        	}		
          }
        }).catch(function (err) {
           console.log("error:" + err.message)
        })
      }
    },
    view(){
      this.$router.replace({
        name:'Home', 
        params: { 
          args: base64Encode({
            title: this.form.title
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
