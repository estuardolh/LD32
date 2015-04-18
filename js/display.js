function display( options = null ){
	var map = new jaws.TileMap({ size: [ options.items_count + options.left, 2 ], cell_size: options.cell_size });
	
	for( var r = 0; r < options.items_count ; r += 1 ){
		var xx = options.left * options.cell_size[0] + r * options.cell_size[0];
		
		map.push( new jaws.Sprite({ image: "./img/heart.png", x: xx, y: options.cell_size[1] }) );
	}
	
	map.ini_count = options.items_count;
	
	return map;
}