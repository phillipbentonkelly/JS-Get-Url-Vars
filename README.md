-JS--Get-Url-Vars
=================

Simple way to get the query params using the DOM/Window.

This extension maps URL query params to the object instance when initiated.

URL: http://pkelly/FileResource/themes/projects/hack2013/?apiKey=123MyKey&format=json&q=New%20Girl

In HTML:
<script src="getUrlVars.js"></script>

Init in a 'Script' Tag (jQuery.ready if you want, but it works without it):

<script>
  //GetUrlVars().isAvailable('q', 'string');
  var mapUrlVars = GetUrlVars();

  console.log(mapUrlVars.q);
</script>

Console output:
mapUrlVars = {
  found: true,
  queryParams: {
    format: "json",
    apiKey: "123MyKey",
    q: "New%20Girl"
  },
  match: "New%20Girl"
};
