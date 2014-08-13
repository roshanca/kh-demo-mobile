define([], function () {

	function init() {
		var links = document.querySelectorAll('a');

		for (var i = 0, l = links.length; i < l; i++) {
			(function (index) {
				return links[index].addEventListener('click', function () {
					var type = this.getAttribute('data-type');
					jumpPage(type);
				}, false);
			})(i);
		}
	}

	function jumpPage(param) {
		mainView.loadPage('login.html?type=' + param);
	}

	return {
		init: init
	};
});
