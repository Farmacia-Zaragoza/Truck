// function initMap() {

// 	    var image = {
//           url: 'http://truck.dbrqx.com/index3/Football.png',
//           // This marker is 20 pixels wide by 32 pixels high.
//           size: new google.maps.Size(25, 25),
//           // The origin for this image is (0, 0).
//           origin: new google.maps.Point(0, 0),
//           // The anchor for this image is the base of the flagpole at (0, 32).
//           anchor: new google.maps.Point(0, 32)
//         };

// 		var location = {
// 				lat: 40.5053907,
// 				lng: -3.6724659
// 		};
// 		var map = new google.maps.Map(document.getElementById('google_map'), {
// 			zoom: 12,
// 			center: location
// 		});
// 		var marker = new google.maps.Marker({
// 			position: {lat:41.390205, lng:2.154007},
// 			map: map,
// 			icon: image
// 		});
// 		var infoWindow = new google.maps.InfoWindow({
// 			content: '<h3>Barcelona Test Content</h3>'
// 		});
// 		marker.addListener('click', function() {
// 			infoWindow.open(map, marker);
// 		});
// }



      function initMap() {
        var map = new google.maps.Map(document.getElementById('google_map'), {
          center: {lat: -40.5053907, lng: -3.6724659},
          zoom: 12,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('location_search');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }