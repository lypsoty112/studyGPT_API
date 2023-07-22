import sys
import fitz
import docx
from bs4 import BeautifulSoup
import markdown


"""
FileInfo: {
    "path", "encoding", "mimetype", "filename", "size"
}
"""

def convertToText(fileInfo):
    mimetype = fileInfo["mimetype"]
    text = ""
    if mimetype == "application/pdf":
        text = pdf_to_text(fileInfo)
    elif mimetype == "application/msword":
        text = docx_to_text(fileInfo)
    elif mimetype == "text/plain":
        text = txt_to_text(fileInfo)
    elif mimetype == "text/html":
        text = html_to_text(fileInfo)
    elif mimetype == "text/markdown":
        text = md_to_text(fileInfo)
    else:
        print("Invalid file type")
        sys.exit(1)
    return text.encode(sys.stdout.encoding, errors="replace").decode(sys.stdout.encoding)

def pdf_to_text(pdf_content):
    doc = fitz.open(pdf_content["path"])
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def docx_to_text(docx_content):
    doc = docx.Document(docx_content["path"])
    fullText = []
    for para in doc.paragraphs:
        fullText.append(para.text)
    return '\n'.join(fullText)

def txt_to_text(txt_content):
    with open(txt_content["path"], "r") as myfile:
        return myfile.read()

def html_to_text(html_content):
    with open(html_content["path"], "r") as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, "html.parser")
    text_content = soup.get_text(separator="\n")
    return text_content

def md_to_text(md_content):
    with open(md_content["path"], "r") as file:
        md_content = file.read()

    html_content = markdown.markdown(md_content)
    soup = BeautifulSoup(html_content, "html.parser")
    text_content = soup.get_text(separator="\n")
    return text_content