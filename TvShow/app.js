const form = document.querySelector('#search-form');



form.addEventListener('submit',
async (e) =>{
    e.preventDefault();
    const keyword =form.elements.query.value;
    document.querySelectorAll('img').forEach((img) =>img.remove());
    const config ={
        params:{
            q: keyword
        }
    };
    const res = await axios.get(`http://api.tvmaze.com/search/shows`,config);
    console.log(res.data);
    getImages(res.data);
    form.elements.query.value='';

}
);

const getImages = (shows)=>{
    // const img= document.querySelectorAll('img');
    // img.remove();
    for (let i of shows){
        if (i.show.image) {
            const img = document.createElement('img');
            img.src = i.show.image.medium;
            document.body.append(img);
        }
    }
};