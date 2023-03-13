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
            
        } else if (e.target.dataset.link === "todo") {
            req("https://jsonplaceholder.typicode.com/todos")
            .then((info) => {
                show(info)
            })
        } else {

        }
    })

function show(data = []) {
    if (!Array.isArray(data)) return;

    const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""
    const newArr = data.map(({txt, rate, exchangedate, title, completed }, i) => {
        return {
            id: i + 1,
            name : txt || title,
            info1 : rate || completed,
            info2 : exchangedate || "тут пусто"
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

    document.querySelector(".box_loader").classList.remove("show")
}