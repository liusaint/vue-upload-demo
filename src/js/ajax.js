import Vue from 'vue'


export default function(params) {

	Vue.http.options.headers = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
	}
console.log(params.data);
	Vue.http.options.emulateJSON = true
	Vue
		.http({
			method: params.method || 'get',
			url: params.url,
			method: params.method,
			params: params.data || {}
		})
		.then((response) => {
			let data = response.data
			params.callback(data)
		}, (response) => {
			// error callback
		})
}

