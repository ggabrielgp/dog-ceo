

export function GetAllBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => setData(data));
}

export function GetPictureForBreed(breed) {
  fetch(`https://dog.ceo/api/${breed}/list/all`)
    .then((response) => response.json())
    .then((data) => setData(data));
}

export default Data;
