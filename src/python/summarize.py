import openai

OPENAI_KEY = ""


async def summarize(text):
    openai.api_key = OPENAI_KEY

    query = f"Summarize the following text. Format the answer in markdown: {text}"

    return await openai.Engine("babbage").agenerate(
        prompt=query,
        temperature=0.3,
        max_tokens=64,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["\n", " Human:", " AI:"],
    )
