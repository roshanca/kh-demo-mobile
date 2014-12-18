define(['views/guideView'], function (View) {

	var bindings = [{
		element: '.label',
		event: 'click',
		handler: switchType
	}, {
		element: '.action a',
		event: 'click',
		handler: jumpPage
	}];

	var timers = {};

	function init() {
		View.render({
			bindings: bindings
		});

		setup();
	}

	function setup() {
		var defaultCard = $$('.card.kh');
		showCard(defaultCard);
	}

	function getCardVisualHeiht() {
		var bodyHeight = $$('body').height();
		var labelsHeight = $$('.labels').outerHeight();

		return bodyHeight - labelsHeight;
	}

	function showCard(card) {
		// $$('.card').css('opacity', 0);
		// card.css('opacity', 100);
		setCardPosition(card);
	}

	function setCardPosition(card) {
		var bodyHeight = $$('body').height();
		var visualHeight = getCardVisualHeiht();

		$$('.card').css('margin-top', bodyHeight + 'px');
		card.css('margin-top', (visualHeight - card.outerHeight()) / 2 + 'px');
	}

	function jumpPage() {
		var param = $$(this).data('type');
		// console.log(param);
		mainView.loadPage('login.html?type=' + param);
	}

	function switchType() {
		var thisLabel = $$(this);
		var thisLabelCalss = thisLabel.attr('class').split(' ')[1];
		var invisibleLabelClass = getInvisibleLabelClass();
		var invisibleLabel = $$('.label.' + invisibleLabelClass);
		var targetCard = $$('.card.' + thisLabelCalss);

		$$('.label').attr('disabled', 'disabled');

		arrangeOrder(thisLabel, invisibleLabel);
		timers.label = setTimeout(function () {
			arrangePosition(thisLabel, invisibleLabel);
		}, 200);

		timers.card = setTimeout(function () {
			showCard(targetCard);
			$$('.label').removeAttr('disabled');
		}, 500);
	}

	function arrangeOrder(thisLabel, invisibleLabel) {
		var thisLabelZindex = thisLabel.css('z-index');
		var invisibleLabelZindex = invisibleLabel.css('z-index');

		thisLabel.css('z-index', invisibleLabelZindex);
		invisibleLabel.css('z-index', thisLabelZindex);
	}

	function arrangePosition(thisLabel, invisibleLabel) {
		var thisLabelBottom = thisLabel.css('bottom');
		var invisibleLabelBottom = invisibleLabel.css('bottom');

		thisLabel.css('bottom', invisibleLabelBottom);
		invisibleLabel.css('bottom', thisLabelBottom);
	}

	/**
	 * 获取当前不可见的 label 的 Class: kh, zh, lc
	 * @return {String} class
	 */
	function getInvisibleLabelClass() {
		var arr = [];

		$$('.label').each(function () {
			var len = arr.length;
			var bottom = parseInt($$(this).css('bottom'));
			var cls = $$(this).attr('class').split(' ')[1];

			if (!len) {
				arr.push({
					cls: cls,
					bottom: bottom
				});
			} else {
				// 上一个 bottom 比这个 bottom 大，
				// 说明这个 bottom 出现在更加底部
				if (arr[0].bottom > bottom) {
					arr.pop(arr[0]);
					arr.push({
						cls: cls,
						bottom: bottom
					});
				}
			}
		});

		// console.log(arr);
		return arr[0].cls;
	}

	function clearTimer() {
		for (var task in timers) {
			timers[task] && clearTimeout(timers[task]);
		}
	}

	return {
		init: init
	};
});
