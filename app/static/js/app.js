function generateQRCode(event) {
  event.preventDefault(); // Prevent form's default behavior (page reload)

  const form = document.getElementById("qrForm"); // Get the form element
  const formData = new FormData(form); // Collect form data

  // Send an AJAX request to the `/generate` endpoint
  fetch("/generate", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Dynamically update the modal with the QR code
        const qrImage = document.getElementById("qrCodeImage");
        qrImage.src = `data:image/png;base64,${data.qr_code_data}`;
        qrImage.style.display = "block";
        document.getElementById("qrBox").style.display = "flex";
         const generateButton = form.querySelector("button[type='submit']");
         generateButton.style.display = "none";

         const inputField = document.getElementById("input");
         inputField.disabled = true;
         inputField.classList.add("bg-gray-100", "cursor-not-allowed");
      } else {
        alert("Error: " + JSON.stringify(data.errors));
      }
    })
    .catch((error) => console.error("Error:", error));
}


function clear() {
  const form = document.getElementById("qrForm");
  const inputField = document.getElementById("input");
  const generateButton = form.querySelector("button[type='submit']");
  const qrBox = document.getElementById("qrBox");
  const qrImage = document.getElementById("qrCodeImage");
  

  // Clear the QR code image
  qrImage.src = "";
  qrImage.style.display = "none";

  // Hide the QR code box
  qrBox.style.display = "none";

  // Re-enable the input field
  inputField.disabled = false;
  inputField.classList.remove("bg-gray-100", "cursor-not-allowed");

  // Show the Generate button
  generateButton.style.display = "block";

  // Clear the input field value (optional)
  inputField.value = "";
}