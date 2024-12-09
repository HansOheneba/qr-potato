function generateQRCode() {
  const form = document.getElementById("qrForm");
  const formData = new FormData(form);

  fetch("/generate_qr", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById(
          "qrImage"
        ).src = `data:image/png;base64,${data.qr_code_data}`;
        document.getElementById("qrContainer").style.display = "block";
      } else {
        alert("Error: " + JSON.stringify(data.errors));
      }
    })
    .catch((error) => console.error("Error:", error));
}
