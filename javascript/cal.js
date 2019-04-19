let ename;
let eloc;
let eorg;
let starttime;
let endtime;

function generateCal() {
	ename = getQueryVariable("eventName");
	eloc = getQueryVariable("eventLocation");
	eorg = getQueryVariable("eventOrganizer");
	starttime = new Date(parseInt(getQueryVariable("startTime")) *1000); // in Unix epoch
	endtime = new Date(parseInt(getQueryVariable("endTime")) * 1000); // in Unix epoch

	document.getElementById("event_name").innerHTML = ename;
	document.getElementById("event_location").innerHTML = eloc;
	document.getElementById("event_organizer").innerHTML = eorg;

	document.getElementById("event_date").innerHTML = starttime.toLocaleDateString();
	document.getElementById("start_time").innerHTML = formatTime(starttime);
	document.getElementById("end_time").innerText = formatTime(endtime);
}

function downloadIcal() {
	let msg = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nORGANIZER;CN=" + eorg + "\nDTSTART:" + convertDateToICS(starttime) + "\nDTEND:" + convertDateToICS(endtime) + "\nSUMMARY:" + ename + "\nLOCATION:" + eloc + "\nEND:VEVENT\nEND:VCALENDAR";
	window.open( "data:text/calendar;charset=utf8," + encodeURIComponent(msg));
}

function convertDateToICS(date) {
	let pre =
		date.getFullYear().toString() +
		((date.getMonth() + 1)<10? "0" + (date.getMonth() + 1).toString():(date.getMonth() + 1).toString()) +
		((date.getDate() + 1)<10? "0" + date.getDate().toString():date.getDate().toString());

	let post = date.getHours().toString() + date.getMinutes().toString() + "00";

	return pre + "T" + post;
}

function formatTime(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}