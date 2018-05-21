<template>
  <nas-page-content class="nas-page-content-faq">
    <div class="faq">
      <div class="faq-question">
        <el-button type="danger" circle>问</el-button>
        这个DApp可以用来做什么？
      </div>
      <div class="faq-answer">
        <el-button type="success" circle>答</el-button>
        “一起讲故事”使得读者除了阅读外，还可以基于现有故事在文末贡献自己的内容，参与故事创作。
      </div>
    </div>

    <div class="faq">
      <div class="faq-question">
        <el-button type="danger" circle>问</el-button>
        阅读故事需要收费吗？贡献内容能得到奖励吗？
      </div>
      <div class="faq-answer">
        <el-button type="success" circle>答</el-button>
        目前阅读故事是不需要费用的，不过内容的贡献者也没有提供额外的奖励。
      </div>
    </div>

    <div class="faq">
      <div class="faq-question">
        <el-button type="danger" circle>问</el-button>
        这个DAPP要如何使用呢？
      </div>
      <div class="faq-answer">
        <el-button type="success" circle>答</el-button>
        搜索和阅读故事可直接使用，创建故事和为故事贡献内容需要使用<a href="https://www.google.cn/chrome/">Chrome浏览器</a>并安装<a href="https://github.com/ChengOrangeJu/WebExtensionWallet">Nebulas插件</a>。
      </div>
    </div>
  </nas-page-content>
</template>

<script>
import NasPageContent from '../../components/NasPageContent/NasPageContent.vue'
export default {
  name: 'FAQ',
  components:{
    NasPageContent
  },
  data(){
  	return {

  	}
  },
  created(){

  },
  mounted(){

  },
  methods: {

  },
  watch: {

  }
}
</script>

<style>
  .nas-page-content-faq{
    
  }
  .faq {
    border:1px dashed #eee;
    background-color: #fafafa;
    padding: 10px;
    margin-bottom: 20px; 
  }
  .faq-question{

    margin-bottom: 10px;
  }
  .faq .faq-icon{
    font-size: 24px;
    color: green;
  }
</style>
