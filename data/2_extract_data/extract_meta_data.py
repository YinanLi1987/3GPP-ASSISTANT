import os
from typing import Optional
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from pathlib import Path
from schemas import ChangeRequestTdoc

# Load environment variables
def load_api_key():
    env_path = Path(__file__).resolve().parent.parent / '.env'
    load_dotenv(dotenv_path=env_path)
    api_key = os.getenv("MISTRALAI_API_KEY")
    print(f"Loaded API Key: {api_key}") 
    return os.getenv("MISTRALAI_API_KEY")

# Define a custom prompt to provide instructions and any additional context.
# 1) You can add examples into the prompt template to improve extraction quality
# 2) Introduce additional parameters to take context into account (e.g., include metadata
#    about the document from which the text was extracted.)
# Function to extract metadata
def extract_metadata(text: str) -> Optional[ChangeRequestTdoc]:
    api_key = load_api_key()
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an expert extraction algorithm. "
                "Only extract relevant information from the text. "
                "If you do not know the value of an attribute asked to extract, "
                "return null for the attribute's value.",
            ),
            ("human", "{text}"),
        ]
    )

    llm = ChatMistralAI(model="mistral-large-latest", temperature=0, api_key=api_key)

    runnable = prompt | llm.with_structured_output(schema=ChangeRequestTdoc)
    result = runnable.invoke({"text": text})
    
    return result