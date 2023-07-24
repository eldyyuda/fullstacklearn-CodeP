// const req = new XMLHttpRequest();
// let data;       
// req.onload = function(){
//     data = JSON.parse(req.responseText);
//     console.log(data);
// };

// req.onerror = function(){
//     console.log('Error :',this);
// };

// req.open('GET','https://swapi.dev/api/people/2');

// req.send();


const jokeUl = document.querySelector('#joke');
const btnGenerate = document.querySelector('#btnGenerate');

const generateJoke = async()=>{
    const data = await getJokes();
    const newLI= document.createElement('LI');
    newLI.append(data);
    jokeUl.append(newLI);
    console.log(data);

}



const getJokes = async ()=>{
    try {
        const config={
            headers:{
                Accept: 'application/json'
            }
        };
        const res = await axios.get('https://icanhazdadjoke.com/',config);
        return res.data.joke;
    } catch (error) {
        return "No Joke For U Bro!!";
    }
}

btnGenerate.addEventListener('click',generateJoke);