<template>
    <div>
        <h1>My Shop</h1>
        <NavbarGeneral :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal" @toggle-slide="toggleSliderStatus" @delete-item="deleteItem"/>
        <priceSlider :sliderStatus="sliderStatus"></priceSlider>
        <ProductList :products="products" :maximum="maximum" @add-item="addItem"/>
    </div>
</template>

<script>
import ProductList from './Product-list.vue';
import PriceSlider from './priceSlider.vue';
import NavbarGeneral from './NavbarGeneral.vue';
    export default {
        name: 'ProductsItem',
        components: {
            ProductList,
            PriceSlider,
            NavbarGeneral
        },
        props:[
            'products',
            'maximum',
            'cart',
            'cartQty',
            'cartTotal',
            'sliderStatus',
  
            
        ],
        methods:{
            toggleSliderStatus(){
                this.$emit('toggle-slide');
            },
            addItem: function(product){
                this.$emit('add-item', product);
            },
            deleteItem: function(index){
                this.$emit('delete-item', index);
            }
        }
    }   
</script>