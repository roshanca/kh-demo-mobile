define(['views/departmentView'], function (View) {

	var bindings = [{
		element: '.department-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.nearby-link',
		event: 'click',
		handler: selectFromNearby
	}, {
		element: '.all-link',
		event: 'click',
		handler: selectFromAll
	}];

	var afterBindings = [{
		element: '[name=nearby]',
		event: 'change',
		handler: selectedName
	}, {
		element: '[name=all]',
		event: 'change',
		handler: selectedName
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function selectFromNearby() {
		startSelect('nearbySelect', 'api/deps-near.json');
	}

	function selectFromAll() {
		startSelect('allSelect', 'api/deps-all.json');
	}

	function startSelect(id, url) {
		var isSelectLocal = $$('#' + id)[0];
		if (isSelectLocal) {
			openSelect(id);
		} else {
			remoteSelect(id, url);
		}
	}

	function remoteSelect(id, url) {
		var _id = id;
		khApp.showIndicator();
		$$.ajax({
			url: url,
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderSelect({
						bindings: afterBindings,
						model: data.model
					});
					khApp.hideIndicator();
					openSelect(_id);
				}
			}
		});
	}

	function openSelect(id) {
		khApp.smartSelectOpen('#' + id);
	}

	function selectedName() {
		var selectedText = this.options[this.selectedIndex].text;
		View.renderName(selectedText);
		View.renderBadge();
	}

	function nextSubmit() {
		mainView.loadPage('collect.html');
	}

	return {
		init: init
	};
});
