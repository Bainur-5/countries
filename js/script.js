const $container = document.querySelector('.cardsContainer')
const $all = document.querySelector('.all')
const $asia = document.querySelector('.asia')
const $europ = document.querySelector('.europ')
const $americ = document.querySelector('.americ')
const $ocean = document.querySelector('.ocean')
const $afric = document.querySelector('.afric')
const $polar = document.querySelector('.polar')
const $search = document.querySelector('.searchCoun')
const $searchCap = document.querySelector('.searchCap')
const $menuBtn = document.querySelector('.menuBtn')
const $nav = document.querySelector('.nav')
const countries = {
    name: 'name',
    all: 'all',
    capital: 'capital'
}
const getReq = (query, cb) =>{
    const countURL = 'https://restcountries.eu/rest/v2'
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${countURL}/${query}`)
    xhr.addEventListener('load', () =>{
        const response = JSON.parse(xhr.response)
        cb(response)
    })
    xhr.addEventListener('error', err =>{
        console.log(err);
    })
    xhr.send()
}
window.addEventListener('load', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => cardsTodo(item)).join('')
        $container.innerHTML = temp
    });
})
$search.addEventListener('input', e =>{
    $searchCap.value = ""
    const value = e.target.value
    if(!value){
        window.location.reload()
    }else{
        console.log(value);
        setTimeout(() =>{
            getReq( `${countries.name}/${value}`, res =>{
                console.log(res);
                temp = res.map(item => cardsTodo(item)).join('')
                $container.innerHTML = temp;
            })
        },50)
    }
})
$searchCap.addEventListener('input', e =>{
    $search.value = ""
    const value = e.target.value
    if(!value){
        window.location.reload()
    }else{
        console.log(value);
        setTimeout(() =>{
            getReq( `${countries.capital}/${value}`, res =>{
                console.log(res);
                temp = res.map(item => cardsTodo(item)).join('')
                $container.innerHTML = temp;
            })
        },50)
    }
})
$all.addEventListener('click', () =>{
    window.location.reload()
})
$afric.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Africa'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
$asia.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Asia'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
$americ.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Americas'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
$europ.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Europe'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
$afric.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Africa'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
$polar.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Polar'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
$ocean.addEventListener('click', () =>{
    getReq(countries.all, res =>{
        temp = res.map(item => {
            if(item.region == 'Oceania'){
                return cardsTodo(item)                
            }
        }).join('')
        $container.innerHTML = temp
    })
})
function cardsTodo(item){
    const name = item.name
    return`<div onclick="cont_cards('${item.flag}')" class="cont_count">
        <div class="count_flag" style="background: url('${item.flag}') center/cover no-repeat;">
        <div class="count_hover"></div>
        </div>
        <div style="text-align:center">
            <h3>${name}</h3>
            <p><b>Capital: </b>  ${item.capital}</p>
        </div>
    </div>`
}
function cont_cards(id){
    getReq(countries.all, res =>{
        const temp = res.map(item =>{
            if(id == item.flag){
                console.log(id);
                console.log(item);
                $container.innerHTML = cardTodo(item)
            }
        }).join('')
    })
}
function cardTodo(item){
    return`    <div class="cont_card">
        <div class="card">
            <div class="card_flag"  style="background: url('${item.flag}') center/cover no-repeat;">
            </div>
            <h1>${item.name}</h1>
            <div class="content_count">
                <p><b>Capital: </b> ${item.capital}</p>
                <p><b>Area: </b> ${item.area}</p>
                <p><b>Region: </b> ${item.region}</p>
                <p><b>Population: </b> ${item.population}</p>
                <p><b>Borders: </b> ${item.borders}</p>
                <p><b>Languages: </b> ${item.languages[0].name}</p>
                <p><b>Alpha-3 code: </b> ${item.alpha3Code}</p>
                <p><b>Subregion: </b> ${item.subregion}</p>
                <p><b>Timezone: </b> ${item.timezones}</p>
                <p><b>Main domain: </b> ${item.topLevelDomain}</p>
            </div>
        </div>
    </div>`
}