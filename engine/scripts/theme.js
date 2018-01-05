'use strict';

/**
 * Bulma.
 * ---------------------------------------------------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', function () {
	function getAll(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
	}

	let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach(function ($el) {
			$el.addEventListener('click', function () {
				let target = $el.dataset.target;
				let $target = document.getElementById(target);
				$el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}

	let rootEl = document.documentElement;
	let $modals = getAll('.modal');
	let $modalButtons = getAll('.modal-button');
	let $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

	if ($modalButtons.length > 0) {
		$modalButtons.forEach(function ($el) {
			$el.addEventListener('click', function () {
				let target = $el.dataset.target;
				let $target = document.getElementById(target);
				rootEl.classList.add('is-clipped');
				$target.classList.add('is-active');
			});
		});
	}

	if ($modalCloses.length > 0) {
		$modalCloses.forEach(function ($el) {
			$el.addEventListener('click', function () {
				closeModals();
			});
		});
	}

	document.addEventListener('keydown', function (event) {
		let e = event || window.event;
		if (e.keyCode === 27) {
			closeModals();
			closeDropdowns();
		}
	});

	function closeModals() {
		rootEl.classList.remove('is-clipped');
		$modals.forEach(function ($el) {
			$el.classList.remove('is-active');
		});
	}
});

/**
 * Style.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function extJS_setStyle() {
	let date = new Date();
	let hours = date.getHours();
	let elID = '#section-info';

	if (0 <= hours && hours < 5) {
		jQuery(elID).addClass('is-dark');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}

	if (5 <= hours && hours < 11) {
		jQuery(elID).addClass('is-light');
		particlesJS.load('particles-js', 'engine/scripts/particles.dark.json');
	}

	if (11 <= hours && hours < 16) {
		jQuery(elID).addClass('is-info');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}

	if (16 <= hours && hours < 22) {
		jQuery(elID).addClass('is-info');
		particlesJS.load('particles-js', 'engine/scripts/particles.light.json');
	}

	if (22 <= hours && hours <= 24) {
		jQuery(elID).addClass('is-dark');
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

	jQuery('#jp-init-radio').jPlayer({
		ready: function (event) {
			ready = true;
			jQuery(this).jPlayer('setMedia', jPRadioStream);
		},
		pause: function () {
			jQuery(this).jPlayer('clearMedia');
		},
		error: function (event) {
			if (ready && event.jPlayer.error.type === jQuery.jPlayer.error.URL_NOT_SET) {
				jQuery(this).jPlayer('setMedia', jPRadioStream).jPlayer('play');
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

	jQuery.ajax({
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

		let $elStreamName = jQuery('#ice-stream-name');
		let $elStreamListeners = jQuery('#ice-stream-listeners');
		let $elStreamTitle = jQuery('#ice-stream-title');
		let $elStreamGenre = jQuery('#ice-stream-genre');

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

jQuery(window).on('load', function () {
});

jQuery(document).ready(function () {
	extJS_setStyle();
	extJS_initJPlayer();
	extJS_initStats();
});