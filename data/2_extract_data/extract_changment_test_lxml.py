from docx import Document
from lxml import etree


def extract_tracked_changes(docx_path):
    # Load the DOCX file
    doc = Document(docx_path)

    # Extract the XML content
    xml_content = doc.element.xml
    
    # Parse the XML content
    root = etree.fromstring(xml_content)
    
    # Namespace map for DOCX
    nsmap = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    # Find all tracked changes
    changes = root.xpath('//w:ins | //w:del', namespaces=nsmap)
    
    changes_data = []
    for change in changes:
        change_type = change.tag.split('}')[-1]
        change_text = ''.join(change.xpath('.//w:t/text()', namespaces=nsmap))
        if change_text.strip():  # Only add non-empty changes
            # Find the parent paragraph to get section and line info
            parent_cell = change.getparent()
            while parent_cell.tag != '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc':
                parent_cell = parent_cell.getparent()
            
            # Extract section number and title (if available)
            section_number =parent_cell.xpath('.//w:numPr//w:numId/@w:val', namespaces=nsmap)
            section_title = parent_cell.xpath('.//w:pStyle/@w:val', namespaces=nsmap)
            
            # Extract line number (approximate by position in the document)
            line_number = len(parent_cell.xpath('.//preceding::w:tc', namespaces=nsmap)) + 1
            
            changes_data.append({
                'type': change_type,
                'text': change_text,
                'section_number': section_number[0] if section_number else 'N/A',
                'section_title': section_title[0] if section_title else 'N/A',
                'line_number': line_number
            })
    
    return changes_data

# Example usage
docx_path = 'data/2_extract_data/raw_data_example/Draft R4-2409310 SUL big CR.docx'
tracked_changes = extract_tracked_changes(docx_path)
for change in tracked_changes:
    print(f"Change Type: {change['type']}, Text: {change['text']}, Section: {change['section_number']}, Title: {change['section_title']}, Line: {change['line_number']}")


