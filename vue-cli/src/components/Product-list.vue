<template>
    <div>
        <transition-group name="fade" tag="div" @beforeEnter="before" @enter="enter" @leave="leave">
            <div class="row mb-3 align-items-center" v-for="(item, index) in filterProducts" :key="item.id" :data-index="index">
                <div class="col-1 m-auto">
                    <button class="btn btn-info" @click="$parent.$emit('add-item', item)">+</button>
                </div>
                <div class="col-sm-4">
                    <img :src="item.image" :alt="item.name" class="img-fluid d-block">
                </div>
                <div class="col">
                    <h3 class="text-info">{{ item.name }}</h3>
                    <p class="mb-0">{{ item.description }}</p>
                    <div class="h5 float-right">
                        <PriceItems  :value=Number(item.price)
                                ></PriceItems>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>
<script>
import PriceItems from './Price-Items.vue';
export default{
    name: "Product-list",
    components: {
        PriceItems
    },
    props: ["products", "maximum"],
    computed: {
        filterProducts: function(){
            let max = this.maximum;
            return this.products.filter(item => {
                return item.price <= max
            })
        }
    },
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



}

</script>
