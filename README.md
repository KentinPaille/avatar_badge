# Image Badge Previewer

This application provides a preview for a badge image. It allows users to upload an image file, which is then displayed on a circular canvas with a predefined size. Additionally, it applies an orange filter to the image, enhancing its visual appearance.

## Usage

1. Clone or download this repository to your local machine.
2. Open the `preview.html` file in a web browser.

## Features

- **File Upload:** Users can upload an image file using the provided file input element.
- **Circular Canvas:** The uploaded image is displayed on a circular canvas with a size of 512x512 pixels.
- **Image Resize:** If the uploaded image does not match the canvas size, it is resized accordingly.
- **Orange Filter:** An orange filter is applied to the image, enhancing its appearance and giving it a "happy" feeling.

## Structure

- **HTML:** The main structure of the application is defined in `preview.html`.
- **CSS:** Basic styling for the application is provided in the `<style>` section of `preview.html`.
- **JavaScript:** The functionality of the application is implemented in `script.js`. It includes functions for drawing the default image, setting the scale of the image, applying the orange filter, and handling the file upload.

## Dependencies

- This application does not require any external dependencies.

## Compatibility

- This application should work in modern web browsers that support HTML5 canvas and ES6 JavaScript.
