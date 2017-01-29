<template>
    <div class="routes">
        <route v-for="route in routes" :route="route"></route>
    </div>
</template>

<script>
    import route from './route.vue'
    export default{
        components: {route},
        data(){
            return {
                cities: [],
                routes: []
            }
        },
        mounted() {
            this.prepareComponent();
        },
        created(){
            Event.$on('autocompliteAddress', (address) => this.createRoutes(address));
            Event.$on('selectRoute', (title) => this.selectRoute(title));
        },
        methods: {
            prepareComponent() {
                this.loadRegionalCenters();
            },
            loadRegionalCenters(){
                this.$http.get('http://test.bitmark.com.ua/route')
                    .then(response => {
                        this.cities = response.data.data.cities;
                    })
                    .catch(response => {
                        console.log(response);
                    });
            },
            createRoutes(from){
                this.routes = this.cities.map(to => {
                    return {
                        title: 'C ' + from.title + ' В ' + to.title,
                        from: {
                            lat: from.lat,
                            lng: from.lng
                        },
                        to: {
                            lat: to.lat,
                            lng: to.lng
                        }
                    }
                });
            },
            selectRoute(title){
                this.$children.forEach(routeEl=>{
                    routeEl.isSelected = (title==routeEl.route.title)?true:false;
                })
            }
        }
    }
</script>
<style>
    .routes{
        margin:10px 0px 20px 0px;
    }
</style>