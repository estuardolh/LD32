function the_forest(){
	var map = null;
	var scale = 1;
	var viewport = null;
	var hearts = null;
	
	this.setup = function(){
		var r = 1
		, t = 1;
	
		map = new jaws.TileMap({ size: [ 80, 80], cell_size: [16, 16] });
		
		for( t = 0; t < map.size[0] ; t ++ ){
			for( r = 0 ; r < map.size[1] ; r++ ){
				map.push( new jaws.Sprite({ image: "./img/grass.png", x: r * 16 , y: t * 16 }) );
			}
		}
		
		hearts = new display({ cell_size: map.cell_size, items_count: 3, left: 1 });
		
		viewport = new jaws.Viewport({ max_x: jaws.width, max_y: jaws.height });
	}
	
	this.update = function(){
		jaws.on_keydown( "down", function(){
			scale -= 0.1;
		} );
		
		jaws.on_keydown( "up", function(){
			scale += 0.1;
		} );
	}
	
	this.draw = function(){
		jaws.clear();
		
		viewport.draw( map.all() );
		
		hearts.all().forEach( function( item ){
			item.draw();
		} );
	}
}