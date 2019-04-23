var floors = {"A": "L2",
			  "B": "L1",
			  "C": "G",
			  "D": "1",
              "E": "2",
			  "F": "3",
              "G": "4",
			  "H": "FL"};

function getDirectionTokens() {
	let value = getQueryVariable("dirs");
	return value.split(',');
}

function generateSVG(segId) {
	let pathTemplate = "<path class='ants' style='fill: none;stroke: {color};stroke-width: 16px;' d='{coords}'/>";
	let svg = "<svg xmlns='http://www.w3.org/2000/svg' width='350' height='238' viewBox='{translateX} {translateY} 350 238'><defs><pattern id='img{id}' width='1000px' height='680px' patternUnits='userSpaceOnUse'><image href='{image}'/></pattern></defs><g transform='scale(1)'><rect width='5000' height='3400' style='fill:url(#img{id})'/></g><g transform='scale(.2)'>{path}</g></svg>";

	let id = Math.floor(Math.random() * 9999999999999);

	svg = svg.replaceAll("{id}", id);

	let floor = "";
	let segCountForId = -1;
	let x1, y1, x2, y2;

	let segCount = 2;
	let edgeCount = 0;

	let svgPathsBySegment = {};

	for (const key of Object.keys(path)) {
		let floorSet = path[key];
		let thisFloor = key.split("-")[0];

		let pathCoords = "";

		for(let i = 0; i < floorSet.length; i++) {
			if(segCount - 2 === segId && edgeCount === 0) {
				x1 = floorSet[i].x;
				y1 = floorSet[i].y;
				floor = thisFloor;
				segCountForId = segments[segCount];

				pathCoords = "M" + floorSet[i].x + " " + floorSet[i].y;
			} else if(segCount - 2 === segId) {
				pathCoords += "L" + floorSet[i].x + " " + floorSet[i].y;
			} else if(edgeCount === 0) {
				pathCoords = "M" + floorSet[i].x + " " + floorSet[i].y;
			} else {
				pathCoords += "L" + floorSet[i].x + " " + floorSet[i].y;
			}

			edgeCount++;

			if(edgeCount === segments[segCount]) {
				if(segCount - 2 === segId) {
					x2 = floorSet[i].x;
					y2 = floorSet[i].y;
				}
				if(i < floorSet.length -1)
				pathCoords += "L" + floorSet[i+1].x + " " + floorSet[i+1].y;

				if (svgPathsBySegment[key] === undefined) {
					svgPathsBySegment[key] = "";
				}

				if(segCount - 2 === segId) {
					svgPathsBySegment[key] += pathTemplate.replace("{color}", "#1060C0").replace("{coords}", pathCoords);
				} else {
					svgPathsBySegment[key] += pathTemplate.replace("{color}", "#AAA").replace("{coords}", pathCoords);
				}
				pathCoords = "";

				segCount++;
				edgeCount = 0;
			}
		}
	}

	let svgPath = "";
	for (const key of Object.keys(svgPathsBySegment)) {
		let svgPathSegment = svgPathsBySegment[key];
		let thisFloor = key.split("-")[0];
		if (thisFloor === floor) {
			svgPath += svgPathSegment;
		}
	}

	svg = svg.replace("{path}", svgPath);

	let centerX = (x2 + x1) / 2;
	let centerY = (y2 + y1) / 2;

	svg = svg.replace("{translateX}", "" + ((centerX / 5) - 350/2));
	svg = svg.replace("{translateY}", "" + ((centerY / 5) - 238/2));

	switch(floor) {
		case "1":
			svg = svg.replace("{image}", "images/F1.png");
			break;
		case "2":
			svg = svg.replace("{image}", "images/F2.png");
			break;
		case "3":
			svg = svg.replace("{image}", "images/F3.png");
			break;
		case "4":
			svg = svg.replace("{image}", "images/F4.png");
			break;
		case "G":
			svg = svg.replace("{image}", "images/ground.png");
			break;
		case "L1":
			svg = svg.replace("{image}", "images/L1.png");
			break;
		case "L2":
			svg = svg.replace("{image}", "images/L2.png");
			break;
		case "FL":
			return;
	}

	return svg;
}

