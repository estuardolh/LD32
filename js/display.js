/*
options.cell_size: cell size of items in display
options.x: display x position in canvas
options.y display y position in canvas
*/
function display( options = null ){
	var a_display = {};
	a_display.map = [];
	a_display.options = options;

	/* scalle all
	*/
	a_display.scaleAll = function( factor ){
		a_display.map.forEach( function( item ){
			item.scaleAll( factor );
		} );
		
		a_display.map.forEach( function( item ){
			item.setX( item.x * factor );
			item.setY( item.y * factor );
		} );
		
		a_display.map.cell_size = [ a_display.options.cell_size[0] * factor, a_display.options.cell_size[1] * factor ];
	}
	
	/* add a Sprite like item in row
	*/
	a_display.addItem = function( sprite ){
		sprite.x = options.x + a_display.map.length * options.cell_size[0];
		sprite.y = options.y;
		a_display.map.push( sprite );
	}
	
	/* update all items in map
	*/
	a_display.update = function(){
		a_display.map.forEach( function( item ){
			item.update();
		});
	}
	
	/* draw all items in map
	*/
	a_display.draw = function(){
		a_display.map.forEach( function( item ){
			item.draw();
		});
	}
	
	return a_display;
}