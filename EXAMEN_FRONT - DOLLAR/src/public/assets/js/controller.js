

async function Eliminar(id){
    try {
       const response = await axios.delete(`/delete/${id}`);  
        window.location.href = '/'; // Redirige a la página principal  
       if (response.status === 404) {
       } else {
         console.error('Error al eliminar el elemento:', response.statusText);
       }
     } catch (error) {
       console.error('Error al eliminar el elemento:', error);
     }
 }


 

  

document.addEventListener('DOMContentLoaded', async function () {
  const form = document.getElementById('myFormEdit');
  const submitBtn = document.getElementById('submitBtnEdit');
  const peajeInput = document.getElementById('nombreEdit');
  const categoriaInput = document.getElementById('categoriasEdit');
  const precioInput = document.getElementById('precioEdit');
  const precioFeedback = document.getElementById('precio-feedback');
  let formStarted = false;
  let datosPeajes = [];

  // Cargar datos de peajes al cargar la página
  try {
    const response = await axios.get('https://www.datos.gov.co/resource/7gj8-j6i3.json');
    datosPeajes = response.data;
    console.log('Datos de peajes obtenidos:', datosPeajes);

  } catch (error) {
    console.error('Error al obtener los datos de peajes:', error);
  }

  const checkFormValidity = () => {
    const inputs = form.querySelectorAll('input, textarea, select');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value) {
        allFilled = false;
      }
    });

    submitBtn.disabled = !allFilled;
  };



  const updatePrecio = () => {
    const peaje = peajeInput.value;
    const categoria = categoriaInput.value;

    if (peaje && categoria) {
      const peajeData = datosPeajes.find(item => item.peaje === peaje && item.idcategoriatarifa === categoria);

      if (peajeData) {

        precioInput.value = peajeData.valor;
        precioFeedback.style.display = 'none';
        
      } else {
        precioInput.value = ''; // Limpiar el valor si no se encuentra una coincidencia
        precioFeedback.style.display = 'block';
      }
     
    } else {
      precioInput.value = ''; // Limpiar el valor si no se seleccionan ambos
      precioFeedback.style.display = 'none';
    }

    checkFormValidity();
  };

  form.addEventListener('input', () => {
    if (!formStarted) {
      form.classList.add('was-validated');
      formStarted = true;
    }
    checkFormValidity();
  });

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity() || !precioInput.value) {
      event.preventDefault();
      event.stopPropagation();
      if (!precioInput.value) {
        precioFeedback.style.display = 'block';
      }
    }
    form.classList.add('was-validated');
  });

  peajeInput.addEventListener('change', updatePrecio);
  categoriaInput.addEventListener('change', updatePrecio);
  
});




async function Update(id){
  console.log(id);
  const peaje = document.getElementById('nombreEdit').value;
  const descripcion = document.getElementById('nombreEdit').value;
  const categoria = document.getElementById('categoriasEdit').value;
  const precioInput = document.getElementById('precioEdit').value;
  console.log( peaje, descripcion,categoria,precioInput)
 var data =[
   peaje, descripcion,categoria,precioInput
 ]
 try {
    const response = await axios.put(`/update/${id}`,data);  
     window.location.href = '/'; // Redirige a la página principal  
    if (response.status === 404) {
    } else {
      console.error('Error al eliminar el elemento:', response.statusText);
    }
  } catch (error) {
    console.error('Error al eliminar el elemento:', error);
  }
}








//LISTA 
if (document.getElementById('products-list')) {
    const dataTableSearch = new simpleDatatables.DataTable("#products-list", {
      searchable: true,
      fixedHeight: false,
      perPage: 7
    });

    document.querySelectorAll(".export").forEach(function (el) {
      el.addEventListener("click", function (e) {
        var type = el.dataset.type;

        var data = {
          type: type,
          filename: "soft-ui-" + type,
        };

        if (type === "csv") {
          data.columnDelimiter = "|";
        }

        dataTableSearch.export(data);
      });
    });
  };



  var win = navigator.platform.indexOf('Win') > -1;
  if (win && document.querySelector('#sidenav-scrollbar')) {
    var options = {
      damping: '0.5'
    }
    Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
  }



  

  
  document.addEventListener('DOMContentLoaded', async function () {
    const form = document.getElementById('myForm');
    const submitBtn = document.getElementById('submitBtn');
    const peajeInput = document.getElementById('peajes');
    const categoriaInput = document.getElementById('categorias');
    const precioInput = document.getElementById('precio');
    const precioFeedback = document.getElementById('precio-feedback');
    let formStarted = false;
    let datosPeajes = [];

    // Cargar datos de peajes al cargar la página
    try {
      const response = await axios.get('https://www.datos.gov.co/resource/7gj8-j6i3.json');
      datosPeajes = response.data;
      console.log('Datos de peajes obtenidos:', datosPeajes);

    } catch (error) {
      console.error('Error al obtener los datos de peajes:', error);
    }

    const checkFormValidity = () => {
      const inputs = form.querySelectorAll('input, textarea, select');
      let allFilled = true;

      inputs.forEach(input => {
        if (!input.value) {
          allFilled = false;
        }
      });

      submitBtn.disabled = !allFilled;
    };

    const updatePrecio = () => {
      const peaje = peajeInput.value;
      const categoria = categoriaInput.value;

      if (peaje && categoria) {
        const peajeData = datosPeajes.find(item => item.peaje === peaje && item.idcategoriatarifa === categoria);

        if (peajeData) {

          precioInput.value = peajeData.valor;
          precioFeedback.style.display = 'none';
          
        } else {
          precioInput.value = ''; // Limpiar el valor si no se encuentra una coincidencia
          precioFeedback.style.display = 'block';
        }
       
      } else {
        precioInput.value = ''; // Limpiar el valor si no se seleccionan ambos
        precioFeedback.style.display = 'none';
      }

      checkFormValidity();
    };

    form.addEventListener('input', () => {
      if (!formStarted) {
        form.classList.add('was-validated');
        formStarted = true;
      }
      checkFormValidity();
    });

    form.addEventListener('submit', (event) => {
      if (!form.checkValidity() || !precioInput.value) {
        event.preventDefault();
        event.stopPropagation();
        if (!precioInput.value) {
          precioFeedback.style.display = 'block';
        }
      }
      form.classList.add('was-validated');
    });

    peajeInput.addEventListener('change', updatePrecio);
    categoriaInput.addEventListener('change', updatePrecio);
    
  });

