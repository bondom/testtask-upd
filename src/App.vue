<template>
    <div id="app">
        <autocomplete id="departure"></autocomplete>
        <route-list></route-list>
        <my-map id="departure"></my-map>
    </div>
</template>

<script>
    import myMap from './components/myMap.vue'
    import autocomplete from './components/autocomplete.vue'
    import routeList from './components/route-list.vue'
    export default {
        name: 'app',
        components: {myMap, autocomplete, routeList},
    }
</script>