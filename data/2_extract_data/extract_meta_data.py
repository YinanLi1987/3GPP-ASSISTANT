import os
from typing import Optional
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from pathlib import Path
# Find the .env file in the root directory
env_path = Path(__file__).resolve().parent.parent / '.env'
# Load the .env file
load_dotenv(dotenv_path=env_path)
# Load the API key from the environment
api_key = os.getenv("MISTRALAI_API_KEY")
print(api_key)

class ChangeRequestTdoc(BaseModel):
    """Metadata of the 3GPP change request T doc."""

    # ^ Doc-string for the entity Person.
    # This doc-string is sent to the LLM as the description of the schema Person,
    # and it can help to improve extraction results.

    # Note that:
    # 1. Each field is an `optional` -- this allows the model to decline to extract it!
    # 2. Each field has a `description` -- this description is used by the LLM.
    meeting: Optional[str] = Field(default=None, description="The name of the meeting")
    document_number: Optional[str] = Field(default=None, description="The document number for reference")
    location: Optional[str] = Field(default=None, description="The location where the meeting is held")
    dates: Optional[str] = Field(default=None, description="The dates of the meeting")
    form_version: Optional[str] = Field(default=None, description="The version of the CR form used")

    affected_spec: Optional[str] = Field(default=None, description="The technical specification affected by the change")
    cr_number: Optional[str] = Field(default=None, description="The change request number")
    revision: Optional[str] = Field(default=None, description="The revision number of the document, if applicable")
    current_version: Optional[str] = Field(default=None, description="The current version of the affected specification")
    proposed_change_affects:Optional[str] = Field(default=None, description="The checked boxes of UICC apps, ME, Radio Access Network, CoreNetwork")
    title: Optional[str] = Field(default=None, description="The title of the change request")
    source_wg: Optional[str] = Field(default=None, description="The source working group for the change request")
    source_tsg: Optional[str] = Field(default=None, description="The source technical specification group for the change request")
    work_item_code: Optional[str] = Field(default=None, description="The work item code related to the change request")
    date_submitted: Optional[str] = Field(default=None, description="The date the change request was submitted")
    category: Optional[str] = Field(default=None, description="The category of the change request")
    release: Optional[str] = Field(default=None, description="The release version the change applies to")

    reason_for_change: Optional[str] = Field(default=None, description="The reason for the proposed change")
    summary_of_change: Optional[str] = Field(default=None, description="A summary of the proposed changes")
    consequences_if_not_approved: Optional[str] = Field(default=None, description="The consequences if the change is not approved")

    affected_clauses: Optional[str] = Field(default=None, description="The specific clauses affected by the change request")
    other_core_specs_affected:Optional[str] = Field(default=None, description="The core specific clauses affected by the change request")
    other_test_specs_affected:Optional[str] = Field(default=None, description="The test specific clauses affected by the change request")
    other_o_m_specs_affected:Optional[str] = Field(default=None, description="The O&M specific clauses affected by the change request")
    other_comments: Optional[str] = Field(default=None, description="Additional comments related to the change request")
    other_comments: Optional[str] = Field(default=None, description="Additional comments related to the change request")
    other_comments: Optional[str] = Field(default=None, description="Additional comments related to the change request")

# Define a custom prompt to provide instructions and any additional context.
# 1) You can add examples into the prompt template to improve extraction quality
# 2) Introduce additional parameters to take context into account (e.g., include metadata
#    about the document from which the text was extracted.)
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert extraction algorithm. "
            "Only extract relevant information from the text. "
            "If you do not know the value of an attribute asked to extract, "
            "return null for the attribute's value.",
        ),
        # Please see the how-to about improving performance with
        # reference examples.
        # MessagesPlaceholder('examples'),
        ("human", "{text}"),
    ]
)

llm = ChatMistralAI(model="mistral-large-latest", temperature=0,api_key=api_key)

runnable = prompt | llm.with_structured_output(schema=ChangeRequestTdoc)
text = "3GPP TSG-RAN WG4 Meeting #111	R4-2410768 Fukuoka, Japan, 20th – 24th May 2024CR-Form-v12.3CHANGE REQUEST38.101-1CR	2371rev	-Current version:18.5.0For HELP on using this form: comprehensive instructions can be found at http://www.3gpp.org/Change-Requests.Proposed change affects:	UICC apps		ME	X	Radio Access Network		Core Network	"
result=runnable.invoke({"text": text})
print(result)