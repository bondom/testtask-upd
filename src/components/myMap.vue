<template>
    <div :id="id"></div>
</template>
<script>
    export default{
        props: ['id'],
        data(){
            return {
                map: null,
                directionsService: null,
                directionsRenderer:null
            }
        },
        mounted(){
            this.initMap();
        },
        created(){
            Event.$on('createRouteInMap', (route) => this.createRoute(route));
            Event.$on('eraseRoutesFromMap', () => this.eraseRoutesFromMap());
        },
        methods: {
            initMap() {
                let ukraine = new google.maps.LatLng(50.483396, 30.430394);
                this.map = new google.maps.Map(document.getElementById('map'), {
                    center: ukraine,
                    zoom: 8
                });
                this.directionsService = new google.maps.DirectionsService();
                this.directionsRenderer = new google.maps.DirectionsRenderer();
                this.directionsRenderer.setMap(this.map);
            },
            createRoute(route){
                this.directionsService.route({
                    origin: new google.maps.LatLng(route.from.lat, route.from.lng),
                    destination: new google.maps.LatLng(route.to.lat, route.to.lng),
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, (result) => this.renderDirection(result));
            },
            renderDirection(direction){
                this.directionsRenderer.setDirections(direction);
            },
            eraseRoutesFromMap(){
                this.directionsRenderer.setDirections({routes:[]});  
            }
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 500px;
        border: 1px solid black;
    }
</style>