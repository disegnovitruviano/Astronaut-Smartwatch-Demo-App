angular.module('Watch')
    .factory('AppState', function ($interval) {
        var currentState = {
            isNewTimerCountdown: false,
            server: null,
            events: {
                current: null,
                next: null
            },
            currentScreen: '',
            activeRole: 'ISS CDR',
            event: {},
            alert: {},
            uuid: Uuid.create(),
            time: moment(),
            networkUsed: false,
            networkError: false
        };

        currentState.getActiveRole = function () {
            return currentState.activeRole;
        };

        currentState.getTimer = function (index) {
            return currentState.timersInfo.get(index);
        };

        currentState.setActive = function (index, active) {
            currentState.timersInfo.setActive(index, active);
        };

        currentState.isActive = function (index) {
            return currentState.timersInfo.isActive(index);
        };

        currentState.removeTimer = function (index) {
            currentState.timersInfo.remove(index);
        };

        currentState.totalTimers = function () {
            return currentState.timersInfo.count();
        };

        currentState.isNewCountdown = function () {
            return currentState.isNewTimerCountdown;
        };

        currentState.setNewCountdown = function (isCountdown) {
            currentState.isNewTimerCountdown = isCountdown;
        };

        currentState.getServer = function () {
            return currentState.server;
        };

        currentState.setServer = function (server) {
            currentState.server = server;
        };

        currentState.setTime = function (time) {
            currentState.time = time;
        };

        currentState.getTime = function () {
            return currentState.time;
        };

        currentState.setNetworkUsed = function (isUsed) {
            currentState.networkUsed = isUsed;
            if (isUsed) {
                currentState.networkError = false;
            }
        };

        currentState.isNetworkUsed = function () {
            return currentState.networkUsed;
        };

        currentState.setNetworkError = function () {
            currentState.networkUsed = false;
            currentState.networkError = true;
        };

        currentState.isNetworkError = function () {
            return currentState.networkError;
        };

        $interval(function () {
            currentState.setTime(currentState.getTime().add(1, 's'));
        }, 1000);

        return currentState;
    })
    .controller('SetupServerCtrl', function ($rootScope, $scope, AppState) {
        $scope.server = {
            url: "10.0.0.75:3000"
        };

        $scope.save = function () {
            AppState.setServer($scope.server.url);
            tau.changePage('dashboard');
        }
    });