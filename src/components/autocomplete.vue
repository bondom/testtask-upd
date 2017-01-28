<template>
    <input type="text" :id="id">
</template>

<script>
    export default{
        props: ['id'],
        data(){
            return {}
        },
        mounted() {
            this.initAutoComplete();
        },
        methods: {
            initAutoComplete(){
                let input = document.getElementById(this.id);
                let options = {
                    types: ['geocode'],
                    componentRestrictions: {country: 'ua'}
                };
                this.autocomplite = new google.maps.places.Autocomplete(input, options);
                this.autocomplite.addListener('place_changed', this.pipeAddress);
            },
            pipeAddress(){
                let city = this.autocomplite.getPlace().address_components.filter(function (address) {
                    return address.types.indexOf("locality") > -1;
                });
                let from = {
                    lat: this.autocomplite.getPlace().geometry.location.lat(),
                    lng: this.autocomplite.getPlace().geometry.location.lat(),
                    title: city[0].short_name
                };
                Event.$emit('autocompliteAddress', from);
            }
        }
    }
</script>
<style>
    #departure {
        width: 40%;
        border: 1px solid black;
    }
</style>