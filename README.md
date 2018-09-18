# (Unnamed) Beat Saber Overlay

A web-based overlay for Beat Saber

![preview](https://i.imgur.com/fOg4TUp.png)

## Installation (OBS)

1. Download and install the [BeatSaberHTTPStatus plugin](https://github.com/opl-/beatsaber-http-status)

1. Create a Browser source
  ![image](https://i.imgur.com/WyTjdtd.png)

1. Set the URL as `http://reselim.github.io/overlay` and the size equal to your canvas size (1280x720, etc.)
  ![image](https://imgur.com/KxowYrw.png)

1. (Optional) For 1080p canvases, add `#scale` to the end of the URL (ex. `http://reselim.github.io/overlay#scale`) to scale the overlay by 1.5x

## Modifiers

Modifiers can be added by using the URL fragment, like so:

```http://reselim.github.io/overlay#top```

Multiple modifiers can be used with commas as a delimiter.

- `top`
  - Moves the overlay to the top and reverses the layout vertically
- `rtl`
  - Moves the overlay to the right and uses right-to-left text
- `scale`
  - Scales the overlay by 1.5x, for use on 1080p canvases
- `test`
  - Makes the background black, for testing purposes

### Remote IP

If Beat Saber is running on a diffrent computer than what is trying to use this overlay. You can specify a custom IP with the `ip` query parameter

```http://reselim.github.io/overlay?ip=10.0.0.2```

You can combine it with modifiers above like this:

```http://reselim.github.io/overlay?ip=10.0.0.2#top,rtl```