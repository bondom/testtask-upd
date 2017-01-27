<template>
	<div>
		<li><a href="#" v-on:click="$emit('draw')"><slot></slot></a></li>
	</div>
</template>

<script>
export default{
	data(){
		return{
		
		}
	}
}
	
</script>
<style>
	li{
		display: inline-block;
		margin-right:10px;
	}
</style>