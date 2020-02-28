class Layer 												{
    constructor(__layername)								{
		this.properties										=	{
			// status											:	undefined,
			element											:	{
				type										:	'',
				subtype										:	undefined
			},
			placement										:	{
				to											:	undefined,		// Top 		// Bottom	// Left		// Right
				z											:	undefined, 		// Highest to Lowest	// Edge High to Center Low
				state										:	undefined,		// Solid 	// Liquid 	// gas		// plasma
	
				dimensions									:	{				// OPPOSING TO AXIS = PREDEFINED CONSTANT IN REM	// ON AXIS IS CONSTANT OR VARIABLE IN VX
					height									:	undefined,		// x.xx REM or xxx vh/vw
					width									:	undefined		// x.xx REM or xxx vh/vw
				},
				margin										:	{
					top										:	undefined,		// x.xx REM
					bottom									:	undefined,		// x.xx REM
					left									:	undefined,		// x.xx REM
					right									:	undefined		// x.xx REM
				},
				padding										:	{
					top										:	undefined,		// x.xx REM
					bottom									:	undefined,		// x.xx REM
					left									:	undefined,		// x.xx REM
					right									:	undefined		// x.xx REM
				}
			},
			interact 										:	{
				status										:	undefined,
				select										:	function(){
				},
				unselect									:	function(){
				},
				focus										:	function(){
				},
				unfocus										:	function(){
				}
			},
			visibility 										:	{
				status										:	undefined,
				show										:	function(){
					this.status					=	true;
					$( '#' + __layername + '' ).fadeIn( fadelenght, windowx.rescale() );
				},
				hide										:	function(){
					this.status					=	false;
					$( '#' + __layername + '' ).fadeOut( fadelenght, windowx.rescale() );
				},
				toggle										:	function(){
					switch ( this.status ){
						case undefined:	console.log('visibility status undefined');
						case true:		this.hide();		break;
						case false:		this.show();		break;
					}
				},
				minimize									:	function(){
					// this.visibility.status					=	'none',
					// $( ':root' ).css( '--' + __layername + '-visibility-'				, this.visibility.status		);
				},
				maximize									:	function(){
					// this.visibility.status					=	'block',
					// $( ':root' ).css( '--' + __layername + '-visibility-'				, this.visibility.status		);
				}
			}
		};
    };
};

var layers												=	{
	getData												:	{},
	get													:	function(){
		let ajaxcalls = [];
		return new Promise((resolve, reject) => {
			for(var layer in layers){
				if( ["properties","getData","get","set","render"].indexOf(layer) == -1 ){
					ajaxcalls.push(layer);
					console.log('ajaxcalls add');
					console.log(ajaxcalls);
	
					let ajaxData								=	$.ajax({
						layerid									:	layer,
						url										:	'layers/' + layer + '/' + layer + '.json',
						dataType								:	'json',
						type									:	'GET',
						success									:	function(){
							layers.getData[this.layerid]		=	ajaxData.responseJSON;
							_.pull(ajaxcalls,layer);
							console.log('ajaxcalls remove');
							console.log(ajaxcalls);
						}
					})
				}
			}
			if(ajaxcalls.length == 0)
				resolve('layers.set()');
			else
				reject()
		})                    
	},
	set													:	function(){
		_.merge(layers,layers.getData)
		console.log('layers set')
		console.log(layers.getData)
		console.log(layers)
		return;
	},
	render												:	function(layerRoot){
		var append										=	'';
		var jsid										=	'layers';
		var htmlid										=	'layers';
		for(var layer in layerRoot)						{
			jsid										=	'layers' + '.' + layer;
			htmlid 										=	'layers' + '-' + layer;
			
			if( ["properties","getData","get","set","render"].indexOf(layer) == -1 ){
				console.log(jsid + ' type: ');//+ eval(jsid + '.properties.element.type')
				// console.log(jsid + ' subtype: ' + eval(jsid + '.properties.element.subtype'));
				append									+=
				'<div id="' + htmlid + '" style="display:none">';



				for(var sublayer in eval('layers.' + layer))	{
					jsid								=	'layers' + '.' + layer + '.' + sublayer;
					htmlid 								=	'layers' + '-' + layer + '-' + sublayer;
					if( ["properties","getData","get","set","render"].indexOf(sublayer) == -1 )		{
						// console.log(jsid + ' type: ' + eval(jsid + '.properties.element.type'));
						// console.log(jsid + ' subtype: ' + eval(jsid + '.properties.element.subtype'));
						append							+= 
						'<div id="' + htmlid + '" style="display:none">';



						for(var subsublayer in eval('layers.' + layer + '.' + sublayer))			{
							jsid						=	'layers' + '.' + layer + '.' + sublayer + '.' + subsublayer;
							htmlid 						=	'layers' + '-' + layer + '-' + sublayer + '-' + subsublayer;
							if( ["properties","getData","get","set","render"].indexOf(subsublayer) == -1 )	{
								// console.log(jsid + ' type: ' + eval(jsid + '.properties.element.type'));
								// console.log(jsid + ' subtype: ' + eval(jsid + '.properties.element.subtype'));
								append					+= 
								'<div id="' + htmlid + '" style="display:none">';

	
								append					+=
								'</div>';
							}
						};
						append							+=
						'</div>';
					}
				};
				append									+=
				'</div>';
			}
		};
		$('body').append(append);
		index.body.construct.status						=	true;
	}
};

