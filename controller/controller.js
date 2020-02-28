fadelenght = 150;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTRODUCTION
	command.big('Pinewiki');
	command.sub('Pinecode Trading Algorythms');
	command.hid('Welcome to my insides, Take a look around');

	controller												=	{

	};
	
	
// // PROCEDURE
index.construct.get().done(function(){
	index.construct.build();

		// layers.get().done(function(){
		// 	layers.set();
		// 	layers.render(layers);
		// 	console.log(layers);
		// });

		async function test(){
			const todo = await layers.get()
			return todo
		}
		test().then(layers.set())

});

 

