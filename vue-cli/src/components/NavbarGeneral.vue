<template>
    <nav class="navbar navbar-light fixed-top">
        <div class="navbar-text ml-auto d-flex">
            <button class="btn btn-sm btn-outline-success" @click="$emit('toggle')">
                <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
            </button>
            <div class="dropdown" v-if="cart.length > 0">
                <button class="btn btn-success btn-sm dropdown-toggle" id="dropdownCart" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="badge badge-pill badge-light">{{ cartQty }}</span>
                    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                    <PriceItems :value="Number(cartTotal)"></PriceItems>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownCart">
                    <div v-for="(item, index) in cart" :key="index">
                        <div class="dropdown-item-text text-nowrap text-right">
                            <span class="badge rounded-pill bg-warning align-text-top mr-1">
                                {{ item.qty }}
                            </span>
                            {{ item.product.name }}
                            <b>{{ item.qty * item.product.price | currencyFormat }}</b>
                            <a href="#" class="badge pill bg-danger text-white" @click.stop="$emit('delete', index)" style="text-decoration: none;">-</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PriceItems from './Price-Items.vue';
export default {
    name: 'NavbarGeneral',
    components: {
        PriceItems,
        FontAwesomeIcon
    },
    props:['cart', 'cartQty', 'cartTotal'],
    filters:{
        currencyFormat: function(value){
            return 'Rp.'+ Number.parseFloat(value).toFixed(2) ;
        }
    },
    computed: {
        
    }
}
</script>