import requests
import zipfile
import os
import shutil
from io import BytesIO
from config import TMP_DIR, ZIP_URL, HTML_DIR

print("fetching data")
shutil.rmtree(TMP_DIR, ignore_errors=True)

response = requests.get(ZIP_URL)
if response.status_code == 200:
    with zipfile.ZipFile(BytesIO(response.content)) as zip_ref:
        os.makedirs(TMP_DIR, exist_ok=True)
        zip_ref.extractall(TMP_DIR)
else:
    print(f"Failed to download file: {response.status_code}")


print("moving directories")
for folder_name in ["stats", "summaries", "data"]:
    src_folder = os.path.join(os.path.join(TMP_DIR, "jad-ai-main"), folder_name)
    dest_folder = os.path.join(HTML_DIR, folder_name)
    shutil.move(src_folder, dest_folder)
    print(f"moving {src_folder} to {dest_folder}")

print("cleaning up")
shutil.rmtree(TMP_DIR, ignore_errors=True)
print("done")
