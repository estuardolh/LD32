function rabbit( options = null ){
	var a_rabbit = new jaws.Sprite({ x: options.x, y: options.y });
	
	a_rabbit.state = { REST: 0, PATROLX: 1, PATROLY: 2, FREE: 3 };
	a_rabbit.state_current = a_rabbit.state.REST;
	
	a_rabbit.options = options;
	a_rabbit.options.vel_ini = 30;
	a_rabbit.options.vel = a_rabbit.options.vel_ini;
	a_rabbit.animation_base = a_rabbit.options.animation_base;
	a_rabbit.animation_left = a_rabbit.animation_base.slice( 0, 2 );
	a_rabbit.animation_right = a_rabbit.animation_base.slice( 2, 4 );
	a_rabbit.animation_down = a_rabbit.animation_base.slice( 4, 6 );
	a_rabbit.animation_up = a_rabbit.animation_base.slice( 6, 8 );
	
	a_rabbit.load = function(){
		
	}
	
	a_rabbit.now = function(){
		if( a_rabbit.options.vel -- > 0 ){
			return true;
		}else{
			a_rabbit.options.vel = a_rabbit.options.vel_ini;
			return false;
		}
	}
	
	a_rabbit.update = function(){
		//console.log("update");
		if( a_rabbit.now() ) return;
		
		switch( a_rabbit.state_current ){
			case a_rabbit.state.REST: {
				// just stay here
				var volunt = Math.random();
				if( volunt >= 0 && volunt <= 0.4 ){
					a_rabbit.setImage( a_rabbit.animation_left.next() );
				}else if( volunt > 0.4 && volunt <= 0.8 ){
					a_rabbit.setImage( a_rabbit.animation_right.next() );
				}else{
					a_rabbit.setImage( a_rabbit.animation_down.next() );
				}
			}; break;
			case a_rabbit.state.PATROLX:{
			}; break;
			case a_rabbit.state.PATROLY:{
			}; break;
			case a_rabbit.state.FREE:{
			
			}; break; 
		}
		
	}
	
	return a_rabbit;
}