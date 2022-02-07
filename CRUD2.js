class Breed {
    constructor(name){
        this.name = name;
        this.information = [];
    }

    addInfo(name, age){
        this.information.push(new Info(name, age));
    }
}

class Info {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}
class BreedService {
    static url = "https://crudcrud.com/api/327b7124c01242ab960b26fb797aa417/breeds";
    
    static getBreed(id){
        return $.get(this.url+ `/${id}`)
    }

    static getAllBreeds(){
        return $.get(this.url);
    }

    static createBreed(breed){
        return $.ajax({
            url: this.url,
            dataType: 'json',
            data: JSON.stringify(breed),
            contentType: 'application/json',
            type: 'POST'
        });
    }

  static updateBreed(breed){
        return $.ajax({
            url: this.url + `/${breed._id}`,
            dataType: 'json',
            data: JSON.stringify(breed),
            contentType: 'application/json',
            type: 'PUT'
        });
    } 

     static deleteBreed(id){
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    } 
}


class DOMManager {
    static breeds = [];

    static getAllBreeds(){
        BreedService.getAllBreeds()
            .then((breeds) => {
            //console.log(breeds)
            this.render(breeds)
        });
    }

    static createBreed(name){
        BreedService.createBreed(new Breed(name))
        .then(() => {
            return BreedService.getAllBreeds();
        })
        .then((breeds) => this.render(breeds));
    }

     static deleteBreed(id){
        BreedService.deleteBreed(id)
        .then(() => {
            return BreedService.getAllBreeds();
        })
        .then((breeds) => this.render(breeds));
    } 

     static addInfo(id){
        for(let breed of this.breeds){
            if(breed._id == id){
                breed.information.push(new Info($(`#${breed._id}-info-name`).val(), $(`#${breed._id}-info-age`).val()))
                BreedService.updateBreed(breed)
                .then(() => {
                    return BreedService.getAllBreeds();
                })
                .then((breeds) => this.render(breeds));
            }
        }
    } 

    static deleteInfo(breedId, infoId){
        for(let breed of this.breeds){
            if(breed._id = breedId){
                for(let info of breed.information){
                    if(info.name = infoId){
                        breed.information.splice(breed.information.indexOf(info), 1);
                        BreedService.updateBreed(breed)
                        .then(() => {
                            return BreedService.getAllBreeds();
                        })
                        .then((breeds) => this.render(breeds));
                    }
                }
            }
        }
    } 

    static render(breeds){
        this.breeds = breeds;
        $('#app').empty();
        for(let breed of breeds){
            $('#app').prepend(
              `<div id="${breed._id}" class="card">
                <div class="card-header">
                    <h2>${breed.name}</h2>
            <button class="btn btn-danger" onclick="DOMManager.deleteBreed('${breed._id}')">Delete</button>
                </div>
                <div class="card-body">
                    <div class="card">
                        <div class="row">
                            <div class="col-sm">
                                <input type="text" id="${breed._id}-info-name" class="form-control" placeholder="Dog Name">
                            </div>
                            <div class="col-sm">
                                <input type="text" id="${breed._id}-info-age" class="form-control" placeholder="Dog Age">
                            </div>
                        </div>
                        <button id="${breed._id}-new-info" onclick="DOMManager.addInfo('${breed._id}')" class="btn btn-primary form-control">Add</button>
                    </div>
                </div>
              </div><br>` 
            );
            for(let info of breed.information){
                $(`#${breed._id}`).find('.card-body').append(
                    `<p>
                    <span id="name-${info.name}"><strong>Name: </strong> ${info.name}</span>
                    <span id="age-${info.age}"><strong>Age: </strong> ${info.age}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteInfo('${breed._id}', '${info.name}')">Delete Info</button>
                    </p>`
                );
            }
        }
    }
}


$('#create-new-breed').click(() => {
    DOMManager.createBreed($('#new-breed-name').val());
    $('#new-breed-name').val('');
});

DOMManager.getAllBreeds();


