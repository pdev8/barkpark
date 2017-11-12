(function () {
    angular.module(BarkPark).controller("loginController", LoginController);

    LoginController.$inject = ["$scope"];

    function LoginController($scope) {
        var vm = this;

        vm.login = _login;

        //vm.$onInit = _init;

        function _login() {
            console.log("clicked");
            location.href = "Member";
        }
    }
})();