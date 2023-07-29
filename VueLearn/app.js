const dataProduct = {
    maximum:500,
    products:null
    //     {
    //         id: 1,
    //         name : "Koceng oren",
    //         image : "https://imgx.sonora.id/crop/102x68:921x616/700x465/photo/2023/02/25/1-kucing-orenjpeg-20230225034032.jpeg",
    //         price : 10000,
    //         description : "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
    //     },
    //     {
    //         id : 2,
    //         name : 'iphone',
    //         price : 1000,
    //         image : 'https://img.antaranews.com/cache/800x533/2022/09/08/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg.webp',
    //         description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
    //     },
    //     {
    //         id : 3,
    //         name : 'samsung',
    //         price : 500,
    //         image : 'https://images.samsung.com/id/smartphones/galaxy-s23/buy/kv_combo_PC_v2.jpg',
    //         description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
    //     }
    // ]
};

Vue.component('price', {
    data: function () {
        return {
            // prefix: 'Rp.',
            // precision: 2,
            // value: 34
        }
    },
    props: {
        value: Number,
        prefix: {
            type: String,
            default: 'Rp'
        },
        precision: {
            type: Number,
            default: 2
        }
    },
    
    template: '<span>{{ this.prefix + Number.parseFloat(this.value).toFixed(this.precision) }}</span>'
});
Vue.component('product-list', {
    props: ['products', 'maximum'],
    methods: {
        before: function (el) {  
            el.className='d-none';
        },
        enter:function (el) {
            let delay = el.dataset.index * 10;
            setTimeout(() => {
                el.className='row d-flex mb-3 align-items-center animate__animated animate__fadeInRight';
            }, delay);
          },
        leave:function (el) {
            let delay = el.dataset.index * 10;
            setTimeout(() => {
                el.className='row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight';
            }, delay);
        },
    },
    template: `
        <transition-group name="fade" tag="div" @beforeEnter="before" @enter="enter" @leave="leave">
            <div class="row d-none mb-3 align-items-center" v-for="(item, index) in products" :key="item.id" v-if="item.price <= Number(maximum)" :data-index="index">
                <div class="col-1 m-auto">
                    <button class="btn btn-info" @click="$emit('add', item)">+</button>
                </div>
                <div class="col-sm-4">
                    <img :src="item.image" :alt="item.name" class="img-fluid d-block">
                </div>
                <div class="col">
                    <h3 class="text-info">{{ item.name }}</h3>
                    <p class="mb-0">{{ item.description }}</p>
                    <div class="h5 float-right">
                        <price  :value=Number(item.price)
                                :precision="2"></price>
                    </div>
                </div>
            </div>
        </transition-group>
    `
});
const app = new Vue({
    el:'#app',
    data : {
        maximum:100,
        products: null,
        cart:[],
        style:{
            label:['font-weight-bold','mr-2'],
            sliderStatus: false
        },
        
    },
    mounted:function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(res => res.json())
        .then(data =>{
            this.products=data;
        });
    },
    filters:{
        currencyFormat: function(value){
            return 'Rp.'+ Number.parseFloat(value).toFixed(2) ;
        }
    },
    computed:{
        sliderState:function(){
            return this.style.sliderStatus ? 'd-flex' : 'd-none';
        },
        cartTotal: function () {
            let sum = 0;
            for (key in this.cart) {
                sum = sum + (this.cart[key].product.price * this.cart[key].qty);
            }
            return sum;
        },
        cartQty: function () {
            let qty = 0;
            for (key in this.cart) {
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
        before: function (el) {  
            el.className='d-none';
        },
        enter:function (el) {
            let delay = el.dataset.index * 10;
            setTimeout(() => {
                el.className='row d-flex mb-3 align-items-center animate__animated animate__fadeInRight';
            }, delay);
          },
        leave:function (el) {
            let delay = el.dataset.index * 10;
            setTimeout(() => {
                el.className='row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight';
            }, delay);
        }
    },

});