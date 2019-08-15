var Mapss = function geoadres(adress) {
  var resultlat = ''; var resultlng = '';
  $.ajax({
    async: false,
    dataType: "json",
    url: 'http://maps.google.com/maps/api/geocode/json?address=' + adress,
    success: function(data){
      for (var key in data.results) {
        resultlat = data.results[key].geometry.location.lat;
        resultlng = data.results[key].geometry.location.lng;
      } }
  });
  return { lat: resultlat, lng: resultlng}
}