define(['views/accountView'], function (View) {

	var bindings = [{
		element: '.select-all',
		event: 'click',
		handler: selectAll
	}, {
		element: '#accountList input[type="checkbox"]',
		event: 'change',
		handler: syncSelect
	}];

	function init(query) {
		var valueString = decodeURI(query.value);
		var title = query.title;

		View.renderTitle(title);

		$$.ajax({
			url: 'api/account.json',
			type: 'GET',
			data: {title: title},
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model,
						bindings: bindings
					});
					$$('#accountList input[type="checkbox"]').each(function () {
						if (valueString.indexOf(this.value) !== -1) {
							this.checked = true;
						}
					});
				}
			}
		});
	}

	function selectAll() {
		var options = $$('#accountList input[type="checkbox"]'),
			values = [],
			source,
			finalValue;

		options.each(function () {
			source = $$('#signContent input[name="' + this.name + '"]');
			this.checked = true;
			values.push(this.value);
			finalValue = values.join(' ');
			source.val(finalValue);
			source[0].checked = finalValue.length === 0 ? false : true;
		});
	}

	function syncSelect() {
		var source = $$('#signContent input[name="' + this.name + '"]'),
			target = this,
			value = this.value,
			finalValue;

		source.each(function () {
			target.checked ? add(this, value) : remove(this, value);

			finalValue = this.value;
			this.checked = finalValue.length === 0 ? false : true;
		});
	}

	function add(target, value) {
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

	function remove(target, value) {
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

	return {
		init: init
	};
});
