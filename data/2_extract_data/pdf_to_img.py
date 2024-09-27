from pdf2image import convert_from_path
import cv2
import numpy as np
import os 
# Convert PDF to images
pdf_path = 'data/2_extract_data/example_pdfs/Draft R4-2409310 SUL big CR.pdf'
pages = convert_from_path(pdf_path)  # Replace with your PDF file path

# Define lower and upper bounds for red color in HSV
lower_red1 = np.array([0, 100, 100])  # Lower bound for red (Hue)
upper_red1 = np.array([10, 255, 255])  # Upper bound for red

lower_red2 = np.array([160, 100, 100])  # Lower bound for red (Hue)
upper_red2 = np.array([180, 255, 255])  # Upper bound for red
# Create a directory for cropped images
output_dir = 'data/2_extract_data/cropped_images'
os.makedirs(output_dir, exist_ok=True)  # Create the directory if it doesn't exist

# Process each page as an image
for page_num, page in enumerate(pages):
    # Convert PIL image to OpenCV format
    open_cv_image = np.array(page)
    open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2BGR)

    # Convert to HSV color space
    hsv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2HSV)

    # Create masks for red color
    mask1 = cv2.inRange(hsv_image, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv_image, lower_red2, upper_red2)
    red_mask = mask1 | mask2  # Combine both masks

    # Find contours in the red mask
    contours, hierarchy = cv2.findContours(red_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Store bounding rectangles for lines of text
    lines = []

    # Process each contour
    for contour in contours:
        if cv2.contourArea(contour) > 10:  # Filter by contour area
            (x, y, w, h) = cv2.boundingRect(contour)
            lines.append((x-1500, y-30, x + w+1500, y + h+30))  # Store as (x1, y1, x2, y2)

    # Combine overlapping or close bounding boxes into lines
    combined_lines = []
    for (x1, y1, x2, y2) in lines:
        # Check if the current line overlaps with any existing line
        found = False
        for (cx1, cy1, cx2, cy2) in combined_lines:
            # Check for overlap in y-axis with a buffer
            if (y1 < cy2 + 5) and (y2 > cy1 - 5):  
                combined_lines.remove((cx1, cy1, cx2, cy2))
                # Merge lines
                combined_lines.append((min(cx1, x1), min(cy1, y1), max(cx2, x2), max(cy2, y2)))
                found = True
                break
        if not found:
            combined_lines.append((x1, y1, x2, y2))

    # Draw the combined lines on the original image
    contour_image = open_cv_image.copy()
    for (x1, y1, x2, y2) in combined_lines:
        # Expand the bounding box to include lines above and below
        cv2.rectangle(contour_image, (x1, y1 - 10), (x2, y2 + 10), (0, 255, 0), 2)  # Draw rectangle around lines of text
    # Crop the image using the bounding box
        cropped_image = open_cv_image[y1 - 10:y2 + 10, x1-1500:x2+1500]  # Crop the region of interest
        
        # Save the cropped image
        cropped_image_path = os.path.join(output_dir, f'page_{page_num + 1}_crop_{len(combined_lines)}.png')
        cv2.imwrite(cropped_image_path, cropped_image)  # Save the cropped image
        print(f'Saved: {cropped_image_path}')  # Print saved path for verification
    # Display the result
    cv2.imshow(f'Page {page_num + 1} - Red Text Detection', contour_image)
    
    # Wait for a key press to show the next page or for 1 second
    key = cv2.waitKey(0)  # Press any key to continue to the next page

cv2.destroyAllWindows()
