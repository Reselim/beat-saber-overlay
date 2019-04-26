# (Unnamed) Beat Saber Overlay

A web-based overlay for Beat Saber

![preview](https://i.imgur.com/fOg4TUp.png)

## Installation (OBS)

1. Download and install the [BeatSaberHTTPStatus plugin](https://github.com/opl-/beatsaber-http-status/releases)
2. Create a Browser source

![image](https://i.imgur.com/WyTjdtd.png)

3. Set the URL as `http://overlay.reselim.io/` and the size equal to your canvas size (1280x720, etc.)

![image](https://imgur.com/KxowYrw.png)

4. (Optional) For 1080p canvases, add the `scale` modifier (ex. `http://overlay.reselim.io/?modifiers=scale`) to scale the overlay by 1.5x

## Options

Options are added to the URL query as such:

```
http://overlay.reselim.io/?modifiers=top
```

### `ip` and `port`

Listen to events from another IP and/or port.

### `modifiers`

Multiple modifiers can be seperated with commas.

- `top`
	* Moves the overlay to the top and reverses the layout vertically
- `rtl`
	* Moves the overlay to the right and uses right-to-left text
- `scale`
	* Scales the overlay by 1.5x, for use on 1080p canvases
- `test`
	* Makes the background black, for testing purposes