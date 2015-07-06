define(['views/cityView', 'models/depsModel'], function (View, Model) {

	var bindings = [{
		element: '#cityList .item-link',
		event: 'click',
		handler: selectCity
	}];

	function init(query) {
        var prov = decodeURIComponent(query.prov);
		var cityData = Model.fetchCity(prov);

		View.render({
			model: cityData,
			bindings: bindings
		});
	}

	function selectCity() {
		var city = $$(this).find('.item-title').html();
        city = encodeURIComponent(city);
		mainView.loadPage('select/deps.html?city=' + city);
	}

	return {
		init: init
	};
});
