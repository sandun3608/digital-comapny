from PIL import Image
import os

def crop_image(img_path, save_path):
    if not os.path.exists(img_path):
        print(f"Error: {img_path} does not exist.")
        return
    
    img = Image.open(img_path)
    # Check if the image has alpha channel
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    # Get bounding box of non-transparent content
    bbox = img.getbbox()
    if bbox:
        # Crop the image to the bounding box
        img_cropped = img.crop(bbox)
        
        # Add a tiny 1-pixel transparent padding just so it doesn't touch the absolute edges
        w, h = img_cropped.size
        padded_img = Image.new("RGBA", (w + 4, h + 4), (0, 0, 0, 0))
        padded_img.paste(img_cropped, (2, 2))
        
        # Save the cropped image
        padded_img.save(save_path)
        print(f"Cropped {img_path} and saved to {save_path}. Original size: {img.size}, New size: {padded_img.size}")
    else:
        # If it's empty/fully transparent, just copy it
        img.save(save_path)
        print(f"No bbox found for {img_path}, saved as is.")

# Crop the image in a11/3.png to public/favicon.png
crop_image("a11/3.png", "public/favicon.png")
