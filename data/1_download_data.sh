#！/bin/bash

# Define URL and output filenames

URL="https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-1/"
HTML_FILE="page.html"
LINKS_FILE="links.txt"
DOWNLOAD_DIR="./downloads"

#Create download directory if it doesn't exist
mkdir -p $DOWNLOAD_DIR

#Download the HTML page
#echo "Downloading HTML page..."
#wget -O $HTML_FILE "$URL"

# Extracting .zip links
#echo "Extracting .zip links..."
#sed -n 's/.*href="\([^"]*\.zip\)".*/\1/p' $HTML_FILE > $LINKS_FILE

# Download .zip files
echo "Downloading .zip files..."
wget -i $LINKS_FILE -P $DOWNLOAD_DIR

# Unzip downloaded .zip files
for zip_file in "$DOWNLOAD_DIR"/*.zip; do
   if [ -f "$zip_file" ]; then
        echo "Unzipping $zip_file..."
        unzip -d "$DOWNLOAD_DIR" "$zip_file"
        # Check if unzip was successful
        if [ $? -eq 0 ]; then
            echo "Unzipping complete. Deleting $zip_file..."
            rm "$zip_file"
        else
            echo "Failed to unzip $zip_file. Not deleting."
        fi
    else
       echo "No zip files found in $DOWNLOAD_DIR."
    fi
done

echo "Unzipping complete."





echo "All tasks completed."
