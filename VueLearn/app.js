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

const app = new Vue({
    el:'#app',
    data : {
        maximum:1,
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
    computed:{
        sliderState:function(){
            return this.style.sliderStatus ? 'd-flex' : 'd-none';
        }
    },
    methods: {
        addItem: function(product){
            this.cart.push(product);
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