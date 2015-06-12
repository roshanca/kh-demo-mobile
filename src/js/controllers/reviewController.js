define(['views/reviewView'], function (View) {

	var bindings = [{
		element: '.review-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.select-trigger',
		event: 'click',
		handler: selectTrigger
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/review.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var model = data.model;
					View.render({
						model: model,
						bindings: bindings
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	function nextSubmit() {
		var checked = checkDefault();

		// 检查不通过就 return 掉
		if (checked.length > 0) {
			khApp.alert(checked[0].warn);
			return;
		}

		// resultData 为 {question_no: value} 的 Object 组
		var resultData = khApp.formToJSON('#reviewContent');
		var resultArray = [];
		var answers;

		for (var i in resultData) {
			var _result = i + '&' + resultData[i];
			resultArray.push(_result);
		}

		// 最终格式为：question_no&value|question_no&value|question_no&value...
		answers = resultArray.join('|');
		mainView.loadPage('result.html');
	}

	/**
	 * 点击跟随选择
	 * @return {void}
	 */
	function selectTrigger() {
		var radio = $$(this).parent().find('input[type=radio]');
		var value = radio[0].value;

		radio[0].checked = true;
	}

	/**
	 * 检查选择是否为默认
	 * @return {Array} 返回错误序列与错误信息
	 */
	function checkDefault() {
		var result = [];

		$$('.default').each(function (index) {
			if (!this.checked) {
				var warn = $$(this).data('warn');
				result.push({
					index: index + 1,
					warn: warn
				});
			}
		});

		return result;
	}

	return {
		init: init
	};
});
