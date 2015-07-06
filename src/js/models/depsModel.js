define([], function () {

	var storage = [];

	function save(data) {
		storage.push(data);
	}

	function saved() {
		var result = fetch();
		return result.length > 0;
	}

	function fetch() {
		return storage;
	}

	function fetchProv() {
		var data = [];
		var provList = storage[0];

		for (var i = 0; i < provList.length; i++) {
			data.push(provList[i].prov);
		}

		return fmt(data);
	}

	function fetchCity(prov) {
		var data = [];
		var provList = storage[0];
		var cityList;

		for (var i = 0; i < provList.length; i++) {
			if (provList[i].prov === prov) {
				cityList = provList[i].cityList;
				break;
			}
		}

		for (var j = 0; j < cityList.length; j++) {
			data.push(cityList[j].city);
		}

		return fmt(data);
	}

	// function fetchDeps(city) {
	// 	var data = [];
	// 	var provList = storage[0].provList;
	// 	var depsList;

	// 	for (var i = 0; i < provList.length; i++) {
	// 		for (var j = 0, l = provList[i].cityList.length; j < l; j++) {
	// 			if (provList[i].cityList[j].city === city) {
	// 				depsList = provList[i].cityList[j].depsList;
	// 			}
	// 		}
	// 	}

	// 	for (var k = 0; k < depsList.length; k++) {
	// 		data.push(depsList[k].deps);
	// 	}

	// 	return fmt(data);
	// }

    function fetchDeps(city, callback) {
        $$.ajax({
            url: 'api/deps.json',
            type: 'GET',
            success: function (data) {
                data = JSON.parse(data);
                if (data.errorNo === 0) {
                    var itemList = [];

                    for (var i = 0; i < data.orgList.length; i++) {
                        var branch_name = data.orgList[i].branch_name;
                        var branch_no = data.orgList[i].branch_no;

                        itemList.push({
                            'item': branch_name,
                            'value': branch_no
                        });
                    }

                    if (callback) {
                      callback(itemList);
                    }
                }
            }
        });
    }

	function fmt(data) {
		if (data instanceof Array) {
			var fmtList = [];
			for (var i = 0, l = data.length; i < l; i++) {
				fmtList.push({'item': data[i]});
			}

			return fmtList;
		} else {
			return '';
		}
	}

	function destroy() {
		storage = [];
	}

	return {
		save: save,
		saved: saved,
	    destroy: destroy,
		fetchProv: fetchProv,
		fetchCity: fetchCity,
		fetchDeps: fetchDeps
	};
});