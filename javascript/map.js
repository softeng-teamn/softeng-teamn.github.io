let canvas = document.getElementById('mapCanvas'), /// canvas element
	ctx = canvas.getContext('2d');            /// context
let f1 = new Image;
let f2 = new Image;
let f3 = new Image;
let f4 = new Image;
let g = new Image;
let l1 = new Image;
let l2 = new Image;

/// start image loading, when done draw and setup
f2.onload = start;
f1.src = 'images/F1.png';
f2.src = 'images/F2.png';
f3.src = 'images/F3.png';
f4.src = 'images/F4.png';
g.src = 'images/ground.png';
l1.src = 'images/L1.png';
l2.src = 'images/L2.png';

let scale = 5;

function parsePath() {
	let params = getQueryVariable("dirs").split(",");

	let i = 0;
	while(params[i] !== ";") i++;
	i++;

	let pathByFloor = {};

	for(i; i < params.length; i++) {
		let value = params[i];

		if (value === ";") break;

		let data = value.split(";");
		let x = parseInt(data[0]);
		let y = parseInt(data[1]);
		let floor = data[2];

		if (pathByFloor[floor] === undefined) {
			pathByFloor[floor] = [];
		}
		pathByFloor[floor].push({"x": x, "y": y});
	}

	return pathByFloor;
}

function parseSegments() {
	let params = getQueryVariable("dirs").split(",");

	let i = 0;
	while(params[i] !== ";") i++;
	i++;
	while(params[i] !== ";") i++;
	i++;

	let segments = [];
	for(i; i < params.length; i++) {
		segments.push(parseInt(params[i]));
	}

	segments.unshift(1);

	return segments;
}

let path = parsePath();
let segments = parseSegments();

function start() {
	/// initial draw of image
	ctx.drawImage(f2, 0, 0, 5000/scale, 3400/scale);
	drawPath("2");
}

function switchFloor(floor) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	switch (floor) {
		case "1":
			ctx.drawImage(f1, 0, 0, 5000/scale, 3400/scale);
			break;
		case "2":
			ctx.drawImage(f2, 0, 0, 5000/scale, 3400/scale);
			break;
		case "3":
			ctx.drawImage(f3, 0, 0, 5000/scale, 3400/scale);
			break;
		case "4":
			ctx.drawImage(f4, 0, 0, 5000/scale, 3400/scale);
			break;
		case "G":
			ctx.drawImage(g, 0, 0, 5000/scale, 3400/scale);
			break;
		case "L1":
			ctx.drawImage(l1, 0, 0, 5000/scale, 3400/scale);
			break;
		case "L2":
			ctx.drawImage(l2, 0, 0, 5000/scale, 3400/scale);
			break;
	}
	drawPath(floor);
}


$(window).resize(function(){
	let canvas = $('#mapCanvas');
	canvas.height(canvas.width() / 1.471);
});

let colors = ["RED", "BLUE", "BLACK", "GREEN"];

function drawPath(floorToDraw) {
	let segCount = 3;
	let edgeCount = 0;
	Object.keys(path).forEach(function(key) {
		let segment = path[key];
		let floor = key.split("-")[0];

		if (segment.length > 0) {

			let point = segment[0];

			for(let i = 1; i < segment.length; i++) {
				let point2 = segment[i];

				if (floor === floorToDraw) {
					ctx.beginPath();
					ctx.moveTo(point.x / scale, point.y / scale);
					ctx.lineTo(point2.x / scale, point2.y / scale);
					ctx.lineWidth = 2;
					ctx.strokeStyle = colors[segCount % 4];
					ctx.stroke();
				}

				point = point2;

				edgeCount++;

				if(edgeCount === segments[segCount]) {
					segCount++;
					edgeCount = 0;
				}


			}
		}
	});
}