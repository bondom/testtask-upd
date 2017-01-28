<template>
    <div :id="id"></div>
</template>
<script>
    export default{
        props: ['id'],
        data(){
            return {
                map: null,
                directionsService: null
            }
        },
        mounted: function () {
            this.initMap();
        },
        created(){
            Event.$on('createRouteInMap', (route) => this.createRoute(route))
        },
        methods: {
            initMap() {
                let ukraine = new google.maps.LatLng(50.483396, 30.430394);
                this.map = new google.maps.Map(document.getElementById('map'), {
                    center: ukraine,
                    zoom: 8
                });
                this.directionsService = new google.maps.DirectionsService();
            },
            createRoute(route){
                //приклад як може малюватись маршрут, не робочий
                //винеси відмалювання маршруту в окрему функцію
                this.directionsService.route({
                    origin: new google.maps.LatLng(route.from.lat, route.from.lng),
                    destination: new google.maps.LatLng(route.to.lat, route.to.lng),
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result) {
                    let directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsRenderer.setMap(map);
                    directionsRenderer.setDirections(result);
                });
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