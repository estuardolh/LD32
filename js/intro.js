function intro(){
	var text_alpha = 0;
	var text_stack = [];
	var options_stack = [];
	var options_index = 0;
	var left = 10;
	var intro_ready = false;
	
	this.setup = function(){
		var unit = jaws.height / 16;
		
		text_stack.push( new jaws.Text({  text: "/*An unconvetional weapone ", x: left , y: unit , color: "white", fontSize: 14, textAlign: "left", fontFace: "courier" }) );
		text_stack.push( new jaws.Text({  text: "by Estuardolh */ ", x: left , y: 2 * unit , color: "white", fontSize: 14, textAlign: "left" , fontFace: "courier"}) );
		sprite_avatar = new jaws.Sprite({ image: "./img/avatar.png" });
		
		options_stack.push( new jaws.Text({ text: "START NOW !", x: left, y: 5 * unit, color: "white", fontFace: "courier" }) );
		options_stack.push( new jaws.Text({ text: "CREDITS", x: left, y: 6 * unit, color: "white", fontFace: "courier" }) );
	}
	
	this.update = function(){
		if( ! intro_ready ){
			if( text_alpha <= 1 ){
				text_alpha += 0.005;
			}else{
				intro_ready = true;
			}
			
			text_stack.forEach( function ( entry ){
				entry.alpha = text_alpha;
			} );
			
			options_stack.forEach( function ( entry ){
				entry.alpha = text_alpha;
			} );
		}else{
			// key events
			jaws.on_keydown( "up", function(){
				options_index--;
			} );
			jaws.on_keydown( "down", function(){
				options_index++;
			} );
			
			if( options_index > 1 ) options_index = 0;
			if( options_index < 0 ) options_index = 1;
		}
		
	}
	
	this.draw = function(){
		jaws.clear();
		text_stack.forEach( function( item ){
			item.draw();
		} );
		
		var index = 0;
		
		options_stack.forEach( function( item ){
			var text_tmp;
		
			if( index == options_index  ){
				text_tmp = item.text;
				item.text = "> " + item.text;
			}
		
			item.draw();
			
			if( index == options_index ){
				item.text = text_tmp;
			}
			
			index ++;
		} );
	}
}