<template>
    <div>
        <li>
            <a @click="createRouteInMap">
                {{route.title}}
            </a>
        </li>
    </div>
</template>
<script>
    export default{
        props: ['route'],
        methods: {
            createRouteInMap(){
                Event.$emit('createRouteInMap', this.route)
            }
        }
    }
</script>
<style>
    li {
        display: inline-block;
        margin-right: 10px;
    }
</style>