<template>
  <div>
    <div class="top-bar bgwhite">
      <i class="eln-ico left-arrow" @click="goBack"></i>
      <div class="input-wrap after-ico">
        <input type="text" placeholder="请输入记录本名称" v-model="search_word" @input="searchBook">
        <i class="del-input eln-ico" @click="clearInput" v-show="search_word"></i>
      </div>
    </div>
    <div class="absolute-white search-wrap search-his" v-show="bookHis.length>0 && !search_word">
      <div class="title">最近搜索
        <i class="eln-ico del-his" @click="delHis"></i>
      </div>
      <ul class="con clearfix">
        <li class="his-item" v-for="item in bookHis" @click="searchHis(item)">{{item}}</li>
      </ul>
    </div>
    <no-data v-show="search_word && showNoData"></no-data>
    <ul class="bgwhite mt6" v-show="search_word">
      <li v-for="(item,index) in bookData" @click="chooseBook(item)" class="choose-bar after-ico">
        <span class="text">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import noData from './noData.vue';
import { ajax, localSave } from '../js/common'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search_word: '',
      bookHis: [], //记录本查询历史
      bookData: {},
      showNoData: false, //显示无数据的页面
    }
  },
  computed: {
    ...mapState(['book', 'exp', 'uid']),
  },
  methods: {
    clearInput() {
      this.search_word = '';
    },
    delHis() {
      //清除历史
      this.bookHis = [];
    },
    //搜索记录本。
    searchBook() {
      // //初始化，拿数据
      // this.bookData = [{
      // 	name: 1 + 'book',
      // 	id: 1
      // }, {
      // 	name: 2 + 'book',
      // 	id: 2
      // }, {
      // 	name: 3 + 'book',
      // 	id: 3
      // }, {
      // 	name: 4 + 'book',
      // 	id: 4
      // }, {
      // 	name: 5 + 'book',
      // 	id: 5
      // }, {
      // 	name: 6 + 'book',
      // 	id: 6
      // }];
      this.getList();
    },
    searchHis(item) {
      this.search_word = item;
      this.searchBook();
    },
    getList() {

      var self = this;
      //没有关键字的时候不搜索。
      if (!this.search_word) {
        this.bookData = [];

        return;
      }
      self.showNoData = false;
      this.leading = true;
      self.bookData = [];
      ajax({
        url: 'http://dev.wechat.integle.com/eln/book-list',
        method: 'post',
        data: {
          uid: this.uid,
          search_word: this.search_word
        },
        callback: function(data) {

          self.loading = false;
          if (1 == data.status) {
            self.bookData = data.data.booklist;
            if (self.bookData.length == 0) {
              self.showNoData = true;
            }
          }

        }
      })
    },
    chooseBook(item) {
      this.$store.commit('chooseBook', item);
      this.$router.replace('/expPage/' + item.id);
    },
    goBack() {
      this.$router.go(-1);
    },
    getHisWord() {

    },
    saveHisWord() {

    }
  },
  components: { noData },
  created() {
    // 进入页面的时候从local拿存储的最近历史
    this.bookHis = ['甲23苯',
      '苏格工在',
      '甲苯甲苯甲苯',
      '甲苯甲苯甲苯',
      '甲苯甲苯甲苯',
      '甲苯甲苯甲苯',
      '甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯',
      '甲苯甲苯甲苯',
    ];
    this.showNoData = false;
    this.search_word = '';
  }
}

</script>
<style scoped>
.search-wrap {
  top: 50px;
  height: calc(100% - 50px);
}

</style>
