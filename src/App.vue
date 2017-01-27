<template>
  <div id="app">
  	<autocomplete></autocomplete>
  	<route-list v-on:drawDirection="drawDirection"></route-list>
    <myMap v-on:mapCreated="createAutocomplete"></myMap>
  </div>
</template>

<script>
import myMap from './components/myMap.vue'
import autocomplete from './components/autocomplete.vue'
import routeList from './components/route-list.vue'
export default {
  name: 'app',
  data () {
    return {
    	
    }
  },
  components:{myMap,autocomplete,routeList},
  methods: {
  	drawDirection(index){
		alert("draw route for index:"+index);
 	},
 	createAutocomplete(map){
 		//this.$emit('create-auto');
 		let input = (document.getElementById("departure"));
	    let autocomplete = new google.maps.places.Autocomplete(input);
	    console.log(map);
	    autocomplete.bindTo('bounds',map);
 	}
  }
}
  
 
</script>

<style>

</style>
