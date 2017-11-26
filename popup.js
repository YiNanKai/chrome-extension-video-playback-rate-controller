angular.module("app", [])
	.controller("ctrl", function ($scope) {
		$scope.selectedType = { "ppt": true, "docx": true, "pdf": true };
		function isSelectedType(type) {
			return $scope.selectedType[type];
		}
		$scope.checkBoxChange = function () {
			var res = allResults.filter(function (data, index) {
				return $scope.selectedType[data.type];
			})
			$scope.results = res;
			$scope.$apply();
		}
		var allResults;
		chrome.tabs.query({
			active: true
		}, function (tabs) {
			var tab = tabs[0];
			tab_title = tab.title;
			chrome.tabs.executeScript(tab.id, {
				file: 'dom.js'
			}, function () {
				chrome.tabs.sendRequest(tab.id, { type: "pdf, ppt" }, function (results) {
					allResults = results;
					
					$scope.results = results;
					$scope.$apply();

				});
			});
		});
	})