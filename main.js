import axios from 'axios';

axios
  .get('https://covers.openlibrary.org/b/isbn/0385472579-S.jpg', {
    responseType: 'blob',
  })
  .then(function (response) {
    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Create a new image element
    const img = document.createElement('img');
    // Set the src of the image to the blob URL
    img.src = url;
    // Append the image to the body of the document
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.log(error);
  });
