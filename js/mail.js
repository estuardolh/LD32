function mail( options = null ){
	var a_mail = {};
	a_mail.messages = [];
	a_mail.animation_base = null;
	a_mail.index = -1;
	a_mail.message_current = null;
	
	a_mail.text_current = null;
	
	a_mail.isHidding = false;
	a_mail.isShowing = false;
	
	a_mail.left_top = null;
	a_mail.middle_top = [];
	a_mail.right_top = null;
	
	a_mail.left_bottom = null;
	a_mail.middle_bottom = [];
	a_mail.right_bottom = null;
	
	a_mail.ini = function(){
		a_mail.animation_base = new jaws.SpriteSheet({ image: "./img/dialog.png", frame_size: [ options.tile_width ,  options.tile_height ], orientation: "right" });
		a_mail.text_current = new jaws.Text({ text: "Get a rabbit! ", x: options.x + options.tile_width , y: options.tile_width });
		
		a_mail.left_top = new jaws.Sprite({ x: options.x + 0 , y: options.y + 0 });
		a_mail.left_top.setImage( a_mail.animation_base.frames[0] );
		a_mail.left_top.scaleAll( options.scale );
		
		a_mail.left_bottom = new jaws.Sprite({ x: options.x + 0 , y: options.y + 0 }); // should be 'y' = 1 unit
		a_mail.left_bottom.setImage( a_mail.animation_base.frames[6] );
		a_mail.left_bottom.scaleAll( options.scale );

		var i ;
		for( i = 0; i < options.mail_width - 1 ; i++ ){ 
			a_mail.middle_top.push( new jaws.Sprite({ x: options.x + options.tile_width * options.scale + i * options.tile_width * options.scale , y: options.y + 0 }) );
			a_mail.middle_top[i].setImage( a_mail.animation_base.frames[1] );
			a_mail.middle_top[i].scaleAll( options.scale );
			
			a_mail.middle_bottom.push( new jaws.Sprite({ x: options.x + options.tile_width * options.scale + i * options.tile_width *options.scale, y: options.y  }) ); // should be 'y' + w * h unit
			a_mail.middle_bottom[i].setImage( a_mail.animation_base.frames[7] );
			a_mail.middle_bottom[i].scaleAll( options.scale );
		}

		a_mail.right_top = new jaws.Sprite({ x: options.x + i * options.tile_width * options.scale , y: options.y + 0 });
		a_mail.right_top.setImage( a_mail.animation_base.frames[2] );
		a_mail.right_top.scaleAll( options.scale );
		
		a_mail.right_bottom = new jaws.Sprite({ x: options.x + i * options.tile_width * options.scale , y: options.y + 0 }); // shoud be 'y' + 1 unit
		a_mail.right_bottom.setImage( a_mail.animation_base.frames[8] );
		a_mail.right_bottom.scaleAll( options.scale );
	}
	
	a_mail.addMessage = function( str ){
		if( a_mail.index == -1 ) a_mail.index = 0;
	
		a_mail.messages.push( str );
	}
	
	a_mail.draw = function(){
		a_mail.left_bottom.draw();
		a_mail.middle_bottom.forEach( function( item ){ item.draw(); } );
		a_mail.right_bottom.draw();
		
		a_mail.text_current.draw();
	}
	
	a_mail.show = function(){
		a_mail.isHidding = false;
		a_mail.isShowing = true;
	}
	
	a_mail.hide = function(){
		a_mail.isHidding = true;
		a_mail.isShowing = false;
	}
	
	a_mail.update = function(){
		var da = 0.04; // delta animation
		
		if( a_mail.isHidding ){
			a_mail.left_bottom.alpha -= da;
			a_mail.middle_bottom.forEach( function( item ){ item.alpha -= da; } );
			a_mail.right_bottom.alpha -= da;
			
			a_mail.text_current.alpha -= da;
			
			if( a_mail.text_current.alpha <= 0 ){
				a_mail.left_bottom.alpha = 0;
				a_mail.middle_bottom.forEach( function( item ){ item.alpha = 0; } );
				a_mail.right_bottom.alpha = 0;
				
				a_mail.text_current.alpha = 0;
				
				a_mail.isHidding = false;
			}
		}
		
		if( a_mail.isShowing ){
			a_mail.left_bottom.alpha += da;
			a_mail.middle_bottom.forEach( function( item ){ item.alpha += da; } );
			a_mail.right_bottom.alpha += da;
			
			a_mail.text_current.alpha += da;
			if( a_mail.text_current.alpha >= 1 ){
				a_mail.left_bottom.alpha = 1;
				a_mail.middle_bottom.forEach( function( item ){ item.alpha = 1; } );
				a_mail.right_bottom.alpha = 1;
				
				a_mail.text_current.alpha = 1;
				
				a_mail.isShowing = false;
			}
		}

	}
	
	return a_mail;
}