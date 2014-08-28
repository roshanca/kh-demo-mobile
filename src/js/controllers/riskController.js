define(['views/riskView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.risk-submit-button',
		event: 'click',
		handler: resultSubmit
	}, {
		element: '.topic-option',
		event: 'click',
		handler: autoNext
	}];

	var afterBindings = [{
		element: '.risk-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	var navbar_height = $$('.navbar').outerHeight();

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/risk.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var model = data.model;
					View.render({
						bindings: bindings,
						model: model
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	/**
	 * 滚动至对应的题目
	 * @param  {Number|String} index 题目的序列号
	 * @return {void}
	 */
	function scrollToTopic(index) {
		var topic = $$('#topic_' + index);
		var offset = topic[0].offsetTop;
		var gutter = parseInt(topic.css('margin-top'), 10) + navbar_height;

		$$('#riskContent').scrollTop(offset - gutter, 200);
	}

	/**
	 * 点击题目选项自动滚动到下一题
	 * @return {void}
	 */
	function autoNext() {
		var index = $$(this).data('index');
		if (index === 'multi') return; // 多选不滚动

		var nextIndex = +index + 1;
		setTimeout((function (_this) {
			return function () {
				var checked = $$(_this).find('input:checked');
				if (checked.length > 0) {
					scrollToTopic(nextIndex);
				}
			}
		})(this), 200);
	}

	/**
	 * 检查题目是否做完
	 * @return {Array} 未做完题目的序列号
	 */
	function checkAll() {
		var result = [];

		$$('.topic-options').each(function (index) {
			var checked = $$(this).find('input:checked');
			if (checked.length === 0) {
				result.push(index + 1);
			}
		});

		return result;
	}

	/**
	 * 格式化评测答案
	 * @return {Object} 格式化后的数据
	 */
	function formatAnswers() {
		// resultData 为 {question_no: value} 的 Object 组
		// value 可能为 String 类型（单选），也可能为数组（多选）
		var resultData = khApp.formToJSON('#riskForm');
		var resultArray = [];
		var answers;

		for (var i in resultData) {
			var _result;
			if (resultData[i] instanceof Array) {
				_result = i + '&' + resultData[i].join('^');
			} else {
				_result = i + '&' + resultData[i];
			}
			resultArray.push(_result);
		}

		// 最终格式为：question_no&value|question_no&value|question_no&value^&value...
		answers = resultArray.join('|');
		return answers;
	}

	function resultSubmit() {
		var errIndex = checkAll();

		if (errIndex.length > 0) {
			khApp.alert('第' + errIndex[0] + '道题没完成', function () {
				scrollToTopic(errIndex[0]);
			});
			return;
		}

		var answers = formatAnswers();

		khApp.showIndicator();
		$$.ajax({
			url: 'api/risk_result.json',
			type: 'POST',
			data: {'answers': answers},
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderPopup({
						model: data.model,
						bindings: afterBindings
					});
					khApp.popup('.popup');
				}
				khApp.hideIndicator();
			}
		});
	}

	function nextSubmit() {
		khApp.closeModal();
		mainView.loadPage('review.html');
	}

	return {
		init: init
	};
});
