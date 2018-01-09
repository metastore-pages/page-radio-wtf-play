'use strict';

/**
 * Bulma.
 * ---------------------------------------------------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', function () {
	function getAll(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
	}

	let $dropdowns = getAll('.dropdown:not(.is-hoverable)');

	if ($dropdowns.length > 0) {
		$dropdowns.forEach(function ($el) {
			$el.addEventListener('click', function (event) {
				event.stopPropagation();
				$el.classList.toggle('is-active');
			});
		});

		document.addEventListener('click', function (event) {
			closeDropdowns();
		});
	}

	function closeDropdowns() {
		$dropdowns.forEach(function ($el) {
			$el.classList.remove('is-active');
		});
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
