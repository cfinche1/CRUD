class Dog {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Breed {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.dogs =[];
    }

    addDog(dog) {
        this.dogs.push(dog);
    }

    deleteDog(dog) {
        let index = this.dogs.indexOf(dog);
        this.dogs.splice(index, 1);
    }
}

let breeds =[];
let breedId = 0;

onClick('new-breed', () => {
    breeds.push(new Breed (breedId++, getValue('new-breed-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action)
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let breedDiv = document.getElementById('breeds');
    clearElement(breedDiv);
    for (let breed of breeds) {
        let table = createBreedTable(breed);
        let title = document.createElement('h2');
        title.innerHTML = breed.name;
        title.appendChild(createDeleteBreedButton(breed));
        breedDiv.appendChild(title);
        breedDiv.appendChild(table);
        for (let dog of breed.dogs) {
            createDogRow(breed, table, dog);
        }
    }
}

function createDogRow(breed, table, dog) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = dog.name;
    row.insertCell(1).innerHTML = dog.age;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(breed, dog));
}

function createDeleteRowButton(breed, dog) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = breed.dogs.indexOf(dog);
        breed.dogs.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteBreedButton(breed) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Breed';
    btn.onclick = () => {
        let index = breeds.indexOf(breed);
        breeds.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createNewDogButton(breed) {
    let btn = document.createElement('button');
    btn. className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        breed.dogs.push(new Dog(getValue(`name-input-${breed.id}`), getValue(`age-input-${breed.id}`)));
        drawDOM();
    };
    return btn;
}

function createBreedTable(breed) {
    let table = document.createElement('table');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let ageColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    ageColumn.innerHTML = 'Age';
    row.appendChild(nameColumn);
    row.appendChild(ageColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let ageTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${breed.id}`);
    nameInput.setAttribute('type', "text");
    nameInput.setAttribute('class', 'form-control');
    let ageInput = document.createElement('input');
    ageInput.setAttribute('id', `age-input-${breed.id}`);
    ageInput.setAttribute('type', "text");
    ageInput.setAttribute('class', 'form-control');
    let newDogButton = createNewDogButton(breed);
    nameTh.appendChild(nameInput);
    ageTh.appendChild(ageInput);
    createTh.appendChild(newDogButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(ageTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}