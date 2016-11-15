# videoPlayer

This component will take a url, determine if the source is YouTube or Vimeo,
then populate a modal popup box with the proper `iframe` embed code and
autoplay it.

It automatically sizes the popup to be 75% of the width of the page, and
places it 10% from the top of the page (unless it's

## How to Use This Component

```html
<div
    data-component="video-player"
    data-vp-url="https://www.youtube.com/watch?v=EShUeudtaFg">
    <!-- Trigger to open the video. Link? Icon? -->
</div>

<!-- Right before the close body tag -->
<div data-video="mask">
    <div data-video="container">
        <div data-video="close">&times;</div>
        <div data-video="content"></div>
    </div>
</div>
