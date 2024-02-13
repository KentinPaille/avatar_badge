//function to set the scale of the image
function setScale(image) {
    let scale = 0;

    // Set the scale to the larger of the two dimensions
    if (image.width > image.height) {
        scale = image.width / image.height;
    } else if (image.height > image.width) {
        scale = image.height / image.width;
    }
    return scale
}

// Function to apply the orange filter
function applyOrangeFilter(context){
    const centerX = 256; // Center X coordinate of the circle
    const centerY = 256; // Center Y coordinate of the circle
    const radius = 256; // Radius of the circle

    // Iterate over a square region covering the bounding box of the circle
    for (let i = centerX - radius; i < centerX + radius; i += 2){
        for (let j = centerY - radius; j < centerY + radius; j += 2) {
            // Calculate the distance from the current pixel to the center of the circle
            const distanceSquared = (i - centerX) ** 2 + (j - centerY) ** 2;

            // Check if the current pixel is inside the circle
            if (distanceSquared <= radius ** 2) {
                // Get the pixel data of the current pixel
                const pixel = context.getImageData(i, j, 2, 2).data;

                // Check if the pixel is transparent
                if (pixel[3] === 0) {
                    // If the pixel is transparent, replace it with the orange fade color
                    context.fillStyle = 'rgba(255, 165, 0, 0.5)';
                    context.fillRect(i, j, 2, 2);
                }
            }
        }
    }
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
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;

        // Check if the image is on the good size
        if (image.width != 512 || image.height != 512) {
            alert("The image is not on the good size and will be resize ")
        }

        let scale = setScale(image)

        // Clip the canvas to a circle
        context.save();
        context.arc(256, 256, 256, 0, Math.PI * 2);
        context.clip();

        // Draw the image on the canvas with the correct scale
        if (image.width > image.height) {
            context.drawImage(image, 128 * (scale - 1), 0, image.width, image.height, 0, 0, 512 * scale, 512);
        } else if (image.height > image.width) {
            context.drawImage(image, 0, 128 * (scale - 1), image.width, image.height, 0, 0, 512, 512 * scale);
        } else {
            context.drawImage(image, 0, 0, 512, 512);
        }

        // Apply the orange filter
        applyOrangeFilter(context);

        const imageData = context.getImageData(0, 0, 512, 512);
        const transformedCanvas = document.getElementById('transformedCanvas');
        const ctx = transformedCanvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    };
    // Load the image on the canvas
    image.src = URL.createObjectURL(file);
});