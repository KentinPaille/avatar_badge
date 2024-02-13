
function setScale(image) {
    let scale = 0;
    if (image.width > image.height) {
        scale = image.width / image.height;
    } else if (image.height > image.width) {
        scale = image.height / image.width;
    }
    return scale
}

const input = document.getElementById('fileInput');

input.addEventListener('change', function() {
    const file = input.files[0];
    if (!file) {
        return;
    }
    const image = new Image();
    image.onload = function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;
        if (image.width != 512 || image.height != 512) {
            alert("The image is not on the good size and will be resize ")
        }
        let scale = setScale(image)

        context.save();
        context.arc(256, 256, 256, 0, Math.PI * 2);
        context.clip();

        console.log(scale)
        console.log(image.width)
        console.log(image.height)
        if (image.width > image.height) {
            context.drawImage(image, 128 * (scale - 1), 0, image.width, image.height, 0, 0, 512 * scale, 512);
        } else if (image.height > image.width) {
            context.drawImage(image, 0, 128 * (scale - 1), image.width, image.height, 0, 0, 512, 512 * scale);
        } else {
            context.drawImage(image, 0, 0, 512, 512);
        }

        const imageData = context.getImageData(0, 0, 512, 512);
        const transformedCanvas = document.getElementById('transformedCanvas');
        const ctx = transformedCanvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    };
    image.src = URL.createObjectURL(file);
});