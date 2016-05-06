angular.module("Watch")
    .controller("NotificationsCtrl", function ($rootScope, $scope, AppState) {
        $scope.vibrationPattern = {
            'event': [600],
            'aos': [150, 50, 150, 50, 150],
            'Caution': [400, 200, 400],
            'Warning': [250, 200],
            'Emergency': [200, 100],
            'Advisory': [200]
        };

        $scope.activeNotifications = [];

        $rootScope.$on('push', function (event, message) {
            if (message.data && message.data.controlNotification && !message.data.notify) {
                return;
            }

            switch (message.type) {
                case 'alert':
                    if (!message.data.notify) {
                        return;
                    }
                    $scope.activeNotifications.push({
                        type: alert,
                        title: message.data.title,
                        time: message.data.time,
                        extra: message.data
                    });
                    $scope.main = message.data;
                    $scope.main.type = message.type;
                    $scope.main.time = message.data.time;
                    break;
                case 'upload-alerts':
                    var lastAlert = message.data[message.data.length - 1];
                    $scope.activeNotifications = $scope.activeNotifications.concat(message.data);
                    $scope.main = lastAlert;
                    $scope.main.type = message.type;
                    $scope.main.time = lastAlert.time;
                    break;
                case 'event':
                    $scope.activeNotifications.push({
                        type: 'event',
                        title: message.data.name,
                        time: message.data.date + " " + message.data.time,
                        extra: message.data
                    });
                    $scope.main = message.data;
                    $scope.main.title = message.data.name;
                    $scope.main.type = message.type;
                    $scope.main.time = message.data.date + " " + message.data.startTime;
                    break;
                case 'upload-events':
                    var lastEvent = message.data[message.data.length - 1];
                    $scope.activeNotifications = $scope.activeNotifications.concat(message.data);
                    $scope.main = lastEvent;
                    $scope.main.title = lastEvent.name;
                    $scope.main.type = message.type;
                    $scope.main.time = lastEvent.date + " " + lastEvent.startTime;
                    break;
                default:
                    return;
            }

            if (($scope.main.type == 'alert' || $scope.main.type == 'upload-alerts')
                && ($scope.main.status == 'Emergency' || $scope.main.status == 'Warning')) {
                $scope.repeatVibration($scope.main.status);
            } else if (navigator.vibrate) {
                $scope.stopVibration();
                var pattern;
                if ($scope.main.type == 'alert' || $scope.main.type == 'upload-alerts') {
                    pattern = $scope.vibrationPattern[$scope.main.status];
                } else {
                    pattern = $scope.vibrationPattern[$scope.main.type];
                }

                if (pattern) {
                    navigator.vibrate(pattern);
                }
            }
        });

        $scope.onBgClick = function (scope, e) {
            if ($scope.main) {
                $scope.dismiss_();
            }
        };

        $scope.repeatVibration = function (status) {
            $scope.stopVibration();

            var delay = $scope.vibrationPattern[status][0] + $scope.vibrationPattern[status][1];

            if (navigator.vibrate) {
                $scope.vibrateInterval = setInterval(function () {
                    navigator.vibrate($scope.vibrationPattern[status]);
                }, delay);
            }

        };

        $scope.stopVibration = function () {
            if (navigator.vibrate) {
                navigator.vibrate(0);
            }
            clearInterval($scope.vibrateInterval);
            if (navigator.vibrate) {
                navigator.vibrate(0);
            }
        };

        $scope.mainClick = function ($event) {
            tau.changePage('hsectionchangerPage');

            switch ($scope.main.type) {
                case 'alert':
                case 'upload-alerts':
                    AppState.alert = $scope.main;
                    AppState.currentScreen = 'alert-details';
                    tau.changePage('alert-details');
                    break;
                case 'event':
                case 'upload-events':
                    AppState.event = $scope.main;
                    AppState.currentScreen = 'event-details';
                    tau.changePage('event-details');
                    break;
                case 'comms:':
                    var sectionChanger = document.getElementById("sectionchanger");
                    sectionChanger.setActiveSection(3);
                    break
            }

            $scope.dismiss_($event);
        };

        $scope.moreClick = function ($event) {
            $scope.dismiss_($event);

            tau.changePage('hsectionchangerPage');
            var sectionChanger = document.getElementById("sectionchanger");
            sectionChanger.setActiveSection(3);
        };

        $scope.dismiss_ = function () {
            $scope.main = null;
            $scope.activeNotifications.splice(0, $scope.activeNotifications.length);

            if ($scope.vibrateInterval) {
                clearInterval($scope.vibrateInterval);
                $scope.vibrateInterval = null;
            }

            $scope.stopVibration();
        };
    });