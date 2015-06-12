define(['views/guideView', 'services/openTypeService'], function (View, OTS) {

	var model = {
		openTypes: OTS.getCurrentTypeData()
	};

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
			model: model,
			bindings: bindings
		});

		setupLabels();
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
	 * 组织 labels
	 */
	function setupLabels() {
		var labelLineHeight = parseInt($$('.label').css('line-height'));
		var size = model.openTypes.length;

		$$('.labels').css('height', labelLineHeight * (size - 1) + 'px');
		$$('.label').each(function (i) {
			$$(this).css('top', labelLineHeight * (size - 1 - i) + 'px');
			$$(this).css('z-index', 99 - i);
		});
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
		var labelsHeight = $$('.labels').height();

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
			$$(this).css('margin-top', '200%');
			setTimeout(enableLabel, 100); // 确保动画完成后再使 label 可点
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
		var currentTop = $$(currentLabel).css('top');
		var currentZindex = $$(currentLabel).css('z-index');
		var targetTop = targetLabel.css('top');
		var targetZindex = targetLabel.css('z-index');

		currentLabel.css('top', targetTop);
		currentLabel.css('z-index', targetZindex);

		targetLabel.css('top', currentTop);
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
			var top = parseInt($$(this).css('top'));
			var cls = $$(this).attr('class').split(' ')[1];

			if (!len) {
				arr.push({
					cls: cls,
					top: top
				});
			} else {
				// which one is lower? we want the lower one
				if (arr[0].top < top) {
					arr.pop(arr[0]);
					arr.push({
						cls: cls,
						top: top
					});
				}
			}
		});

		return arr[0].cls;
	}

	return {
		init: init
	};
});
