var noProduceImageURL = 'imgs/pizza.svg';

// DOM Elements populated later
var inputField;
var produceCard;
var produceImage;
var produceStatus;
var produceSeasonText;

$(document).ready(function()
{
	inputField = $('.text-fruitVeg');
	produceCard = $('#card'); // the card element to update
	produceImage = $('#card .fruit-image'); // the image in the card
	produceStatus = $('#card .status');
	produceSeasonText = $('#card .seasons-subtext');

	console.log('Current season: ' + getSeason(new Date().getMonth() + 1));

	inputField.keyup(inputKeyup);

	produceCard.hide();
});

// Called on keyup on the produce name input field
function inputKeyup(event)
{
	var query = $(this).val().toLowerCase();

	// Iterate through produce and check for matching names
	var produceItem, produceName;
	var matchingProduce = [];
	for(key in produce)
	{
		produceItem = produce[key];
		produceName = produceItem.name.toLowerCase();

		if(produceName.includes(query))
			matchingProduce.push(produceItem);
	}

	// If there's one or more matching produce items, update the card
	if(matchingProduce.length >= 1)
	{
		produceCard.show();

		// Update the image, using the noProduceImageURL if there isn't one
		if(matchingProduce[0].img)
			produceImage.attr('src', matchingProduce[0].img);
		else
			produceImage.attr('src', noProduceImageURL);
	}
	else
	{
		produceCard.hide();
	}
}

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