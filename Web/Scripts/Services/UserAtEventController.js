(function () {
    'use strict'

    angular.module(BarkPark).controller("userAtEventController", UserAtEventController)
    UserAtEventController.$inject = ["$scope"];

    function UserAtEventController($scope){
        var vm = this;
        vm.openListOfUser = _openListOfUser;


        function _openListOfUser() {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                component: 'currentReference',
                size: 'lg',
                resolve: {
                    item: function () {
                        return {
                            id: reference.id
                        };
                    }
                }
            });
            modalInstance.result.then(function () {
                console.log("modal closed");
                //vm.getAllRefByTypePag(vm.searchRefModel);
            }
                , function () {
                    console.info();
                    //vm.getAllRefByTypePag(vm.searchRefModel);
                }
            );
        }
    }

})();



(function () {
    'use strict';

    // Please note that the close and dismiss bindings are from $uibModalInstance.
    angular.module(BarkPark).component('currentReference', {
        templateUrl: '/scripts/templateBark/showUsersTemplate.html',

        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'

        },
        controller: function () {
      

         



        }
    });
})();
