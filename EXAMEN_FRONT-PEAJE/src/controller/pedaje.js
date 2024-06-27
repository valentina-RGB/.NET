const { request, response } = require('express');
const axios = require('axios');
const moment = require('moment');
const currentMoment = moment();

const Url = 'http://creamy-001-site1.dtempurl.com/api/peaje'
const UrlParam = `http://creamy-001-site1.dtempurl.com/api/peaje/`;



const GETExport = async (req, res = response) => {
  try {
    console.log('Iniciando solicitudes Axios');

    // Realiza la solicitud Axios para obtener los datos de exportaciones
    const response = await axios.get(Url);
    //console.log('Datos de exportaciones obtenidos:', response.data);

    // Realiza la solicitud Axios para obtener los datos de peajes
    const responsedatos = await axios.get('https://www.datos.gov.co/resource/7gj8-j6i3.json');


    //console.log('Datos de peajes obtenidos:', responsedatos.data);

    const datos = response.data;
    const datospeaje = responsedatos.data;
 

    // Renderiza la vista con los datos obtenidos
    res.render('index', { datos, datospeaje });

  } catch (err) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error('Error durante la solicitud:', err);
    // Envía una respuesta de error al cliente
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



const POSTExport = async (req = request, res = response) => {
  var {placa, peajes, categorias, precio,descripcion } = req.body;
  console.log(peajes, categorias, precio);
  try {
   
    var data = {
      "placa": placa,
      "peaje": peajes,
      "descripcion":descripcion,
      "idCategoria": categorias,
      "fechaRegistro":currentMoment.format("YYYY-MM-DD"),
      "precio": precio,
    };

    axios.post(Url, data)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        res.redirect('/')
      })
      .catch(error => {
        if (error.response) {
          // Aquí puedes manejar los errores específicos de validación
          console.error('Validation errors:', error.response.data.errors);
        } else {
          console.error('Error:', error.message);
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  };
}





//MODIFICAR
const Edit = async (req=request, res=response) => {
  
  var {id,placaEdit,peajesEdit,categoriasEdit,precioEdit,descripcionEdit} = req.body;
  console.log(id,peajesEdit,placaEdit,categoriasEdit,precioEdit,descripcionEdit);
  var data = {
    "idPeaje":id,
    "placa": placaEdit,
    "peaje": peajesEdit,
    "descripcion":descripcionEdit,
    "idCategoria": categoriasEdit,
    "fechaRegistro":currentMoment.format("YYYY-MM-DD"),
    "precio": precioEdit,
  };
  
  try {
   
  const response=await axios.put(`${Url}/${id}`,data);
  res.redirect('/');
} catch (error) {
    console.error('Error al actualizar el ítem:', error);
    res.status(500).send('Error del servidor');
}
}




// ESTO ES PARA AUTOCOMPLEMTAR EL FORMULARIO
const GETid = async (req = request, res = response) => {
  const id = req.params.id;
  console.log(id);
  try{
  const response = await axios.get(`${UrlParam}${id}`)
  .then((response) =>{
    var editar = response.data;
    console.log(editar);
    res.render('index',{item: editar})
  })
  }catch(err){
    console.log(err);
  }
}















// Función para realizar la solicitud DELETE
async function DeleteExport(req = require, res = response) {
  const id = req.params.id;
  try {
    const response = await axios.delete(`${UrlParam}${id}`)
    if (response.statusText === 'OK') {
      res.redirect('/'); // Redirige a la página principal después de eliminar
      console.log('Respuesta del servidor:', response.data);
    } else {
      res.status(response.status).send('Error al eliminar el elemento');
      res.redirect('/');
    }


  } catch (error) {
    if (res.status == (404)) {

    } else {
      console.error('Error al eliminar el item:', error.response ? error.response.data : error.message);
    }

  }
}






module.exports = {

  GETExport,
  POSTExport,
  DeleteExport,
  Edit,
  GETid
  //precio
  //GETPedaje
}