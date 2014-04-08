function tm_node(value, path, tags) {
	this.value = value !== undefined ? value : null;
	this.path = path !== undefined ? path : null;
	this.tags = tags !== undefined ? tags : null;
}

function tm_collection() {
	this.nodes = [];
	
	this.push = function(node) { 
		this.nodes.push(node); 
	};
	
	this.value = function() {
		var list = [];
		for (var i in this.nodes) 
			list.push(this.nodes[i].value);
		return list;
	};
}

var tm_paths = {},
	tm_tags = {},
	tm_root = '$';

/*
* ex: tag(value, 'root.media', ['movie', 'fun', 'tags!']);
*/
var tag = function (value, path, tags) {
	var node = new tm_node(value, path, tags);
	
	// check if this is a new route
	if (tm_paths[path] === undefined) 
		tm_paths[path] = new tm_collection();

	// add node to path
	tm_paths[path].push(node);
	
	// add node to tags
	for (var i in tags) {
		var tag = tags[i];
		// check if this is a new tag
		if (tm_tags[tag] === undefined) 
			tm_tags[tag] = new tm_collection();
		
		// add to tags
		tm_tags[tag].push(node);
	}
};

var find = function (path) {
	if (tm_paths[path] === undefined)
		return null;
	
	return tm_paths[path].value();
};

var match = function (tags) {
	var t = tags[0];
	
	if (tm_tags[t] === undefined)
		return null;
	
	return tm_tags[t].value();
};

tag('1', null, ['t', 's']);
tag('2', 'a', ['s']);
tag('3', 'a.b', ['t', 'v']);
tag('4', 'a.b.c', ['t']);

console.log(find('a.b'));
console.log(match(['s']));
console.log(match(['t']));