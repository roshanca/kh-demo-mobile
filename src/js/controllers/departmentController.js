define(['views/departmentView', 'GS'], function (View, GS) {

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

		laodRecDepartment();
	}

	function laodRecDepartment() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/department.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderName(data.model.recDepartment);
					khApp.hideIndicator();
				}
			}
		});
	}

	function selectFromNearby() {
		startSelect('nearbySelect', 'api/department_near.json');
	}

	function selectFromAll() {
		startSelect('allSelect', 'api/department_all.json');
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
			type: 'POST',
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
		$$(window).off('resize', window.bind_resize);
		mainView.loadPage('collect.html');
	}

	return {
		init: init
	};
});
