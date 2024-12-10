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
      } else {
        alert("Error: " + JSON.stringify(data.errors));
      }
    })
    .catch((error) => console.error("Error:", error));
}
