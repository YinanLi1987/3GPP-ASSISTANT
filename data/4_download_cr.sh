#！/bin/bash
# Downlaod all the document of 38.101-1

# Define URL and output filenames

CR_URL="https://portal.3gpp.org/ChangeRequests.aspx?q=1&versionId=88292&release=193"
CR_HTML_FILE="cr_page.html"
CR_LINKS_FILE="cr_links.txt"
CR_DOWNLOAD_DIR="./cr_downloads"

#Create download directory if it doesn't exist
#mkdir -p $CR_DOWNLOAD_DIR

#Download the HTML page
#echo "Downloading HTML page..."
#wget -O $CR_HTML_FILE "$CR_URL"

# Extracting .zip links that include '=R4-'
#echo "Extracting .zip links..."
#grep 'href="http://portal.3gpp.org/ngppapp/DownloadTDoc.aspx?contributionUid=R4-' $CR_HTML_FILE | sed -n 's/.*href="\([^"]*\)".*/\1/p' > $CR_LINKS_FILE

# Download .zip files with curl, handling JavaScript redirects
#echo "Downloading .zip files..."
#while read -r link; do
#    echo "Processing $link"
    # Download the intermediate HTML page
#    intermediate_html=$(curl -s "$link")
    # Extract the actual .zip URL from the JavaScript
#    actual_url=$(echo "$intermediate_html" | grep -o "window.location.href='[^']*'" | sed "s/window.location.href='\(.*\)'/\1/")
    # Download the .zip file
#    if [ -n "$actual_url" ]; then
#        echo "Downloading from $actual_url"
#        curl -L -o "$CR_DOWNLOAD_DIR/$(basename "$actual_url")" "$actual_url"
#    else
#        echo "Failed to extract .zip URL from $link"
#    fi
#done < $CR_LINKS_FILE



echo "All tasks completed."
