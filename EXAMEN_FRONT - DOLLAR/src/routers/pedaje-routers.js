const {Router} = require('express');
const {GETExport, POSTExport,DeleteExport}= require('../controller/pedaje');
const router= Router();

router.get('/',GETExport);
router.post('/',POSTExport);
router.delete('/delete/:id',DeleteExport);
//router.patch('/update/:id', update);
//router.patch('/', update)


module.exports=router;