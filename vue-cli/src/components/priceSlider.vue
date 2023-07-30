<template>
    <transition name="custom" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutRight">
        <div v-if="sliderStatus">
            <div class="align-items-center" :class="sliderState">
                <label for="" class="font-weight-bold mx-2">Max</label>
                <input type="number" name="maxPrice" id="" class="form-control mx-2" v-model="maxAmount" @change="$emit('update:maximum',maxAmount)" style="
                width:100px;text-align:center">
                <input type="range" name="range" id="" class="custom-range" v-model="maxAmount" @input="$emit('update:maximum',maxAmount)" min="0" max="1000"
                style="width: 1000px;">
                <!-- <label for="" class="font-weight-bold mr-2">Name Product</label> -->
            </div> 

        </div>
    </transition>
</template>

<script>

export default{
    name: 'PriceSlider',
    props: ['sliderStatus', 'maximum'],
    data:function(){
        return{
            maxAmount:100
        }
    },
    computed:{
        sliderState:function(){
            return this.sliderStatus ? 'd-flex' : 'd-none';
        },
    }

}
</script>
