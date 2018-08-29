# (Unnamed) Beat Saber Overlay

A web-based overlay for Beat Saber.

![preview](https://i.imgur.com/fOg4TUp.png)

## Installation (OBS)

1. Download and install the [BeatSaberHTTPStatus plugin](https://github.com/opl-/beatsaber-http-status)
2. In OBS, create a Browser source

![image](https://i.imgur.com/WyTjdtd.png)

3. Set the URL as `http://reselim.github.io/overlay` and the width and height as your canvas size (1280x720, etc.)

## Scaling

Scaling isn't built into the overlay by default, however you can add a custom css snippet:

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