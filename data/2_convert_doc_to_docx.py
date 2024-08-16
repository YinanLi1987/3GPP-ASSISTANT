import subprocess
import os

def convert_doc_to_docx(doc_file_path):
    # Define the output path
    output_dir = os.path.dirname(doc_file_path)
    docx_file_name = os.path.splitext(os.path.basename(doc_file_path))[0] + '.docx'
    docx_file_path = os.path.join(output_dir, docx_file_name)
    # Run unoconv command to convert .doc to .docx
    result = subprocess.run(['unoconv', '-f', 'docx', '-o',   docx_file_path, doc_file_path], capture_output=True, text=True)
   
    if result.returncode == 0:
        print(f"Converted {doc_file_path} to {docx_file_path}")
        # Remove the original .doc file
        os.remove(doc_file_path)
        print(f"Deleted original file {doc_file_path}")
    else:
        print(f"Failed to convert {doc_file_path}. Error: {result.stderr}")

# Directory containing .doc files
downloads_dir = os.path.expanduser("./downloads")  # Adjust the path if needed

# Loop through all .doc files in the directory
for filename in os.listdir(downloads_dir):
    if filename.endswith(".doc"):
        doc_file_path = os.path.join(downloads_dir, filename)
        convert_doc_to_docx(doc_file_path)
