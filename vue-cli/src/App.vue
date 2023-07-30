<template>
  <div id="app" class="container mt-5">
    <!-- <h1>My Shop</h1>
    <NavbarGeneral :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal" @toggle="toggleSliderStatus" @delete="deleteItem"/>
    <priceSlider :sliderStatus="sliderStatus" :maximum.sync="maximum"></priceSlider>
    <ProductList :products="products" :maximum="maximum" @add="addItem"/> -->
    <!-- <CheckoutItems :cart="cart" :cartTotal="cartTotal" @add-item="addItem" @delete-item="deleteItem" :cartQty="cartQty" /> -->
    <router-view 
    :cart="cart"
    :cartQty="cartQty"
    :cartTotal="cartTotal"
    :maximum.sync="maximum"
    :products="products"
    :sliderStatus="sliderStatus"
    @toggle-slide="toggleSliderStatus"
    @add-item="addItem"
    @delete-item="deleteItem"></router-view>
  </div>
</template>

<script>
// import ProductsItem from './components/ProductsItem.vue';
// import CheckoutItems from './components/CheckoutItems.vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import ProductList from './components/Product-list.vue';
// import PriceSlider from './components/priceSlider.vue';
// import NavbarGeneral from './components/NavbarGeneral.vue';
export default {
  name: 'App',
  data:function() {
    return {
      maximum: 100,
      products:[],
      cart:[],
      sliderStatus: false    
    }  
  },
  // components: {
  //   ProductsItem,
  //   CheckoutItems
  //   // FontAwesomeIcon,
  //   // ProductList,
  //   // PriceSlider,
  //   // NavbarGeneral
  // },
  computed: {
    cartTotal: function () {
            let sum = 0;
            for (let key in this.cart) {
                sum = sum + (this.cart[key].product.price * this.cart[key].qty);
            }
            return sum;
        },
        cartQty: function () {
            let qty = 0;
            for (let key in this.cart) {
                qty = qty + this.cart[key].qty;
            }
            return qty;
        }
  },
  methods: {
    addItem: function(product) {
            let productIndex;
            let productExist = this.cart.filter(function(item, index) {
                if (item.product.id == Number(product.id)) {
                    productIndex = index;
                    return true;
                } else {
                    return false;
                }
            });
            if (productExist.length) {
                this.cart[productIndex].qty++;
            } else {
                this.cart.push({product: product, qty: 1});
            }
        },
        deleteItem: function(id) {
            if(this.cart[id].qty > 1) {
                this.cart[id].qty--;
            } else {
                this.cart.splice(id, 1);
            }
        },
        toggleSliderStatus: function() {
            this.sliderStatus = !this.sliderStatus;
        }
  },
  mounted:function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(res => res.json())
        .then(data =>{
            this.products=data;
        });
    },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
