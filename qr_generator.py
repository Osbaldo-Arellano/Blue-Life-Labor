import qrcode
from PIL import Image

def generate_qr_code(url, output_file='qr_code.png'):
    """
    Generates a QR code for a given URL and saves it as an image file.
    
    Args:
        url (str): The URL to encode in the QR code.
        output_file (str): The name of the output image file. Defaults to 'qr_code.png'.
    """
    # Generate the QR code
    qr = qrcode.QRCode(
        version=1,  # Controls the size of the QR code (1 is the smallest)
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,  # Size of each box in the QR code grid
        border=4,  # Thickness of the border (minimum is 4)
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Create an image of the QR code
    img = qr.make_image(fill_color="black", back_color="white")

    # Save the QR code image
    img.save(output_file)
    print(f"QR code saved as {output_file}")

# Make QR for bluelifelabor.com and save it in this directory
url = "https://www.bluelifelabor.com"
output_file = "qr_code.png"
generate_qr_code(url, output_file)

output_file
