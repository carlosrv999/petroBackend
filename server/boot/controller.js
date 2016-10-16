module.exports = function(app){

	var router = app.loopback.Router();
	var Estacion = app.models.Estacion;
	var Usuario = app.models.Usuario;

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

	router.get('/borrarRegistro', function(req,res){
		var id = req.query.idestacion;
		Estacion.destroyById(id, function(err){
			if (err) return console.log("warak\n",err)
			return res.json({
				data : 'objeto eliminado'
			});
			
		})
	})	

	router.get('/unaestacion',function(req,res){
		var id = req.query.culo;

		Estacion.findById(id,{},function(err, obj){
			if(err) return console.log("error en buscar : ", err);

			return res.json(obj);
		})

	})


	router.get('/crearEstacion',function(req,res){
		return res.render('index');
	})

	router.post('/crearEstacion',function(req,res){
		var nombre= req.body.nombre;
		var latitud = req.body.latitud;
		var longitud = req.body.longitud;
		var userId = req.body.userId;

		var newEstacion = {
			nombre: nombre,
			latitud: latitud,
			longitud: longitud,
			userId: userId
		}

		Estacion.create(newEstacion,function(err,obj){
			if(err) return console.log("error crear estacion", err);
			return res.json(obj);
		})

		

	})

	router.post('/crearUsuario',function(req,res){
		var username = req.body.username;
		var password = req.body.password;

		Usuario.create({
			username: username,
			password: password
		},function(err,obj){
			if(err) return console.log("error usuatio", err);
			console.log("creado con exito : ", obj);
			return res.json(obj);
		})

	})

	router.get('/usuarioConEstacion',function(req,res){
		var idUsuario = req.query.userId;

		Usuario.findById(idUsuario,{
			include: 'estacions'
		},function(err, obj){
			if(err) return console.log("error en usuario", err);
			return res.json(obj);
		})

	})

	/*router.post('/crearProducto',function(req,res){
		var nombre = req.body.nombre;
		var 
	})*/

	app.use(router);

}