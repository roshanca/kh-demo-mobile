define([], function () {
	var typeData = [
		{type: '1', name: 'kh', title: '新开户', explain: '我是新入市投资者，还没有股东账户'},
		{type: '3', name: 'zh', title: '转户', explain: '我已有股东账户，已撤销指定交易和完成转托管'},
		{type: '5', name: 'lch', title: '理财户', explain: '无论有没有在其他券商开立股东账户，都可开立理财户'}
	];

	var typeArray = window.appParams.openType;
	var currentTypeData = [];

	for (var i = 0; i < typeArray.length; i++) {
		for (var j = 0; j < typeData.length; j++) {
			if (typeArray[i] === typeData[j].type) {
				currentTypeData.push(typeData[j]);
			}
		}
	}

	function getCurrentTypeData() {
		return currentTypeData;
	}

	function getTypeData(type) {
		for (var i = 0; i < typeData.length; i++) {
			if (type === typeData[i].type) {
				return typeData[i];
			}
		}
	}

	function setStartPage() {
		if (typeArray.length > 1) {
			return 'guide.html';
		} else if (typeArray.length === 1) {
			return 'login.html?type=' + currentTypeData[0].type;
		}
	}

	return {
		getCurrentTypeData: getCurrentTypeData,
		getTypeData: getTypeData,
		setStartPage: setStartPage
	};
});
