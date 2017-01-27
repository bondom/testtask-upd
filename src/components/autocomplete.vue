<template>
	<input type="text" id="departure">
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			initAutoComplete: function(map) {
	              let input = (document.getElementById("departure"));
				  let autocomplete = new google.maps.places.Autocomplete(input);
				  console.log(map);
				  autocomplete.bindTo('bounds',map);
	            }
	        }
		}
	
</script>
<style>
	#departure{
		width:40%;
		border:1px solid black;
	}

</style>