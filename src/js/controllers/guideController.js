define(['views/guideView'], function (View) {

	var bindings = [{
		element: '.label',
		event: 'click',
		handler: switchCard
	}, {
		element: '.action a',
		event: 'click',
		handler: jumpPage
	}];

	function init() {
		View.render({
			bindings: bindings
		});

		setDefaultCard();
	}

	function switchCard() {
		var currentLabel = $$(this);
		var currentClass = $$(this).attr('class').split(' ')[1];
		var targetClass = getTargetClass();
		var targetLabel = $$('.label.' + targetClass);

		var currentCard = $$('.card.' + targetClass);
		var targetCard = $$('.card.' + currentClass);

		disableLabel();
		cardHandle(currentCard, targetCard);
		labelHandle(currentLabel, targetLabel);
	}

	/**
	 * 设置默认的 card
	 */
	function setDefaultCard() {
		var targetClass = getTargetClass();
		var defaultCard = $$('.card.' + targetClass);
		// console.log(targetClass);
		showCard(defaultCard);
	}

	/**
	 * 获得 card 的有效显示区域（除去 label 的部分）
	 * @return {Number} card visual height
	 */
	function getCardVisualHeiht() {
		var bodyHeight = $$('body').height();
		var labelsHeight = $$('.labels').outerHeight();

		return bodyHeight - labelsHeight;
	}

	/**
	 * 显示 card
	 * @param  {f7Object} card
	 */
	function showCard(card) {
		var visualHeight = getCardVisualHeiht();

		card.css('opacity', 100);
		card.css('margin-top', (visualHeight - card.outerHeight()) / 2 + 'px');
	}

	/**
	 * 隐藏 card
	 * @param  {f7Object} card
	 */
	function hideCard(card) {
		card.css('opacity', 0);
		card.css('margin-top', '-100%');
		card.transitionEnd(function () {
			$$(this).css('margin-top', '800px');
			enableLabel();
		});
	}

	/**
	 * card 的处理方法
	 * @param  {f7Object} currentCard 当前 card, 需隐藏
	 * @param  {f7Object} targetCard  目标 card, 需显示
	 */
	function cardHandle(currentCard, targetCard) {
		showCard(targetCard);
		hideCard(currentCard);
	}

	/**
	 * 锁定 label, 使其无法点击，避免频繁点击造成 card 的定位错误
	 */
	function disableLabel() {
		$$('.label').attr('disabled', 'disabled');
	}

	/**
	 * 解锁 label
	 */
	function enableLabel() {
		$$('.label').removeAttr('disabled');
	}

	function jumpPage() {
		var param = $$(this).data('type');
		// console.log(param);
		mainView.loadPage('login.html?type=' + param);
	}

	/**
	 * label 的处理方法
	 * @param  {f7Object} currentLabel 当前点中的 label, 需隐藏
	 * @param  {f7Object} targetLabel  目标 label, 需显示
	 */
	function labelHandle(currentLabel, targetLabel) {
		var currentBottom = $$(currentLabel).css('bottom');
		var currentZindex = $$(currentLabel).css('z-index');
		var targetBottom = targetLabel.css('bottom');
		var targetZindex = targetLabel.css('z-index');

		currentLabel.css('bottom', targetBottom);
		currentLabel.css('z-index', targetZindex);

		targetLabel.css('bottom', currentBottom);
		targetLabel.css('z-index', currentZindex);
	}

	/**
	 * 获取当前不可见的 label 的 Class: kh, zh, lc
	 * @return {String} class
	 */
	function getTargetClass() {
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

	return {
		init: init
	};
});
