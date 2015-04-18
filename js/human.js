function human( options = null ){
	var a_human =  new jaws.Sprite({ x: options.x, y: options.x });
	
	a_human.animation_base = new jaws.Animation({ sprite_sheet: "./img/hero.png", frame_size: [ 16, 16 ], frame_duration: 100 });
	a_human.animation_down = a_human.animation_base.slice( 0, 2 );
	a_human.animation_up = a_human.animation_base.slice( 2, 4 );
	a_human.animation_right = a_human.animation_base.slice( 4, 6 );
	a_human.animation_left = a_human.animation_base.slice( 6, 8 );
	
	a_human.animation_right.frame_duration = a_human.animation_left.frame_duration = 200;
	
	a_human.setImage( a_human.animation_down.next() );
	
	a_human.update = function(){
		jaws.on_keydown("up", function(){
			// walk up
			a_human.setImage( a_human.animation_up.next() );
			a_human.move( 0, - 1 );
		});
		/* jaws.on_keydown("left_mouse_button", function(){
			if( jaws.mouse_x > 3 * jaws.width / 4 && jaws.mouse_x < jaws.width
				&& jaws.mouse_y > 1 * jaws.height / 4 && jaws.mouse_y <	3 * jaws.height / 4	){
				// walk right
				a_human.setImage( a_human.animation_right.next() );
				a_human.move( 1, 0 );
			}
		}); */
		jaws.on_keydown("down", function(){
			// walk down
			a_human.setImage( a_human.animation_down.next() );
			a_human.move( 0,  1 );
		});
		jaws.on_keydown("right", function(){
			// walk right
			a_human.setImage( a_human.animation_right.next() );
			a_human.move( 1 , 0 );
		});
		jaws.on_keydown("left", function(){
			// walk left
			a_human.setImage( a_human.animation_left.next() );
			a_human.move( - 1 , 0 )
		});
	}
	
	return a_human;
}