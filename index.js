// https://www.www.thecocktaildb.thecocktaildb.com/api.php
const allMod = async (a) => {
    const err = document.getElementById('err');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${a}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        err.classList.add('d-none')
        mod(data.drinks)
    }
    catch (error) {
        err.classList.remove('d-none')
        document.getElementById('container').innerHTML = '';
        document.getElementById('showw').classList.add('d-none')
        load(false);

    }
}

const mod = a => {
    const show = document.getElementById('showw');
    if (a.length > 6) {
        show.classList.remove('d-none')
    }
    else {
        show.classList.add('d-none')

    }
    const mainDiv = document.getElementById('container');
    mainDiv.innerHTML = '';
    a.slice(0, 6).forEach(element => {
        mainDiv.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 p-4">
                        <img src="${element.strDrinkThumb}" class="card-img-top " alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.strDrink}</h5>
                            <p class="card-text">${(element.strInstructions).slice(0, 150)}...</p>
                            </div>
                            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary p-2" onclick="singleMod('${element.idDrink}')">Show details</button>
                        
                    </div>
                </div>`


    });
    document.getElementById('show').addEventListener('click', function () {
        mainDiv.innerHTML = '';
        a.forEach(element => {
            mainDiv.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 p-4">
                            <img src="${element.strDrinkThumb}" class="card-img-top " alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${element.strDrink}</h5>
                                <p class="card-text">${(element.strInstructions).slice(0, 150)}...</p>
                                </div>
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary p-2" onclick="singleMod('${element.idDrink}')">Show details</button>
                            
                        </div>
                    </div>`


        });
        show.classList.add('d-none')
    })
    load(false);
}

const singleMod = a => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${a}`
    fetch(url)
        .then(res => res.json())
        .then(data => infoMod(data))
}


const infoMod = d => {
    const modall = document.getElementById('modal');
    modall.innerHTML = `
    <div class="modal-content p-2" id="modal">
    <img src="${d.drinks[0].strDrinkThumb}" class="img-fluid" alt="">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">${d.drinks[0].strDrink}</h1>
                        </div>
                        <div class="modal-body">
                        <p ><span class="fw-bolder">Makeing date:</span> ${d.drinks[0].dateModified}</p>
                        <p ><span class="fw-bolder">Catagory:</span> ${d.drinks[0].strCategory}</p>
                        <p ><span class="fw-bolder">Ingredient:</span> ${d.drinks[0].strIngredient1}, ${d.drinks[0].strIngredient2}, ${d.drinks[0].strIngredient3 ? d.drinks[0].strIngredient1 :''}...</p>
                        <p ><span class="fw-bolder">Instructions:</span> ${d.drinks[0].strInstructions}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>`
}



const load = a => {
    const ld = document.getElementById('load')
    if (a) {
        ld.classList.remove('d-none')
    }
    else {
        ld.classList.add('d-none')

    }

}

document.getElementById('btn').addEventListener('click', function () {
    const input = document.getElementById('input').value;
    allMod(input);
    load(true);
})
document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        allMod(e.target.value);
        load(true);
    }
});


