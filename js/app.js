const cardsContainer = document.getElementById('container');
const template = document.getElementById('templateCard').content;
const fragment = document.createDocumentFragment();
const select = document.querySelector('#region');


document.addEventListener('DOMContentLoaded',() => {
    fetchData();
})

const getOption = () =>{
    if (localStorage.getItem('option')) {
        select.value = localStorage.getItem('option')
        select.addEventListener('change',() => setTimeout(()=>{
            document.location.reload(true)
        }))
    }
    select.addEventListener('change',() => localStorage.setItem('option',select.value))
}

const fetchData = async () => {
    try {
        const res = await fetch('../../api.json')
        const data = await res.json()
        cardFilter(data)
    } catch (error) {
        console.log(error)
    }
}
const cardFilter = data =>{
    getOption()
    let type = select.value
    let playersFilter
    switch (type) {
        case "sa":
            playersFilter = data.filter(player => player.region === "sa")
            return cardBuilder(playersFilter)
        case "eu":
                playersFilter = data.filter(player => player.region === "eu")
                return cardBuilder(playersFilter)
        case "af":
            playersFilter = data.filter(player => player.region === "af")
            return cardBuilder(playersFilter)
        default:
            return cardBuilder(data)
    }
}

const cardBuilder = data => {
    data.forEach(player => {
        template.querySelector('img').setAttribute("src", player.image)
        template.querySelector('img').setAttribute("alt", player.name)
        template.querySelector('h4').textContent = player.name.toUpperCase()
        template.querySelector('.position').textContent = `Position: ${player.position.toUpperCase()}`
        template.querySelector('.country').textContent = `Country: ${player.country.toUpperCase()}`
        template.querySelector('.birth').textContent = `Date of Birth: ${player.birth}`
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    cardsContainer.appendChild(fragment)
}
