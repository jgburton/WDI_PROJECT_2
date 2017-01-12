

$.ajax({
  url: 'https://api.yelp.com/v3/businesses/search?location=london&categories=jazzandblues&limit=50',
  method: 'GET',
  beforeSend: function(request) {
    request.setRequestHeader('Authorization', 'Bearer _pcOBAeOtgFajv0cPq4JVfzdOvN5OY03HzBtVkLIBF');
  }
}).done( data => {
  console.log(data);
});
