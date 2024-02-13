function applyOrangeFilter(context){
    const centerX = 256;
    const centerY = 256;
    const radius = 256;
    var mean_brightness = 0;
    var pixel_in_circle = 0;

    // Iterate over a square region covering the bounding box of the circle
    for (let i = 0; i < 512; i += 1){
        for (let j = 0; j < 512; j += 1) {
            // Calculate the distance from the current pixel to the center of the circle
            const distanceSquared = (i - centerX) ** 2 + (j - centerY) ** 2;
            // Check if the current pixel is inside the circle
            if (distanceSquared < radius ** 2) {
                // Get the pixel data of the current pixel
                const pixel = context.getImageData(i, j, 1, 1).data;
                
                // Calculate the mean brightness of the pixels inside the circle
                mean_brightness += (pixel[0] + pixel[1] + pixel[2]) / 3;
                pixel_in_circle += 1;
            }
        }
    }
    mean_brightness /= pixel_in_circle;

    // Apply an orange filter to the circle based on the mean brightness of the pixels inside the circle
    context.fillStyle = 'rgba(255, ' + (mean_brightness) + ', 0, 0.15)';
    context.fillRect(0, 0, 512, 512);
}

function convertToBadge(image) {
    // Create a canvas and a 2D context
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = 512;
    canvas.height = 512;

    // Check if the image is on the good size
    if (image.width != 512 || image.height != 512) {
        alert("The image is not on the good size and will be resize ")
    }

    // Fill the canvas with white to avoid transparency
    context.fillStyle = 'rgba(255, 255, 255, 0)';
    context.fillRect(0, 0, 512, 512);

    // Calculate the scale of the image
    let scale = Math.min(image.width / 512, image.height / 512);

    // Calculate the offset to center the image
    let offsetX = (image.width - 512 * scale) / 2;
    let offsetY = (image.height - 512 * scale) / 2;

    // Draw the image on the canvas with the correct scale and offset
    context.drawImage(image, offsetX, offsetY, image.width - offsetX * 2, image.height - offsetY * 2, 0, 0, 512, 512);

    // Apply the orange filter
    applyOrangeFilter(context);

    // Clip the canvas to a circle
    context.save();
    context.arc(256, 256, 256, 0, Math.PI * 2);
    context.clip();

    return context.getImageData(0, 0, 512, 512);
}

// Get the file input element
const input = document.getElementById('fileInput');

// Add a change event listener to the file input element
input.addEventListener('change', function() {
    const file = input.files[0];

    // Check if the file is loaded
    if (!file) {
        return;
    }

    const image = new Image();
    image.onload = function() {
        const imageData = convertToBadge(image);
        const transformedCanvas = document.getElementById('transformedCanvas');
        const ctx = transformedCanvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    };

    // Load the image on the canvas
    image.src = URL.createObjectURL(file);
});