define(['utils', 'GS'], function (Utils, GS) {

	var bindings = [{
		element: '.select-all',
		event: 'click',
		handler: selectAll
	}, {
		element: '#accountList input[type="checkbox"]',
		event: 'change',
		handler: function () {
			var operate = this.checked ? 'add' : 'remove';
			syncSelect(this.name, this.value, operate);
		}
	}];

	function init(query) {
		Utils.bindEvents(bindings);
		var valueString = decodeURI(query.value);
		console.log(valueString);
		$$('#accountList input[type="checkbox"]').each(function () {
			if (valueString.indexOf(this.value) !== -1) {
				this.checked = true;
			}
		});
	}

	function selectAll() {
		var options = $$('#accountList input[type="checkbox"]'),
			values = [],
			source,
			finalValue,
			sourceLink;

		options.each(function () {
			source = $$('#accountContent input[name="' + this.name + '"]');
			this.checked = true;
			values.push(this.value);
			finalValue = values.join(' ');
			source.val(finalValue);
			source[0].checked = finalValue.length === 0 ? false : true;
			sourceLink = source.next()[0];
			replaceQuery(sourceLink, finalValue);
		});


	}

	function syncSelect(name, value, operate) {
		var source = $$('#accountContent input[name="' + name + '"]'),
			sourceLink,
			finalValue;

		source.each(function () {
			if (operate === 'add') {
				addValue(this, value);
			} else if (operate === 'remove') {
				removeValue(this, value);
			}

			finalValue = this.value;
			this.checked = finalValue.length === 0 ? false : true;
			sourceLink = $$(this).next()[0];
			replaceQuery(sourceLink, finalValue);
		});
	}

	function addValue(target, value) {
		if (typeof target.value === 'undefined') return;

		if (target.value.length === 0) {
			$$(target).val(value);
		} else {
			var values = target.value.split(' ');

			if (values.indexOf(value) === -1) {
				values.push(value);
			}

			$$(target).val(values.join(' '));
		}
	}

	function removeValue(target, value) {
		var values = target.value.split(' ');

		if (values.indexOf(value) !== -1) {
			if (values.length === 1) {
				$$(target).val('');
			} else {
				var valueReverse = [];
				values.map(function (v, i) {
					if (v !== value) {
						valueReverse.push(v);
					}
				});
				$$(target).val(valueReverse.join(' '));
			}
		}
	}

	function replaceQuery(link, str) {
		var queryPattern = '?value=';

		link.search = queryPattern + str;
	}

	return {
		init: init
	};
});
