let canvas = document.getElementById('mapCanvas'), /// canvas element
	ctx = canvas.getContext('2d');            /// context
let f1 = new Image;
let f2 = new Image;
let f3 = new Image;
let f4 = new Image;
let g = new Image;
let l1 = new Image;
let l2 = new Image;


let tempCanvas=document.createElement("canvas");
let tctx=tempCanvas.getContext("2d");

/// start image loading, when done draw and setup
f2.onload = start;
f1.src = 'images/F1.png';
f2.src = 'images/F2.png';
f3.src = 'images/F3.png';
f4.src = 'images/F4.png';
g.src = 'images/ground.png';
l1.src = 'images/L1.png';
l2.src = 'images/L2.png';

function parsePath() {
	let params = getQueryVariable("dirs").split(",");

	let i = 0;
	while(params[i] !== ";") i++;
	i++;

	let pathByFloor = {};

	for(i; i < params.length; i++) {
		let value = params[i];
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

let path = parsePath();

function start() {
	/// initial draw of image
	ctx.drawImage(f2, 0, 0, 500, 340);
	drawPath("2");
}

function switchFloor(floor) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	switch (floor) {
		case "1":
			ctx.drawImage(f1, 0, 0, 500, 340);
			break;
		case "2":
			ctx.drawImage(f2, 0, 0, 500, 340);
			break;
		case "3":
			ctx.drawImage(f3, 0, 0, 500, 340);
			break;
		case "4":
			ctx.drawImage(f4, 0, 0, 500, 340);
			break;
		case "G":
			ctx.drawImage(g, 0, 0, 500, 340);
			break;
		case "L1":
			ctx.drawImage(l1, 0, 0, 500, 340);
			break;
		case "L2":
			ctx.drawImage(l2, 0, 0, 500, 340);
			break;
	}
	drawPath(floor);
}


$(window).resize(function(){
	let canvas = $('#mapCanvas');
	canvas.height(canvas.width() / 1.471);
});

function drawPath(floorToDraw) {
	Object.keys(path).forEach(function(key) {
		let segment = path[key];
		let floor = key.split("-")[0];

		if (floor === floorToDraw && segment.length > 0) {
			ctx.beginPath();

			let point = segment[0];

			ctx.moveTo(point.x/10.0, point.y/10.0);

			for(let i = 1; i < segment.length; i++) {
				point = segment[i];
				ctx.lineTo(point.x/10, point.y/10);
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	});
}