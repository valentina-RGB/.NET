

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
async function editar(id){
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('myForm');
        const submitBtn = document.getElementById('submitBtn');
        let formStarted = false;
        let isEditMode = false;
      
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
      
        form.addEventListener('input', () => {
          if (!formStarted) {
            form.classList.add('was-validated');
            formStarted = true;
          }
          checkFormValidity();
        });
      
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
          }
      
          const id = document.getElementById('id').value;
          const nombre = document.getElementById('kilos').value;
          const kilos = document.getElementById('nombre').value;
          const precio = document.getElementById('precio').value;
      
          try {
            let response;
            if (isEditMode) {
              response = await axios.put(`/update/${id}`, { nombre, kilos, precio });
            } else {
              response = await axios.post('/', { nombre, kilos, precio });
            }
      
            if (response.status === 200) {
              window.location.reload();
            } else {
              console.error('Error al guardar el elemento:', response.statusText);
            }
          } catch (error) {
            console.error('Error al guardar el elemento:', error);
          }
        });
      
        window.Editar = function(id, nombre, kilos, precio) {
          isEditMode = true;
          document.getElementById('formId').value = id;
          document.getElementById('formNombre').value = nombre;
          document.getElementById('formKilos').value = kilos;
          document.getElementById('formPrecio').value = precio;
      
          document.getElementById('modalFormLabel').innerText = 'Editar Exportación';
          $('#modalForm').modal('show');
        }
      
        document.querySelector('button[data-bs-toggle="modal"][data-bs-target="#modalForm"]').addEventListener('click', () => {
          isEditMode = false;
          form.reset();
          document.getElementById('formId').value = '';
          document.getElementById('modalFormLabel').innerText = 'Nueva Exportación';
        });
      });
}


  

//VALIDACIONES DE FORMULARIO 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const submitBtn = document.getElementById('submitBtn');
    let formStarted = false;
  
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
  
    form.addEventListener('input', () => {
      if (!formStarted) {
        form.classList.add('was-validated');
        formStarted = true;
      }
      checkFormValidity();
    });
  
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  })












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