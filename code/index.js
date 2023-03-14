/*
Зробити програму з навігаційним меню яке буде показувати один з варіантів. 

Курс валют НБУ з датою на який день, 

героїв зоряних війн, 

список справ з https://jsonplaceholder.typicode.com/ 
//виводити які з можливістю редагування при натискані 
*/

const req = async (url) => {
    document.querySelector(".box_loader").classList.add("show")
    const data = await fetch(url);
    return await data.json();
}

const nav = document.querySelector(".nav")
    .addEventListener("click", (e) => {
        if (e.target.dataset.link === "nbu") {
            req("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
                .then((info) => {
                    show(info)
                })
        } else if (e.target.dataset.link === "star") {
            // вивести всі 60 планет з https://swapi.dev/api/planets/
            getPlanets('https://swapi.dev/api/planets/');
            
        } else if (e.target.dataset.link === "todo") {
            req("https://jsonplaceholder.typicode.com/todos")
            .then((info) => {
                show(info)
            })
        } else {

        }
    })

function getPlanets(url, rerequest = 0) {
    req(url)
    .then((info) => {
        show(info.results, rerequest);
        if (info.next) getPlanets(info.next, rerequest + 1);
    })
}

function show(data = [], rerequest = 0) {
    if (!Array.isArray(data)) {
        hideLoader();
        alert("Some mistake");
        return;
    }
    const tbody = document.querySelector("tbody");
    if (rerequest===0) tbody.innerHTML = "";
    const newArr = data.map(({txt, rate, exchangedate, title, completed, name, diameter, population }, i) => {
        return {
            id: i + 1 + 10 * rerequest,
            name : txt || title || name,
            info1 : rate || completed || showInfo('diameter', diameter),
            info2 : exchangedate || showInfo('population', population) || "тут пусто"
        }
    });

    newArr.forEach(({ name, id, info1, info2 }) => {
        tbody.insertAdjacentHTML("beforeend", `
        <tr> 
        <td>${id}</td>
        <td>${name}</td>
        <td>${info1}</td>
        <td>${info2}</td>
        </tr>
        `)
    })
    hideLoader();
}

function showInfo(infoName, infoValue){
    if (!infoValue) return false
    else return infoName + ': ' + infoValue;
}

function hideLoader(){
    document.querySelector(".box_loader").classList.remove("show")
}
