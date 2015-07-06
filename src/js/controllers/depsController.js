define(['views/depsView', 'models/depsModel'], function (View, Model) {

	var bindings = [{
		element: '#depsList .label-radio',
		event: 'click',
		handler: selectDeps
	}];

	function init(query) {
        var city = decodeURIComponent(query.city);
		Model.fetchDeps(city, function (data) {
            View.render({
                model: data,
                bindings: bindings
            });
        });
	}

	function selectDeps() {
		var depsno = $$(this).find('input').val();
        var depsname = $$(this).find('.item-title').text();

        mainView.reloadPage('department.html?depsname=' + depsname + '&depsno=' + depsno);
	}

	return {
		init: init
	};
});
