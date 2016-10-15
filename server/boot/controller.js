module.exports = function(app){

	var router = app.loopback.Router();
	var Estacion = app.models.Estacion;

	router.get('/estacion',function(req,res){

		var newEstacion = {
			nombre: 'primeraEstacion',
			geoPoint: {
				lat: -12.046374,
				lng: -77.042793
			}
		}

		Estacion.create( newEstacion , function(err, obj){
			if(err) return console.log("error en crear objeto : ", err);

			console.log("objeto creado con exito :", obj);
		})

	})

	router.get('/estaciones', function(req,res){

		Estacion.find({}, function(err, objetos){
			if(err) {
				return console.log("error en buscar objetos : ",err);
			}else{
				return res.json(objetos);	
			}
			
		})

	})

	router.get('/unaestacion',function(req,res){
		var id = req.query.culo;

		Estacion.findById(id,{},function(err, obj){
			if(err) return console.log("error en buscar : ", err);

			return res.json(obj);
		})

	})

	app.use(router);

}