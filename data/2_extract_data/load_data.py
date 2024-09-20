
import os
import re
from dotenv import load_dotenv
from pathlib import Path
from langchain_community.document_loaders import AzureAIDocumentIntelligenceLoader




# Load environment variables
def load_api_key():
    env_path = Path(__file__).resolve().parent.parent / '.env'
    load_dotenv(dotenv_path=env_path)
    return os.getenv("AZURE_API_KEY")

# Function to load document content
def load_document_content(file_path: str):
    # Load the API key and endpoint from environment
    api_key = load_api_key()
    endpoint = os.getenv("AZURE_ENDPOINT")


 # Load the document
    loader = AzureAIDocumentIntelligenceLoader(
        api_endpoint=endpoint,
        api_key=api_key,
        file_path=file_path,
        api_model="prebuilt-layout"
    )

    documents = loader.load()
    # Extract and return the content from all documents
    contents = []
    for document in documents:
        contents.append(document.page_content)
    return contents


