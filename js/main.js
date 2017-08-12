$(document).ready(function()
{
	console.log("Current season: " + getSeason(new Date().getMonth() + 1));
});

// Get season based on a month number
// Uses the typical calendar month numbers (1-12)
// not JS months (0-11)
function getSeason(month) {
	season = '';

	switch(month) {
		case 12:
		case 1:
		case 2:
			season = 'winter';
			break;
		case 3:
		case 4:
		case 5:
			season = 'spring';
			break;
		case 6:
		case 7:
		case 8:
			season = 'summer';
			break;
		case 9:
		case 10:
		case 11:
			season = 'fall';
			break;
	}

	return season;
}