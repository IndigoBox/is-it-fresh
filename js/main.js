var noProduceImageURL = 'imgs/placeholder.svg';
var notInSeasonText = 'Nope!';
var inSeasonText = 'Yes';
var produceFullText = '%name% are in season during %seasons%.';
var currentSeason;
var currentProduce; // produce item being shown right now
var animations = {};
var animationIntervalId;

// DOM Elements populated later
var inputField;
var produceCard;
var produceImage;
var produceStatus;
var produceSeasonText;

$(document).ready(function()
{
	inputField = $('.text-produce');
	produceCard = $('#main-card'); // the card element to update
	produceImage = $('#main-card .fruit-image'); // the image in the card
	produceStatus = $('#main-card .status');
	produceSeasonText = $('#main-card .seasons-subtext');

	currentSeason = getSeason(new Date().getMonth() + 1);

	inputField.keyup(inputKeyup);

	setupAnimations();
	animationIntervalId = setInterval(playRandomAnimation, 3000);
});

// Sets up all of the anime.js animations used
function setupAnimations()
{
	animations['avocado'] = anime({
		targets: '.fruit-cont #avocado',
		rotate: 360,
		autoplay: false,
		duration: 1500
	});
	animations['lemon'] = anime({
		targets: '.fruit-cont #lemon',
		rotate: 360,
		autoplay: false,
		duration: 1500
	});
	animations['watermelon'] = anime({
		targets: '.fruit-cont #watermelon',
		rotate: 360,
		autoplay: false,
		duration: 1500
	});
	animations['tomato'] = anime({
		targets: '.fruit-cont #tomato',
		rotate: 360,
		autoplay: false,
		duration: 1500
	});

	// Setup initial card position
	$('#main-card').css('transform', 'translateY(200px)');

	animations['card'] = anime({
		targets: '#main-card',
		opacity: 1,
		translateY: 0,
		duration: 1000,
		autoplay: false
	});

}

function playRandomAnimation()
{
	var max = Object.keys(animations).length - 1;
	var animationId = getRandomRange(0, max);
	animations[Object.keys(animations)[animationId]].restart();

	function getRandomRange(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
}

// Called on keyup on the produce name input field
function inputKeyup(event)
{
	var query = $(this).val().toLowerCase().trim();

	if($('.fruit-cont:visible').length > 0) {
		$('.fruit-cont').hide();
		clearInterval(animationIntervalId);
	}

	// if the query is blank, hide the card and return
	if(query == "")
	{
		produceCard.fadeOut();
		return;
	}
	else
		matchingProduce = getProduce(query);


	// If there's one or more matching produce items (that are not the currentProduce) update the card
	if(matchingProduce.length >= 1 && currentProduce != matchingProduce[0])
	{
		produceCard.show();
		animations['card'].restart();
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
	else if(matchingProduce.length == 0) // hide the card if there's no results
	{
		produceCard.fadeOut();
	}
}

// Converts an array into a list in sentence form
// using an oxford comma if needed
function arrayToSentence (arrayIn)
{
	var arr = arrayIn.slice(); // shallow copy array to prevent editing it

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

		// Find produce that has a word starting with the query
		if(produceName.startsWith(query) || produceName.indexOf(' ' + query) > -1)
			matchingProduce.push(produceItem);
	}

	return matchingProduce;
}

// Get season based on a month number
// Uses the typical calendar month numbers (1-12)
// not JS months (0-11)
function getSeason(month)
{
	season = '';

	switch(month)
	{
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