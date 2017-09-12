<template>
  <div>
    <div class="top-bar bgwhite">
      <i class="eln-ico left-arrow" @click="goBack"></i>
      <div class="input-wrap after-ico">
        <input type="text" placeholder="请输入实验标题、关键字和实验编号" v-model="input_word"  @keyup.enter='searchExp'>
        <i class="del-input eln-ico" @click="clearInput" v-show="input_word"></i>
      </div>
      <!-- <span class="right-search-txt" @click="searchExp">搜索</span> -->
    </div>
    <div class="absolute-white search-wrap search-his" v-show="expHis.length>0 && !search_word">
      <div class="title">最近搜索
        <i class="eln-ico del-his" @click="delHis"></i>
      </div>
      <ul class="con clearfix">
        <li class="his-item" v-for="item in expHis" @click="searchHis(item)">{{item}}</li>
      </ul>
    </div>
    <no-data v-show="search_word && showNoData"></no-data>
    <ul class="bgwhite mt6" v-show="search_word" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
      <li v-for="(item,index) in expData" @click="chooseExp(item)" class="choose-bar after-ico">
        {{calExpName(item)}}
      </li>
    </ul>
  </div>
</template>
<script>
import noData from './noData.vue';
import { ajax, localSave,calDate } from '../js/common'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      input_word:'',//输入的值
      search_word: '',//搜索的值
      expHis: [], //记录本查询历史
      expData: [],
      loading: false,
      page: 1,
      book_id: '',
      dataOver: false, //数据是否加载完
      showNoData: false, //显示无数据的页面
    }
  },
  computed: {
    ...mapState(['book', 'exp', 'uid']),
  },
  methods: {
    clearInput() {
      this.search_word = '';
      this.input_word = '';
    },
    delHis() {
      //删除local本地存储
      localSave('expHis','');
      this.expHis = [];
    },
    //搜索记录本。
    searchExp() {
      this.search_word = this.input_word;
      this.page = 1;
      this.loading = false;
      this.dataOver = false;
      this.expData = [];//清空个数据先。
      this.getList();
      this.saveHisWord();
    },
    searchHis(item) {
      this.input_word = item;
      this.searchExp();
    },
    //计算实验名
    calExpName(exp) {
      var exp_page = exp.exp_page;
      var len = exp_page.length;
      if (1 == len) {
        exp_page = '00' + exp_page;
      } else if (2 == len) {
        exp_page = '0' + exp_page;
      }
      var res = 'N' + (calDate(exp.book_create_time)).getFullYear().toString().slice(2) + exp.code + '-' + exp_page;
      //把计算后的结果保存一下。
      exp.caled_name = res;
      return res;
    },
    getList() {

      var self = this;
      //没有关键字的时候不搜索。
      if (!this.search_word) {
        this.expData = [];
        return;
      }
      if (this.dataOver) {
        return;
      }
      //搜索之前就清一下数据
      if (1 == self.page) {
        self.expData = [];
      }
      this.leading = true;
      self.showNoData = false;
      ajax({
        url: '/eln/exp-list',
        method: 'post',
        data: {
          page: this.page,
          uid: this.uid,
          search_word: this.search_word,
          book_id: this.book_id,
          limit: 30
        },
        callback: function(data) {

          self.loading = false;

  
          
          if (1 == data.status) {
            var parsedData = JSON.parse(data.data);
            var expList = parsedData.expList;
            var len = expList.length;
            if (1 == self.page) {
              self.expData = expList;
              if (0 == len) {
                self.showNoData = true;
              }
            } else {
              self.expData = self.expData.concat(expList)
            }
            if (expList.length == 0) {
              self.dataOver = true;
            } else {
              self.page++;

              //如果没有出现滚动条。说明数据没加载满。那么需要继续加载。这段代码还要再测试
              // if (!(document.body.style.overflow != "hidden" && document.body.scroll != "no" && document.body.scrollHeight > document.body.offsetHeight)) {
              //   self.getList();

              // }
            }

          }

        }
      })
    },
    chooseExp(item) {
      this.$store.commit('chooseExp', item);
      //跳转到提交页面。
      this.$router.replace('/submitPage');
    },
    goBack() {
      this.$router.go(-1);
    },
    getHisWord() {
      var expHis = localSave('expHis');
      if(!expHis){
        expHis = [];
      }else{
        expHis = JSON.parse(expHis);
      }
      this.expHis = expHis;
    },
    saveHisWord() {
      if(!this.search_word){
        return;
      }
      var expHis = localSave('expHis');
      if(!expHis){
        expHis = [];
      }else{
        expHis = JSON.parse(expHis);
      }
      //不在里面
      if(expHis.indexOf(this.search_word) < 0){
        expHis.push(this.search_word);
        localSave('expHis',JSON.stringify(expHis));
      }
      this.expHis = expHis;
    }
  },
  components: { noData },
  created() {
    // 进入页面的时候从local拿存储的最近历史
  this.getHisWord();
    //初始化，拿数据
    this.loading = false;
    this.page = 1;
    this.dataOver = false;
    this.book_id = this.$route.params.id;
    this.showNoData = false;
    this.search_word = '';
    this.input_word = '';
  }
}

</script>
<style scoped>
.search-wrap {
  top: 50px;
  height: calc(100% - 50px);
}

</style>
