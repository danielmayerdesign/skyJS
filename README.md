# SkyJS
A JavaScript plugin that turns your web page into a sky full of stars and galaxies.
<br>See it in action <a href="http://garden.danielmayer.net/stars" target="_blank">here</a>!

## How to use sky.js
As of v0.1, there isn't much to this plugin, but there's more to come!

### To load the plugin
Download `sky.js` and the images directory (containing images of galaxies) into your site's directory.
Then, call `sky.js` in the `head` section of your page. For example, if your `sky.js` files live in a directory called `sky`, and that directory lives in your site's root directory, you'd call it like so:
```<script type="text/javascript" src="sky/sky.js"></script>```

### To use the plugin
Before the closing `</body>` tag on your site (or anywhere after the above script), create a script that looks something like this:

```
<script type="text/javascript">
  var sky = new Sky();
</script>
```

Here, you're creating a new instance of `Sky` using the default parameters. Your sky won't have any animation acting on it just yet, but it'll still look pretty cool.

Now we can have some fun.

###`Sky` takes 2 arguments
The first is an integer telling it how many layers to create. The default is `3`.
The second is an integer telling it how dense to make the sky. The default is `5`. `0` and `10` are the minimum and maximum values.

###`Sky` has 2 methods
`.breathe()` initiates the zoom in/zoom out animation. It accepts one argument: an integer for the number of seconds each "breath" should take. The default is `10`.
Calling `.breathe().stop` will halt the animation.

`.zoomIn()` initiates a zoom in. It accepts two arguments. The first is an integer for the duration of the zoom (the default is `2.5`). The second is an integer for the zoom amount.

So, if we want to create an animated sky, we can do the following:
```
<script type="text/javascript">
  var sky = new Sky(4,6);
  sky.breathe(9);
</script>
```

Maybe we want a quick zoom effect to happen when the user clicks on an element. In that case, we'd add the following to our above code:
```
yourElement.onclick = (function() {
  sky.breathe().stop();
  sky.zoomIn(1);
});
```
