# (Unnamed) Beat Saber Overlay

A web-based overlay for Beat Saber.

![preview](https://i.imgur.com/hXM0BMZ.png)

## Installation (OBS)

1. Download/install the [BeatSaberHTTPStatus plugin](https://github.com/opl-/beatsaber-http-status)
2. In OBS, create a Browser source

![image](https://i.imgur.com/WyTjdtd.png)

3. Set the URL as `http://reselim.github.io/overlay` and the width and height as your canvas size (1280x720, etc.)

## Scaling

This overlay may look too small on larger canvases, because it lacks scaling. You can use this as a custom css snippet to scale the overlay:

```css
:root {
	zoom: 200%;
}
```

## Modifiers

Modifiers can be added by using the URL fragment, like so:

```
http://reselim.github.io/overlay#top
```

You can add multiple modifiers using commas.

- `top`
	* Moves the overlay to the top and reverses the layout vertically
- `test`
	* Makes the background black, for testing purposes.