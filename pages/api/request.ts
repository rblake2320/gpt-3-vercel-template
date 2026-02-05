// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import server from "../../config-server";
import { NextRequest } from "next/server";
import { OpenAIStream } from "../../helpers/openai-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const requestBody = await req.json();

    let messageContent: string = requestBody.input;

    if (typeof messageContent !== "string" || !messageContent) {
      return new Response(
        JSON.stringify({ error: "Invalid input: 'input' field is required and must be a non-empty string" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (server.messageTemplate) {
      if (server.messageTemplate.includes("{{input}}")) {
        messageContent = server.messageTemplate.replaceAll(
          "{{input}}",
          messageContent
        );
      } else {
        messageContent = server.messageTemplate + "\n\n" + messageContent;
      }
    }

    let systemMessage = server.systemMessage
      ? {
          role: "system",
          content: server.systemMessage,
        }
      : undefined;
    let userMessage = {
      role: "user",
      content: messageContent,
    };

    const payload = {
      model: "gpt-3.5-turbo",
      messages: systemMessage ? [systemMessage, userMessage] : [userMessage],
      stream: true,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } catch (error) {
    console.error("API request error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
