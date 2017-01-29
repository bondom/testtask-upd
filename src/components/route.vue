<template>
    <li>
        <a @click="createRouteInMap" :class="{isSelected}" href="#">
            {{route.title}}
        </a>
    </li>
</template>
<script>
    export default{
        props: ['route'],
        data(){
            return{
                isSelected:false
            }
        },
        methods: {
            createRouteInMap(){
                Event.$emit('createRouteInMap', this.route);
                Event.$emit('selectRoute', this.route.title);
            }
        }
    }
</script>
<style>
    li {
        display: inline-block;
        margin-right: 10px;
    }
    .isSelected {
        border: 1px solid blue;
        background-color: blue;
        color:white;
        text-decoration: none;
    }
</style>