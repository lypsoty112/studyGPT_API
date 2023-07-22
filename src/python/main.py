import sys
import os
from toText import convertToText
from summarize import summarize
import asyncio

ARGS_NUM = 6
FILETYPES = [
    "application/pdf",
    "application/msword",
    "text/plain",
    "text/html",
    "text/markdown",
]
OPENAI_KEY = "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"


async def main():
    # Parse the command line arguments
    if len(sys.argv) != ARGS_NUM:
        print(
            "Usage: python summarize.py <path> <encoding> <mimetype> <filename> <size> "
        )
        sys.exit(1)
    # Get the arguments
    fileInfo = {
        "path": sys.argv[1],
        "encoding": sys.argv[2],
        "mimetype": sys.argv[3],
        "filename": sys.argv[4],
        "size": sys.argv[5],
    }
    # Print the arguments

    # Allow only certain mimetypes: pdf, docx, txt, html, md
    if fileInfo["mimetype"] not in FILETYPES:
        print("Invalid file type")
        sys.exit(1)

    # Create a switch statement to handle the different file types
    content = convertToText(fileInfo)
    # Delete the original file
    summary = await summarize(content)
    print(summary)
    # Give the data to openAI
    os.remove(fileInfo["path"])


if __name__ == "__main__":
    asyncio.run(main())
