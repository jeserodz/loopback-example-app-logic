module.exports = function(Car) {
	// create() hooks
	Car.beforeRemote('create', function(ctx, car, next) {
		console.log("This is the car to be created: " + JSON.stringify(ctx.req.body));
		next();
	});
	Car.afterRemote('create', function(ctx, car, next) {
		console.log("This is the car created: " + JSON.stringify(car));
		next();
	});


	// revEngine hooks
	Car.revEngine = function(data, cb) {
		cb(null, data.sound + ' ' + data.sound + ' ' + data.sound)
	};
	Car.beforeRemote('revEngine', function(context, unused, next) {
		console.log('Putting in the car key, starting the engine. ' + context.req);
		next();
	});
	Car.remoteMethod('revEngine', {
		// For passing JSON objects to remote method, set the type 'object' and http source 'body'
		accepts: [{arg: 'data', type: 'object', http: {source: 'body'}}],
		returns: {arg: 'engineSound', type: 'string'},
		http: {path: '/rev-engine', verb: 'post'}
	});
	Car.afterRemote('revEngine', function(context, car, next) {
		console.log('Turning off the engine, removing the key.');
		next();
	});

};
