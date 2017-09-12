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
			if(1 != data.status){
				data.message && alert(data.message);
			}
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
//ios下面　new Date('2011-12-11 12:33:11')这种会出错。需要做兼容处理
export function calDate(strdate){
    var arr = strdate.split(/[- : \/]/);  
    var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);  
    return date;

}