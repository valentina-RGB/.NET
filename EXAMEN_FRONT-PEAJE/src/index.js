const express = require('express');
const cors = require('cors');
//const axios = require('axios');

const bodyParser = require('body-parser');
const hbs = require('hbs');





class server {

    constructor() {

        this.app = express();
        //this.app.use(Axios());
        

// Configura la carpeta de archivos estáticos
        
        
        // Midlewares 
        hbs.registerPartials(__dirname + '/views/partials', function (err){});

       
        this.app.set('view engine', 'hbs');
        this.app.set("views", __dirname + "/views");
        this.app.use(cors());
        
        //this.app.use(path());
        this.app.engine('hbs', hbs.__express);
        this.app.use(express.static("src/public"))

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));



                // Middleware to parse JSON bodies
        this.app.use(express.json()); // for express version 4.16+

        // or if using body-parser
    
        
    

        //Port
        this.port = process.env.PORT;

        //router
        this.routers();


    }

    routers() {
    
      

        
        //ORDER
        this.app.get('/', require('./routers/pedaje-routers'));
        this.app.get('/edit/:id', require('./routers/pedaje-routers'));
        this.app.post('/edit', require('./routers/pedaje-routers'));

      
        this.app.post('/', require('./routers/pedaje-routers'));
        this.app.patch('/update/:id', require('./routers/pedaje-routers'));
        this.app.delete('/delete/:id', require('./routers/pedaje-routers'));
        this.app.get('/dollar', require('./routers/pedaje-routers'));
        //this.app.get('/newOrder', require('./routers/order-routers'));
        

       



    
    }


    

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port  http://localhost:${this.port}`);
        });
    }


};

module.exports=server;


