const listaCamaraMostrar = document.getElementById("tabla-dinamica");
const searchBar = document.getElementById("search-bar");
let camarasTotales = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCameras = camarasTotales.filter((camara) => {
    return (
      camara.name.toLowerCase().includes(searchString) ||
      camara._id.toLowerCase().includes(searchString)
    );
  });
  displayCamaras(filteredCameras);
});

const loadCamaras = async () => {
  try {
    const res = await fetch("http://localhost:8080/camaras");
    camarasTotales = await res.json();
    displayCamaras(camarasTotales);
  } catch (err) {
    console.error(err);
  }
};

const displayCamaras = (camara) => {
  const htmlCamara = camara
    .map((camara) => {
      return `<tr><td class="camara_name">${camara.name}</td>
              <td>${camara._id}</td>
              <td>${camara.parent_device_id}</tr>`;
    })
    .join("");
  listaCamaraMostrar.innerHTML = htmlCamara;
};

loadCamaras();
