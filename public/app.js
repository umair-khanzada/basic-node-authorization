/**
 * Created by Owais on 10/16/2016.
 */

angular.module('serveBox', ['ngCookies'])

    .controller('appCtrl', function($scope, $http, $cookies){

        //Initialization.
        $scope.user = {email: '', password: ''};        //user obj.
        $scope.isLoggedIn =  !!$cookies.get('Token');       //check user is login.

        $scope.login = function(form){
            if(form.$valid){
                $http.post('/login ', $scope.user).then(function(res){
                        $cookies.put('Token', res.data.token);      //put token in cookies.
                        window.location.assign("/");        //redirect to main page after login.
                },
                function(err){
                    $scope.error = err.data;
                });
            }
        };

        $scope.logout = function(){
            $cookies.remove('Token');       //remove token from cookies.
        }
    });
