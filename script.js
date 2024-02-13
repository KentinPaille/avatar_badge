
const input = document.getElementById('fileInput');

input.addEventListener('change', function() {
    const file = input.files[0];
    if (!file) {
        return;
    }
    console.log(file);
});