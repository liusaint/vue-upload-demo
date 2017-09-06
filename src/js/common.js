import Vue from 'vue'

//公共的ajax方法
export function ajax(params) {

	Vue.http.options.headers = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
	}

	Vue.http.options.emulateJSON = true
	Vue
		.http({
			method: params.method || 'get',
			url: params.url,
			method: params.method,
			body: params.data || {}
		})
		.then((response) => {
			let data = response.data
			params.callback(data)
		}, (response) => {

		})
}

//本地存储
export function localSave(key, val) {
	try {
		//读取存储
		if (arguments.length == 1) {
			return localStorage.getItem(key);
		} else {
			//设置存储
			localStorage.setItem(key, val);
		}
	}catch(err){
		return '';
	}

}