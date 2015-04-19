var gamepad = {};
gamepad.buttons = { right: 0, left: 1, up: 2 , down: 3 };
	
gamepad.draw = function(){
		// TODO: draw semi-transparent buttons
};
	
gamepad.button_pressed = function( x, y ){
	if( x > 3 * jaws.width / 4 && x < jaws.width
			&& y > 1 * jaws.height / 4 && y < 3 * jaws.height / 4 ){
		return gamepad.buttons.right;
	}else if( x < 1 * jaws.width / 4 && x > 0
			&& y > 1 * jaws.height / 4 && y <	3 * jaws.height / 4 ){
		return gamepad.buttons.left;
	}else if( x > 1 * jaws.width / 4 && x < 3 * jaws.width / 4 
			&& y > 0 && y < 1 * jaws.height / 4 ){
		return gamepad.buttons.up;
	}else if( x > 1 * jaws.width / 4 && x < 3 * jaws.width / 4 
			&& y > 3 * jaws.height / 4 && y < jaws.height ){
		return gamepad.buttons.down;
	}
};

gamepad.isClicked = function( button ){
	
	if( jaws.pressed("left_mouse_button") ){
		var mouse_x = jaws.mouse_x - jaws.canvas.getBoundingClientRect().left;
		var mouse_y = jaws.mouse_y - jaws.canvas.getBoundingClientRect().top;
		
		return gamepad.button_pressed( mouse_x, mouse_y ) == button;
	}

	return false;
};