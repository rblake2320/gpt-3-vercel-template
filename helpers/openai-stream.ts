// Copy from https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions#edge-functions-with-streaming

import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import server from "../config-server";

export async function OpenAIStream(payload: object) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  let url = new URL(server.openAIAPIBaseURL);
  url.pathname = "/v1/chat/completions";

  const res = await fetch(url.href, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${server.openAIAPIKey}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${error}`);
  }

  if (!res.body) {
    throw new Error("OpenAI API returned no response body");
  }

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0]?.delta?.content ?? "";

            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      try {
        const reader = res.body!.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          parser.feed(decoder.decode(value));
        }
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return stream;
}
