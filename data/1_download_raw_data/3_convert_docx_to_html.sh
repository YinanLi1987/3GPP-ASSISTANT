#!/bin/bash

# Directory containing .docx files
downloads_dir="./downloads"

# Navigate to the downloads directory
cd "$downloads_dir" || { echo "Directory not found: $downloads_dir"; exit 1; }

# Loop through all .docx files
for file in *.docx; do
    if [[ -f "$file" ]]; then
        # Convert .docx to .html using pandoc
        pandoc -s "$file" -o "${file%.docx}.html"

        # Check if conversion was successful
        if [[ $? -eq 0 ]]; then
            # Remove the original .docx file
            rm "$file"
            echo "Converted and removed '$file'"
        else
            echo "Failed to convert '$file'"
        fi
    else
        echo "No .docx files found in $downloads_dir"
    fi
done

echo "Conversion complete."
