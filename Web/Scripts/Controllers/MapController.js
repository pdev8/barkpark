// the map component
(function () {
    "use strict";
    console.log("in component");
    angular.module(BarkPark).component("mapComponent",
        {
            //bindings: { addressModel: '<' },
            //templateUrl: "~/Views/Member/MapTemplate.html",
            templateUrl: "/Scripts/Views/MapTemplate.html",
            controller: "mapController"
        });
})();


// the map controller
(function () {
    "use strict";

    angular.module(BarkPark).controller("mapController", MapController);

    MapController.$inject = ["$scope"];
    function MapController($scope) {

        var vm = this;
        vm.$scope = $scope;

        vm.submitAddress = _submitAddress;
        vm.mapObj = {};
        vm.populateMap = _populateMap;
        vm.prevInfowindow = false;

        vm.$onInit = _initMap;

        

        function _initMap() {

            var map = new google.maps.Map(document.getElementById('gmap'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });

            //var userMap = new google.maps.Map(document.getElementById("gmap"), {
            //    zoom: 8,
            //    center: ()
            //});


            //vm.mapObj = {
            //    'address': address,
            //    'map': userMap
            //}

        }

   
        function _submitAddress() {
            // recenter map around the user-input zipcode (upon click of submit)

            // store the user input postal code as variable address
            var address = vm.addressModel.postalCode;

            // instantiate geocoder object
            var geocoder = new google.maps.Geocoder();


            // FROM API DOCUMENTATION: "Geocoder.geocode() method initiates a request to the geocoding service,
            // passing it a GeocoderRequest object literal containing the input terms and a callback method to execute upon receipt of the response."

            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {

                    // need to re-instantiate the map here because... not sure exactly why; something to do with google api ?
                    var userMap = new google.maps.Map(document.getElementById("gmap"), {
                        zoom: 8,
                        center: (results[0].geometry.location)
                    });
                    vm.mapObj = {
                        'address': address,
                        'map': userMap
                    }
                    _getEvents(vm.mapObj);
                } else {
                    console.log('ERROR map not recentering');
                }
            });
        }

        // get the events/locations within the appropriate radius; drop corresponding markers on map
        function _getEvents(mapObj) {
            mapsService.GetEvents(mapObj.address)
                .then(function (data) {
                    // this data is an object, that contains a property that's an array full of events based off of the zip
                    console.log('HEY LOOK HERE!!!!!!!!!!*********************: ', data);
                    // call the _populateMap method to iterate through this array of addresses and populate them on the mmap
                    _populateMap(data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }


        function _populateMap(data) {
            // conditional statement to check if there is even anything returned; i.e. if there are even any locations that need to be marked on the map
            if (data.items) {
                // an array of addresses is returned; store in var addrArr
                var addrArr = data.items;

                console.log('data.items in _populateMap: ', data.items);
                
                for (var i = 0; i < addrArr.length; i++) {

                    var currentIteration = addrArr[i];
                    console.log('currentIteration: ', currentIteration);
                    var myLatLng = {
                        'lat': currentIteration.latitude,
                        'lng': currentIteration.longitude
                    };
                    console.log('myLatLng: ', myLatLng);

                    // depending on the averageRating of the particular location, change the number of stars displayed as filled (the corresponding html is included in windowContent below)
                    if (currentIteration.averageRating < .75) {
                        var ratingStars =
                            '<i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i>';
                    } else if (currentIteration.averageRating > .75 &&
                        currentIteration.averageRating < 1.75) {
                        var ratingStars =
                            '<i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i>';
                    } else if (currentIteration.averageRating > 1.75 &&
                        currentIteration.averageRating < 2.75) {
                        var ratingStars =
                            '<i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i>';
                    } else if (currentIteration.averageRating > 2.75 &&
                        currentIteration.averageRating < 3.75) {
                        var ratingStars =
                            '<i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i>';
                    } else if (currentIteration.averageRating > 3.75 &&
                        currentIteration.averageRating < 4.75) {
                        var ratingStars =
                            '<i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star-empty"></i>';
                    } else if (currentIteration.averageRating > 4.75) {
                        var ratingStars =
                            '<i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i><i style="color:#228B22;" class="glyphicon glyphicon-star"></i>';
                    }

                    // the actual HTML content of the little popup box for each marker, stored in var boxContent
                    var windowContent = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<div><h3 id="firstHeading" style="color:#8dc344;" class="firstHeading">' +
                        currentIteration.typeName +
                        '</h3><h5 style="color:#228B22;">' +
                        ratingStars +
                        ' ' +
                        currentIteration.totalRatings +
                        '</h5>' +
                        '<div id="bodyContent">' +
                        '<h5><strong>Address: </strong> ' +
                        currentIteration.fullAddress +
                        '</h5><h5><strong>Description: </strong>' +
                        currentIteration.eventDescription +
                        '</h5>';

                    // assign default marker color
                    var markerColor = "228B22";

                    // if the location is of type 'Location', change marker to custom color
                    if (currentIteration.maptype === 'Location') {
                        markerColor = "90FB75";
                    }

                    // using the selected marker color, store marker image as var formattedMarkerIcon to be used as property of Marker object below
                    var formattedMarkerIcon = new google.maps.MarkerImage(
                        "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
                        markerColor);

                    var infoWindow = new google.maps.InfoWindow();

                    // new marker object with properties that we've defined above
                    var marker = new google.maps.Marker({
                        map: vm.mapObj.map,
                        position: myLatLng,
                        title: currentIteration.typeName,
                        icon: formattedMarkerIcon
                    });


                    marker.addListener('click',
                        function () {
                            // check to see if there is already an info window open; if so, close it before proceeding
                            if (vm.prevInfoWindow) {
                                vm.prevInfoWindow.close();
                            }

                            // update prevInfoWindow to this new instance, set content, and open it on the map 'map' anchored on marker 'marker'
                            vm.prevInfoWindow = infoWindow;
                            infoWindow.setContent(windowContent);
                            infoWindow.open(map, marker);
                        });


                }


            };
        }
    }
})();