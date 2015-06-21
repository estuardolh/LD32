function enemy( options ){
	var an_enemy = new jaws.Sprite({ x: options.x, y: options.y, z: 1000 });
	an_enemy.animation_base = new jaws.Animation({ sprite_sheet: "./img/enemy.png", frame_size: options.frame_size, frame_duration: 500 });
	an_enemy.animation_down = an_enemy.animation_base.slice( 0, 2 );
	an_enemy.animation_up = an_enemy.animation_base.slice( 2, 4 );
	an_enemy.animation_right = an_enemy.animation_base.slice( 4, 6 );
	an_enemy.animation_left = an_enemy.animation_base.slice( 6, 8 );
	
	an_enemy.name = "enemy";
	
	an_enemy.state = { patrolx: 0, patroly: 1, attack: 2 };
	an_enemy.state_current = 0; // default state
	
	an_enemy.right = true;
	
	an_enemy.dx_ini = 50;
	an_enemy.dx = an_enemy.dx_ini;
	
	an_enemy.update = function(){
		if( an_enemy.state_current == an_enemy.state.patrolx ){
			if( an_enemy.right ){
				an_enemy.setImage( an_enemy.animation_right.next() );
				an_enemy.move( 1, 0 );
				
				if( an_enemy.dx -- < 0 ){
					an_enemy.right = false;
				}
			}else{
				an_enemy.setImage( an_enemy.animation_left.next() );
				an_enemy.move( -1, 0 );
				
				if( an_enemy.dx++ > an_enemy.dx_ini ){
					an_enemy.right = true;
					an_enemy.dx = an_enemy.dx_ini;
				}
			}
		}
	}
	
	an_enemy.patrolX = function(){
		an_enemy.state_current = an_enemy.state.patrolx;
	}

	return an_enemy;
}