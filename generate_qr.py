import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer

# URL to encode
url = "https://paec-corpus.vercel.app/"

# Create QR code instance
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

# Add data
qr.add_data(url)
qr.make(fit=True)

# Create a styled QR code with rounded modules in black
img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=RoundedModuleDrawer(),
    fill_color="black",
    back_color="white"
)

# Save the QR code
output_path = "paec_corpus_qr.png"
img.save(output_path)
print(f"✅ QR code generated successfully!")
print(f"📁 Saved to: {output_path}")
print(f"🔗 URL encoded: {url}")
