function the_forest(){
	var map = null;
	var scale = 1;
	var viewport = null;
	var hearts = null;
	var hero = null;
	
	this.setup = function(){
		var r = 1
		, t = 1;
	
		map = new jaws.TileMap({ size: [ 80, 80], cell_size: [16, 16] });
		
		for( t = 0; t < map.size[0] ; t ++ ){
			for( r = 0 ; r < map.size[1] ; r++ ){
				map.push( new jaws.Sprite({ image: "./img/grass.png", x: r * 16 , y: t * 16 }) );
			}
		}
		
		hearts = new display({ cell_size: map.cell_size, x: map.cell_size[0], y: map.cell_size[1] });
		
		var heart = function(){
			var a_heart = new jaws.Sprite({ });
			
			a_heart.animation = new jaws.Animation({ sprite_sheet: "./img/heart.png", frame_size: [16, 16], frame_duration: 400 });
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
	}
	
	this.update = function(){
		viewport.centerAround( hero );
		jaws.forceInsideCanvas( hero );
	
		jaws.on_keydown( "down", function(){
			// scale -= 0.1;
		} );
		
		jaws.on_keydown( "up", function(){
			// scale += 0.1;
		} );
		
		// on shot {
		// hearts.map[2].breaked();
		// }
		
		hearts.update();
		hero.update();
	}
	
	this.draw = function(){
		jaws.clear();
		
		hearts.draw();
		viewport.apply(function(){
			viewport.draw( map.all() );
			hero.draw();
		});
	}
}