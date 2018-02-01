'use strict';

/**
 * Style.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function extJS_setStyle() {
	let date = new Date();
	let hours = date.getHours();
	let elID = '#section-main';

	if (0 <= hours && hours < 5) {
		$(elID).addClass('is-dark');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}

	if (5 <= hours && hours < 11) {
		$(elID).addClass('is-light');
		particlesJS.load('particles-js', 'engine/scripts/particles.dark.json');
	}

	if (11 <= hours && hours < 16) {
		$(elID).addClass('is-info');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}

	if (16 <= hours && hours < 22) {
		$(elID).addClass('is-info');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}

	if (22 <= hours && hours <= 24) {
		$(elID).addClass('is-dark');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}
}

/**
 * jPlayer.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function extJS_initJPlayer() {
	let streamTitle = 'Radio W.T.F. - Live Stream';
	let streamURL = 'https://stream.radio.wtf/live';

	let jPRadioStream = {
		title: streamTitle,
		mp3: streamURL
	};

	let ready = false;

	$('#jp-init-radio').jPlayer({
		ready: function (event) {
			ready = true;
			$(this).jPlayer('setMedia', jPRadioStream);
		},
		pause: function () {
			$(this).jPlayer('clearMedia');
		},
		error: function (event) {
			if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
				$(this).jPlayer('setMedia', jPRadioStream).jPlayer('play');
			}
		},
		cssSelectorAncestor: '#jp-container-radio',
		swfPath: '',
		supplied: 'mp3',
		preload: 'none',
		wmode: 'window',
		useStateClassSkin: true,
		autoBlur: false,
		keyEnabled: true
	});
}

/**
 * Stats.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function extJS_initStats() {
	let getJSON = 'https://stream.radio.wtf/radio.status.json.xsl';
	let updateTime = 2000;

	$.ajax({
		url: getJSON,
		method: 'GET',
		dataType: 'json',
		cache: false,
	}).done(function (data) {
		let server = data.server;
		let streams = server.streams;
		let nonstop = streams['/nonstop'];
		let live = streams['/live'];
		let stream;

		if (live === undefined || !live.name) {
			stream = nonstop;
		} else {
			stream = live;
		}

		let $elStreamName = $('#ice-stream-name');
		let $elStreamListeners = $('#ice-stream-listeners');
		let $elStreamTitle = $('#ice-stream-title');
		let $elStreamGenre = $('#ice-stream-genre');

		let streamName = stream.name;
		let streamListeners = stream.listeners;
		let streamTitle = stream.title;
		let streamGenre = stream.genre;

		$elStreamName.empty().text(streamName);
		$elStreamListeners.empty().text(streamListeners);
		$elStreamTitle.empty().text(streamTitle);
		$elStreamGenre.empty().text(streamGenre);
	});

	setTimeout(extJS_initStats, updateTime);
}

/**
 * Loading functions.
 * ---------------------------------------------------------------------------------------------------------------------
 */

$(function () {
	$(window).on('load', function () {
	});
	extJS_setStyle();
	extJS_initJPlayer();
	extJS_initStats();
});