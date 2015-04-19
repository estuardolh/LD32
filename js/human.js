function human( options = null ){
	var a_human =  new jaws.Sprite({ x: options.x, y: options.x });
	
	a_human.animation_base = new jaws.Animation({ sprite_sheet: "./img/hero.png", frame_size: [ 16, 16 ], frame_duration: 200 });
	a_human.animation_down = a_human.animation_base.slice( 0, 2 );
	a_human.animation_up = a_human.animation_base.slice( 2, 4 );
	a_human.animation_right = a_human.animation_base.slice( 4, 6 );
	a_human.animation_left = a_human.animation_base.slice( 6, 8 );
	
	a_human.setImage( a_human.animation_down.next() );
	
	a_human.update = function(){
		// walk to up
		jaws.on_keydown("up", function(){
			a_human.setImage( a_human.animation_up.next() );
			a_human.move( 0, - 1 );
		});
		if( gamepad.isClicked( gamepad.buttons.up ) ){
			a_human.setImage( a_human.animation_up.next() );
			a_human.move( 0, - 1 );
		}
		
		// walk to down
		jaws.on_keydown("down", function(){
			a_human.setImage( a_human.animation_down.next() );
			a_human.move( 0,  1 );
		});
		if( gamepad.isClicked( gamepad.buttons.down ) ){
			a_human.setImage( a_human.animation_down.next() );
			a_human.move( 0,  1 );
		}
		
		// walk to right
		jaws.on_keydown("right", function(){
			a_human.setImage( a_human.animation_right.next() );
			a_human.move( 1 , 0 );
		});
		if( gamepad.isClicked( gamepad.buttons.right ) ){
			a_human.setImage( a_human.animation_right.next() );
			a_human.move( 1 , 0 );
		}
		
		// walk to left
		jaws.on_keydown("left", function(){
			a_human.setImage( a_human.animation_left.next() );
			a_human.move( - 1 , 0 )
		});
		if( gamepad.isClicked( gamepad.buttons.left ) ){
			a_human.setImage( a_human.animation_left.next() );
			a_human.move( - 1 , 0 )
		}
	}
	
	return a_human;
}