function generateDirs() {
	let i = 0;
	let tokens = getDirectionTokens();
	let directions = [];
	let j = 0;
	for (i = 0; i < tokens.length; i++) {
		let token = tokens[i];

		if(tokens[i + 1] === ";" || i === (tokens.length - 1)) break;

		token = token.replaceAll("$", " ");
		let direction = {};
		let isElevatorOrStairs = false;
		switch(token.substring(0,1)) {
			case "A":
				direction.text = "Walk straight for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "continue.svg";
				break;
			case "B":
				direction.text = "Turn left and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "turn_left.svg";
				break;
			case "C":
				direction.text = "Turn slightly left and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "turn_slight_left.svg";
				break;
			case "D":
				direction.text = "Turn sharply left and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "turn_sharp_left.svg";
				break;
			case "E":
				direction.text = "Turn right and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "turn_right.svg";
				break;
			case "F":
				direction.text = "Turn slightly right and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "turn_slight_right.svg";
				break;
			case "G":
				direction.text = "Turn sharply right and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "turn_sharp_right.svg";
				break;
			case "H":
				direction.text = "Turn around and walk for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "uturn.svg";
				break;
			case "I":
				direction.text = "Walk to the elevator.\n";
				direction.image = "pedestrian-walking.svg";
				break;
			case "J":
				direction.text = "Walk to the stairs.\n";
				direction.image = "pedestrian-walking.svg";
				break;
			case "N":
				direction.text = "Take the elevator up from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				direction.image = "elevator.svg";
				isElevatorOrStairs = true;
				break;
			case "O":
				direction.text = "Take the elevator down from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				direction.image = "elevator.svg";
				isElevatorOrStairs = true;
				break;
			case "P":
				direction.text = "Take the stairs up from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				direction.image = "stairs-up.svg";
				isElevatorOrStairs = true;
				break;
			case "Q":
				direction.text = "Take the stairs down from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				direction.image = "stairs-down.svg";
				isElevatorOrStairs = true;
				break;
			case "S":
				direction.text = "Walk north for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "T":
				direction.text = "Walk north west for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "U":
				direction.text = "Walk west for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "V":
				direction.text = "Walk south west for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "W":
				direction.text = "Walk south for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "X":
				direction.text = "Walk south east for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "Y":
				direction.text = "Walk east for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			case "Z":
				direction.text = "Walk north east for " + parseInt(token.substring(1, 6)) + " ft. " + token.substring(6);
				direction.image = "pedestrian-walking.svg";
				break;
			default:
				direction.text = "Houston we have a problem";
				break;
		}

		directions.push(direction);

		let table = document.getElementById("dir_table");
		let caro = document.getElementById("carousel");
		if (direction.image !== undefined) {
			if (isElevatorOrStairs) {
				table.innerHTML += "\n" +
					"        <tr>\n" +
					"          <td scope=\"row\"><img width='20px' height='20px' src='images\\" + direction.image + "' \></td>\n" +
					"          <td>" + direction.text + "</td>\n" +
					"        </tr>";


				if (i === 0) {
					caro.innerHTML += "<div class='carousel-item active'> <img style='max-width: 100%; max-height: 100%' src='images\\"
						+ direction.image +
						"'> <svg width='100%' height='20%'><rect fill='#fff' width='100%' height='20%'></rect></svg><div class='carousel-caption'> <h5>"
						+ direction.text
						+ "</h5> </div>"
				} else {
					caro.innerHTML += "<div class=\"carousel-item\"> <img style=\"max-width: 100%; max-height: 100%\" src='images\\" + direction.image + "'> <svg fill='#fff' width='100%' height='20%'><rect width='100%' height='20%'></rect></svg><div class=\"carousel-caption\"> <h5>" + direction.text + "</h5> </div>"
				}
			} else {
				table.innerHTML += "\n" +
					"        <tr class='view'>\n" +
					"          <td scope=\"row\"><img width='20px' height='20px' src='images\\" + direction.image + "' \></td>\n" +
					"          <td>" + direction.text + "</td>\n" +
					"        </tr>" +
					"		<tr class='fold'><td colspan=\"7\">\n" +
					"        <div class=\"fold-content\">" +
					generateSVG(j) +
					"</div></td></tr>";




				if (i === 0) {
					caro.innerHTML += `<div class='carousel-item active'> ${generateSVG(j)} <svg width='100%' height='20%'><rect fill='#fff' width='100%' height='20%'></rect></svg><div class='carousel-caption'> <h5>${direction.text}</h5></div>`
				} else {
					caro.innerHTML += `<div class="carousel-item">${generateSVG(j)}<svg fill='#fff' width='100%' height='20%'><rect width='100%' height='20%'></rect></svg><div class="carousel-caption"> <h5>${direction.text}</h5> </div>`
				}
			}
			j++;


		} else {
			table.innerHTML += "\n" +
				"        <tr>\n" +
				"          <td scope=\"row\"></td>\n" +
				"          <td>" + direction.text + "</td>\n" +
				"        </tr>";
		}



		$(function(){
			$(".fold-table tr.view").on("click", function(){
				$(this).toggleClass("open").next(".fold").toggleClass("open");
			});
		});
	}
}

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