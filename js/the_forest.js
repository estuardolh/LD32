function the_forest(){
	var map = null;
	var scale = 1;
	var viewport = null;
	var hearts = null;
	var hero = null;
	var tile_width = 16,
		tile_height = 16,
		tile_prev_width = 16,
		tile_prev_height = 16;
	
	var scale_me = function( ){
		var t, r;
		for( t = 0; t < map.size[0] ; t ++ ){
			for( r = 0 ; r < map.size[1] ; r++ ){
				map.cell( t, r ).forEach(function( item ){
						if( jaws.isFunction( item.forEach ) ){
							item.forEach( function( item2 ){
								item2.setX( item2.x * scale );
								item2.setY( item2.y * scale );
								item2.scaleAll( scale );
							})
						}else{
							item.setX( item.x * scale );
							item.setY( item.y * scale );
							item.scaleAll( scale );
						}
					});
			}
		}
		map.cell_size = [ tile_width * scale , tile_height * scale ];
		
		viewport.max_x = map.size[0] * map.cell_size[0];
		viewport.max_y = map.size[1] * map.cell_size[1];
		
		hero.scaleAll( scale );
		hearts.scaleAll( scale );
		
		tile_prev_width = tile_width;
		tile_prev_height = tile_height;
		
		tile_width = tile_width * scale;
		tile_height = tile_width * scale;
	}
	
	this.setup = function(){
		var r = 1
		, t = 1;
	
		map = new jaws.TileMap({ size: [ 80, 80], cell_size: [ tile_width , tile_height ] });
		
		for( t = 0; t < map.size[0] ; t ++ ){
			for( r = 0 ; r < map.size[1] ; r++ ){
				map.push( new jaws.Sprite({ image: "./img/grass.png", x: r * tile_width , y: t * tile_height }) );
			}
		}
		
		hearts = new display({ cell_size: map.cell_size, x: map.cell_size[0], y: map.cell_size[1] });
		
		var heart = function(){
			var a_heart = new jaws.Sprite({ });
			
			a_heart.animation = new jaws.Animation({ sprite_sheet: "./img/heart.png", frame_size: [ tile_width , tile_height ], frame_duration: 400 });
			a_heart.setImage( a_heart.animation.frames[0] );
			a_heart.update = function(){
				if( a_heart.isBreaking && ! a_heart.animation.atLastFrame() ) a_heart.setImage( a_heart.animation.next() );
			}
			a_heart.isBreaking = false;
			a_heart.breaked = function(){
				a_heart.isBreaking = true;
			}
			
			return a_heart;
		}
		
		hearts.addItem( new heart() );
		hearts.addItem( new heart() );
		hearts.addItem( new heart() );
		
		hero = new human({ x: 10 * map.cell_size[0], y: 10 * map.cell_size[1] });
		
		viewport = new jaws.Viewport({  max_x: map.size[0] * map.cell_size[0], max_y: map.size[1] * map.cell_size[1] });
		
		for( t = 0; t < map.size[0] ; t ++ ){
			for( r = 0 ; r < map.size[1] ; r++ ){
				if( Math.random() < 0.18 ){
					map.push( new rabbit({ frame_size: [ tile_width, tile_height ], x: t * tile_width, y: r * tile_height }) );
				}
			}
		}

		scale = 2;
		scale_me();
	}
	
	this.update = function(){
		viewport.centerAround( hero );
		jaws.forceInsideCanvas( hero );
	
		// on shot {
		// hearts.map[2].breaked();
		// }
		
		hearts.update();
		hero.update();
		
		var t, r;
		for( t = 0; t < map.size[0] ; t ++ ){
			for( r = 0 ; r < map.size[1] ; r++ ){
				map.cell( t, r ).forEach(function( item ){
					if( jaws.isFunction( item.update ) ) item.update();
				})
			}
		}
	}
	
	this.draw = function(){
		jaws.clear();
		
		viewport.apply(function(){
			viewport.draw( map.all() );
			/* map.all().forEach( function(item){
				if( jaws.isFunction( item ) ){
					item.forEach(function( item2 ){
						item2.draw();
					})
				}else{
					item.draw();
				}
			} );
			*/
			hero.draw();
		});
		
		hearts.draw();
	}
}