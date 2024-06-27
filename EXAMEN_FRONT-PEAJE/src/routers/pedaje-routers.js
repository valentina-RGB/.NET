const {Router} = require('express');
const {GETExport, POSTExport,DeleteExport,GETid,Edit}= require('../controller/pedaje');
const router= Router();

router.get('/',GETExport);
router.get('/edit/:id',GETid);
router.post('/edit',Edit)
router.post('/',POSTExport);
router.delete('/delete/:id',DeleteExport);

//router.patch('/', update)


module.exports=router;