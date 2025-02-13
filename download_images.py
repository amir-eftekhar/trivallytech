import os
import gdown

# Create images directory if it doesn't exist
os.makedirs('src/images', exist_ok=True)

# Dictionary of file IDs and their target names
images = {
    '1Cv0MPwfkscJ9_I_mjxCgOtxoM8TmlPsZ': 'nik.webp',
   
}

def download_image(file_id, output_name):
    url = f'https://drive.google.com/uc?id={file_id}'
    output_path = os.path.join('src/images', output_name)
    try:
        gdown.download(url, output_path, quiet=False)
        print(f'Successfully downloaded {output_name}')
    except Exception as e:
        print(f'Failed to download {output_name}: {str(e)}')

# Download all images
for file_id, filename in images.items():
    download_image(file_id, filename)
