var floors = {"A": "L2",
			  "B": "L1",
			  "C": "G",
			  "D": "1",
              "E": "2",
			  "F": "3"};


function getQueryVariable(variable) {
	let query = window.location.search.substring(1);
	let vars = query.split('&');
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	console.log('Query variable %s not found', variable);
}

function getDirectionTokens() {
	let value = getQueryVariable("dirs");
	return value.split(',');
}

function generateDirs() {
	let i = 0;
	let tokens = getDirectionTokens();
	let directions = [];
	for (i = 0; i < tokens.length; i++) {
		let token = tokens[i];
		let direction = {};
		switch(token.substring(0,1)) {
			case "A":
				direction.text = "Walk straight for " + token.substring(1) + " ft.";
				direction.image = "continue.svg";
				break;
			case "B":
				direction.text = "Turn left and walk for " + token.substring(1) + " ft.";
				direction.image = "turn_left.svg";
				break;
			case "C":
				direction.text = "Turn slightly left and walk for " + token.substring(1) + " ft.";
				direction.image = "turn_slight_left.svg";
				break;
			case "D":
				direction.text = "Turn sharply left and walk for " + token.substring(1) + " ft.";
				direction.image = "turn_sharp_left.svg";
				break;
			case "E":
				direction.text = "Turn right and walk for " + token.substring(1) + " ft.";
				direction.image = "turn_right.svg";
				break;
			case "F":
				direction.text = "Turn slightly right and walk for " + token.substring(1) + " ft.";
				direction.image = "turn_slight_right.svg";
				break;
			case "G":
				direction.text = "Turn sharply right and walk for " + token.substring(1) + " ft.";
				direction.image = "turn_sharp_right.svg";
				break;
			case "H":
				direction.text = "Turn around and walk for " + token.substring(1) + " ft.";
				direction.image = "uturn.svg";
				break;
			case "I":
				direction.text = "Walk to the elevator.\n";
				break;
			case "J":
				direction.text = "Walk to the stairs.\n";
				break;
			case "N":
				direction.text = "Take the elevator up from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				break;
			case "O":
				direction.text = "Take the elevator down from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				break;
			case "P":
				direction.text = "Take the stairs up from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				break;
			case "Q":
				direction.text = "Take the stairs down from floor " + floors[token.substring(1,2)] + " to floor " + floors[token.substring(2,3)];
				break;
			case "S":
				direction.text = "Walk north for " + token.substring(1) + " ft.";
				break;
			case "T":
				direction.text = "Walk north west for " + token.substring(1) + " ft.";
				break;
			case "U":
				direction.text = "Walk west for " + token.substring(1) + " ft.";
				break;
			case "V":
				direction.text = "Walk south west for " + token.substring(1) + " ft.";
				break;
			case "W":
				direction.text = "Walk south for " + token.substring(1) + " ft.";
				break;
			case "X":
				direction.text = "Walk south east for " + token.substring(1) + " ft.";
				break;
			case "Y":
				direction.text = "Walk east for " + token.substring(1) + " ft.";
				break;
			case "Z":
				direction.text = "Walk north east for " + token.substring(1) + " ft.";
				break;
			default:
				direction.text = "Houston we have a problem";
				break;
		}

		directions.push(direction);

		let table = document.getElementById("dir_table");
		if (direction.image !== undefined) {
			table.innerHTML += "\n" +
				"        <tr>\n" +
				"          <td scope=\"row\"><img src='images\\" + direction.image + "' \></td>\n" +
				"          <td>" + direction.text + "</td>\n" +
				"        </tr>";
		} else {
			table.innerHTML += "\n" +
				"        <tr>\n" +
				"          <td scope=\"row\"></td>\n" +
				"          <td>" + direction.text + "</td>\n" +
				"        </tr>";
		}
	}
}