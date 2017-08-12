var noProduceImageURL = 'imgs/pizza.svg';
var notInSeasonText = 'Nope!';
var inSeasonText = 'Yes';
var produceFullText = '%name% are in season during %seasons%.';
var currentSeason;

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

	currentSeason = getSeason(new Date().getMonth() + 1);

	inputField.keyup(inputKeyup);

	produceCard.hide();
});

// Called on keyup on the produce name input field
function inputKeyup(event)
{
	var query = $(this).val().toLowerCase().trim();

	// if the query is blank, hide the card and return
	if(query == "")
	{
		produceCard.hide();
		return;
	}
	else
		matchingProduce = getProduce(query);


	// If there's one or more matching produce items, update the card
	if(matchingProduce.length >= 1)
	{
		produceCard.show();
		currentProduce = matchingProduce[0];

		// Check if the produce is in season
		if(currentProduce.seasons.indexOf(currentSeason) > -1)
		{
			produceStatus.text(inSeasonText);
			produceCard.removeClass('not-season').addClass('in-season');
		}
		else
		{
			produceStatus.text(notInSeasonText);
			produceCard.removeClass('in-season').addClass('not-season');
		}

		// Update the text
		produceSeasonText.text(produceFullText.replace('%name%', currentProduce.name)
			.replace('%seasons%', arrayToSentence(currentProduce.seasons)));

		// Update the image, using the noProduceImageURL if there isn't one
		if(currentProduce.img)
			produceImage.attr('src', currentProduce.img);
		else
			produceImage.attr('src', noProduceImageURL);
	}
	else
	{
		produceCard.hide();
	}
}

// Converts an array into a list in sentence form
// using an oxford comma if needed
function arrayToSentence (arr) {

	if(arr.length > 2)
	{
		var last = arr.pop();
		return arr.join(', ') + ', and ' + last;
	}
	else
		return arr.join(' and ');
}

// Returns produce matching the input query
function getProduce(query)
{
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

	return matchingProduce;
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