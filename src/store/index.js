import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
	choosedImgArr:[],//选中的图片,
	book:{},//选中的记录本
	exp:{},//选中的实验
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	addImg(state,img){
		state.choosedImgArr.push(img);
	},
	//选择记录本
	chooseBook(state,book){
		state.book = book;
	},
	//选择实验
	chooseExp(state,exp){
		state.exp = exp;
	}
}

const actions = {

}

export default new Vuex.Store({
	state,
	mutations,
})