<template>
	<div id="map">Heey</div>
</template>

<script>
let map;
let directionsService;
let marker;
	export default{
		data(){
			return{
				map: map,
				//drawDirection:drawDirection
			}
		},
		mounted: function() {
		     this.initMap();
		},
		methods:{
			initMap() {
	                directionsService = new google.maps.DirectionsService;
					let directionsDisplay = new google.maps.DirectionsRenderer;
					let ukraine = new google.maps.LatLng(50.483396, 30.430394);
					let mapCanvas = document.getElementById("map");
				  	let mapOptions = {
					    center: ukraine, 
					    zoom: 5
				  	}
				  	map = new google.maps.Map(mapCanvas, mapOptions);
				  	console.log(map);
	  				directionsDisplay.setMap(map);
					marker = new google.maps.Marker({position:ukraine});
  					marker.setMap(map);
  					this.$emit("mapCreated",map);
	            }
	        },
	        drawDirection(lat,lng){
			 directionsService.route({
			    origin: marker.getPosition().lat()+", "+marker.getPosition().lng(),
			    destination: lat+", "+lng,
			    travelMode: google.maps.TravelMode.DRIVING
			  }, function(response, status) {
			    if (status === google.maps.DirectionsStatus.OK) {
			      directionsDisplay.setDirections(response);
			    } else {
			      if(status.localeCompare("ZERO_RESULTS")==0){
			    	  window.alert('Невозможно добраться машиной.');
			      }else{
			    	  window.alert('Маршрут не удалось найти в связи с: ' + status);
			      }
			    }
			  });
			}
	}
global.map = map;	
</script>
<style>
	#map{
		width:100%;
		height:500px;
		border:1px solid black;
	}

</style>