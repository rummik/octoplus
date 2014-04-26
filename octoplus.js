(function() {
'use strict';

var $notifications = $('.discussion-sidebar-item.sidebar-notifications');

if (!$notifications)
	return false;

console.log('OCTOPLUS POWERS...ACTIVATE!');


var stargazers = {};
$('.js-discussion .js-comment-container').each(function() {
	var $this = $(this);

	if ($this.find('img[alt=":+1:"], img[alt=":thumbsup:"]').length || /\W\+\d\W/.test($this.text())) {
		var $avatar = $this.find('.js-avatar');
		var name = $this.find('.author').text();

		stargazers[name] = {
			id: $avatar.data('user'),
			avatar: $avatar.attr('src'),
			url: $avatar.parent().attr('href').substr(1),
			username: name,
			displayname: $avatar.attr('alt'),
		};
	}
});

var stargazerCount = Object.keys(stargazers).length;
var $stargazers = $(
	'<div class="discussion-sidebar-item sidebar-stargazing" id="js-users-stargazers">' +
		'<div class="participation">' +
			'<h3 class="discussion-sidebar-heading">' +
				stargazerCount + ' stargazer' + (stargazerCount == 1 ? '' : 's') +
			'</h3>' +
			'<div class="participation-avatars">' +
			'</div>' +
		'</div>' +
	'</div>' +

	'<div id="pr_stargazers_box" style="display:none">' +
		'<h2 class="facebox-header">People starring this issue</h2>' +
		'<ul class="facebox-user-list">' +
		'</ul>' +
	'</div>'

);

$stargazers.insertAfter($notifications);


var $avatars = $stargazers.find('.participation-avatars');
var $facebox = $stargazers.find('.facebox-user-list');

Object.keys(stargazers).forEach(function(name, n) {
	var stargazer = stargazers[name];

	$facebox.append($(
		'<li class="facebox-user-list-item">' +
			'<img alt="' + stargazer.displayname + '" class=" js-avatar" data-user="' + stargazer.id + '" height="24" src="' + stargazer.avatar + '" width="24" />' +
			'<a href="' + stargazer.url + '">' + stargazer.username + '</a>' +
		'</li>'
	));

	if (n < 20) {
		$avatars.append($(
			'<a class="participant-avatar tooltipped tooltipped-s" aria-label="' + stargazer.username + '" href="' + stargazer.url + '">' +
				'<img alt="' + stargazer.displayname + '" class="avatar js-avatar" data-user="' + stargazer.id + '" height="20" src="' + stargazer.avatar + '" width="20" />' +
			'</a>'
		));
	}
});

if (Object.keys(stargazers).length > 20)
	$avatars.append('<a class="participation-more" href="#pr_stargazers_box" rel="facebox">...</a>');



/*var $stargazing = $(
	'<div class="discussion-sidebar-item sidebar-stargazing">' +
		'<h3 class="discussion-sidebar-heading">Stargazing</h3>' +
		'<div class="thread-stargazing-status js-thread-stargazing-status js-updatable-content">' +
			'<form>' +
				'<button class="minibutton" type="submit" data-disable-width>' +
					'<span class="octicon octicon-star-add"></span> <span>Star</span>' +
				'</button>' +
			'</form>' +

			'<p class="reason">You haven\'t starred this.</p>' +
		'</div>' +
	'</div>'
);

$stargazing.insertAfter($notifications);

$stargazing.find('form').submit(function(event) {
	event.preventDefault();

	var $this = $(this);
	var $text = $this.find('button span:not(.octicon)');
	var $octicon = $this.find('button span.octicon');
	var $reason = $stargazing.find('.reason');

	switch ($text.text().toLowerCase()) {
		case 'star':
			// add +1 to thread

			$reason.text("You've starred this.");

			$text.text('Unstar');
			$octicon.removeClass('octicon-star-add')
			        .addClass('octicon-star-delete');
			break;

		case 'unstar':
			// remove +1 from thread unless there's a message attached
			// if there's a message attached we should scroll and provide
			// some kind of notice to the user about how they should
			// remove it manually

			$reason.text("You haven't starred this.");

			$text.text('Star');
			$octicon.removeClass('octicon-star-delete')
			        .addClass('octicon-star-add');
			break;
	}
});*/

})();
