<template>
  <div>
    <div class="top-bar bgwhite">
      <i class="eln-ico left-arrow" @click="goBack"></i>
      <div class="input-wrap after-ico">
        <input type="text" placeholder="请输入记录本名称" v-model="search_word" >
        <i class="del-input eln-ico" @click="clearInput" v-show="search_word"></i>
      </div>
      <span class="right-search-txt" @click="searchBook">搜索</span>
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
        <span class="text">{{calBookName(item)}}</span>
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
      //删除local本地存储
      localSave('bookHis', '');
      this.bookHis = [];
    },
    //搜索记录本。
    searchBook() {
      this.getList();
      this.saveHisWord();
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
        url: '/eln/book-list',
        method: 'post',
        data: {
          uid: this.uid,
          search_word: this.search_word
        },
        callback: function(data) {

          self.loading = false;



          if (1 == data.status) {
            var parsedData = JSON.parse(data.data);
            self.bookData = parsedData.booklist;
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
      var bookHis = localSave('bookHis');
      if (!bookHis) {
        bookHis = [];
      }else{
      	bookHis = JSON.parse(bookHis);
      }      
      this.bookHis = bookHis;
    },
    saveHisWord() {
      if (!this.search_word) {
        return;
      }
      var bookHis = localSave('bookHis');
      if (!bookHis) {
        bookHis = [];
      } else {
        bookHis = JSON.parse(bookHis);
      }
      //不在里面
      if (bookHis.indexOf(this.search_word) < 0) {
        bookHis.push(this.search_word);
        localSave('bookHis', JSON.stringify(bookHis));
      }
      this.bookHis = bookHis;
    },
    //计算记录本名
    calBookName(book) {
      var res = 'N' + (new Date(book.create_time)).getFullYear().toString().slice(2) + book.code + '（' + book.name + '）';
      //把计算后的结果保存一下。
      book.caled_name = res;
      return res;
    },
  },
  components: { noData },
  created() {
    // 进入页面的时候从local拿存储的最近历史
    this.getHisWord();
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
