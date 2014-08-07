define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function showPhotoFront(url) {
		$$('#cardFront').html('<img src=' + url + ' alt="" height="160">');
	}

	function showPhotoBack(url) {
		$$('#cardBack').html('<img src=' + url + ' alt="" height="160">');
	}

	function replaceQueryId(id) {
		var protocalLink = document.querySelector('#protocalLink');
		protocalLink.search = '?econtract_id=' + id;
	}

	return {
		render: render,
		showPhotoFront: showPhotoFront,
		showPhotoBack: showPhotoBack,
		replaceQueryId: replaceQueryId
	};
});
