function getQueryVariable(variable) {
	let query = window.location.search.substring(1);
	let vars = query.split('&');
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) === variable) {
			return decodeURIComponent(pair[1]).replaceAll("$", " ").replaceAll("|", "&");
		}
	}
	console.log('Query variable %s not found', variable);
}


String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};