<template>
	<div>
		<route v-for="(route,index) in routes" 
			   v-bind:class="{ borderedRoute : (elIndexDrawn==index)?true:false}"
			   v-on:draw="drawRoute(index)">
			{{route.title}}
		</route>
	</div>
</template>

<script>
import route from './route.vue'
let RegionalCenter = require('../js/regionalCenter.js')
let createCORSRequest = require('../js/createCORSrequest.js')
export default{
	data(){
		return{
			routes:[],
			elIndexDrawn:-1
		}
	},
	created:function(){
		  let self=this;
		  this.loadRegionalCenters().then(
	        response => {
	        	for(let city of response){
	    			let regCenter = new RegionalCenter(city.title,city.lat,city.lng);
	    			self.routes.push(regCenter);
	    		}
	        },
	        error => alert(`${error}`)
		  );
		  
	},
	methods:{
		drawRoute:function(index){
			this.elIndexDrawn = index;
			this.$emit('drawDirection',index);
		},
		loadRegionalCenters(){
		  return new Promise(function(resolve,reject){
			  const url = 'http://test.bitmark.com.ua/route';
			  const xhr = createCORSRequest('GET', url);
			  /*let xhr = new XMLHttpRequest();
			  xhr.open('GET', url, true);*/
			  if (!xhr) {
			    reject(new Error('CORS не поддерживается'));
			  }
			  
			  // Response handlers.
			  xhr.onload = function() {
				if(this.status == 200){
				  let response = JSON.parse(this.responseText);
				  let cities = response.data.cities;
				  resolve(cities);
				}else{
				  let error = new Error(this.statusText);
				  error.code = this.status;
				  reject(error);
				}
			  };
			
			  xhr.onerror = function() {
				  reject(new Error('Произошла ошибка при выполнение запроса на получение региональных центров'));
			  };
			
			  xhr.send();
		  });
		}
	},
	components:{route}
}
	
</script>
<style>
	.borderedRoute{
		border:1px solid blue;
		background-color: blue;
	}
</style>