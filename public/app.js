/**
 * Created by Owais on 10/16/2016.
 */

angular.module('serveBox', ['ngCookies'])

    .controller('appCtrl', function($scope, $http, $cookies){

        //Initialization.
        $scope.user = {email: '', password: ''};
        $scope.isLoggedIn =  !!$cookies.get('Token');
        $scope.login = function(form){
            if(form.$valid){
                $http.post('/login ', $scope.user).then(function(res){
                        $cookies.put('Token', res.data.token);
                        window.location.assign("/");
                },
                function(err){
                    console.log("err", err)
                });
            }
        };

        $scope.logout = function(){
            $cookies.remove('Token');
        }
    });
