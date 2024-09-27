import os
from extract_meta_data import extract_metadata
from load_data import load_document_content
from load_xml import  process_xml
from dotenv import load_dotenv
from pathlib import Path

if __name__ == "__main__":
   # file_path = Path(__file__).resolve().parent.parent / '1_download_raw_data' / 'cr_downloads' / 'Draft R4-2409310 SUL big CR.docx'
    file_path = Path(__file__).resolve().parent.parent / '2_extract_data' / 'raw_data_example' / 'xml_content_in_docx.docx'
    # Load document contents
    contents = load_document_content(file_path)
    

    # Iterate through the loaded contents and extract metadata
    for idx, content in enumerate(contents):
        print(f"--- Processing Document {idx + 1} ---")
        
        # Extract metadata using the extract_metadata function
        metadata = extract_metadata(content)

        # Print the extracted metadata
        #print("Extracted Metadata:")
        #print(metadata)
        #print("\n" + "=" * 40 + "\n")

        # Print the extracted metadata, limiting to the first 20 lines if it is a string
        if metadata:
            metadata_str = str(metadata)
            print("Extracted Metadata:")
            # Split by lines and print the first 20
            for line in metadata_str.splitlines()[:20]:
                print(line)
        else:
            print("No metadata extracted.")

        print("\n" + "=" * 40 + "\n")