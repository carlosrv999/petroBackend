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



	router.get('/borrarTodaEstacion', function(req,res){
		Estacion.destroyAll();
		return res.json({
			data: 'registros eliminados'
		});

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

	router.get('/usuarios', function(req,res){
		Usuario.find({}, function(err, objetos){
			if(err) {
				return console.log("error en buscar objetos : ",err);
			}else{
				return res.json(objetos);	
			}
			
		})
	})

	router.get('/usuarioId', function(req,res){
		var idUsuario = req.query.userId;
		Usuario.findById(idUsuario, function(err, obj){
			if(err) return console.log("error en usuario", err);
			return res.json(obj);
		})
	})


	router.get('/borrarTodoUsuario', function(req,res){
		Usuario.destroyAll();
		return res.json({
			data: 'registros eliminados'
		});

	})
	
	router.get('/modificarEstacion', function(req,res){
		/*var myString = "          ";
		var myString2 = myString.trim();
		console.log(""+myString.trim()+"");
		if(myString2 == ''){
			console.log('string vacio');
		}*/
		return res.render('idEstacionQuery');		
	})

	router.post('/auth/modificarEstacion', function(req,res){
		var idEstacion = req.body.idEstacion;
		Estacion.exists(idEstacion, function(err, exist){
			if(exist){
				console.log('existe');
				return res.render('modify',{message:idEstacion});
			} else {
				console.log('no existe');
				return res.render('idEstacionQuery');
			}
		})
	})

	router.post('/auth/modificarEstacion/modificar', function(req,res){
		var nombre = req.body.nombre;
		var latitud = req.body.latitud;
		var longitud = req.body.longitud;
		var idEst = req.body.idEstacion;
		console.log(idEst);
		if(nombre.trim() != ''){
			Estacion.updateAll({
				id:idEst }, 
				{
					nombre:nombre
				}, function(err, info){
					if(err) return console.log("error en update" , err);
				})
			
		}
		if(latitud.trim() != ''){
			Estacion.updateAll({
				id:idEst }, 
				{
					latitud:latitud
				}, function(err, info){
					if(err) return console.log("error en update" , err);
				})
			
		}
		if(longitud.trim() != ''){
			Estacion.updateAll({
				id:idEst }, 
				{
					longitud:longitud
				}, function(err, info){
					if(err) return console.log("error en update" , err);
				})
			
		}
		return res.render('exito');
	})

	router.get('/auth/modificarEstacion/exitoModificacion', function(req,res){
		console.log('exito');
	})
	/*router.put('/modificarUsuario', function(req,res){

	})/*
	/*router.post('/crearProducto',function(req,res){
		var nombre = req.body.nombre;
		var 
	})*/

	app.use(router);

}