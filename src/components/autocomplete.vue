<template>
    <input type="text" :id="id">
</template>

<script>
    export default{
        props: ['id'],
        data(){
            return {
                autocomplite:null
            }
        },
        mounted() {
            this.initAutoComplete();
        },
        methods: {
            initAutoComplete(){
                let input = document.getElementById(this.id);
                let options = {
                    //если только города доступны, можно types:['(cities)'], 
                    //тогда нижняя проверка будет ненужна
                    types: ['geocode'],
                    componentRestrictions: {country: 'ua'}
                };
                this.autocomplite = new google.maps.places.Autocomplete(input, options);
                this.autocomplite.addListener('place_changed', this.pipeAddress);
            },
            pipeAddress(){
                if(!this.isChoosenFromList()){
                    alert("Выберите пункт отправления из списка");
                    return;
                }
                let city = this.autocomplite.getPlace().address_components.filter(
                    (address) => {return address.types.indexOf("locality") > -1;});
                //Улицы, станции и т.д, находящиеся в городах будут валидны 
                if(city[0]===undefined){
                    alert("Пожалуйста, выберите город");
                    return;
                }
                let from = {
                    lat: this.autocomplite.getPlace().geometry.location.lat(),
                    lng: this.autocomplite.getPlace().geometry.location.lng(),
                    title: city[0].short_name
                };
                Event.$emit('autocompliteAddress', from);
                Event.$emit('eraseRoutesFromMap');
            },
            isChoosenFromList(){
                return (this.autocomplite.getPlace().geometry === undefined)?false:true;
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