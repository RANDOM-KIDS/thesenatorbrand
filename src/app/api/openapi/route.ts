import { NextResponse } from "next/server";

export async function GET() {
  const openApiSpec = {
    openapi: "3.2.0",
    info: {
      title: "Project API",
      version: "1.0.0",
      description: "API documentation built with OpenAPI 3.2.0",
    },
    paths: {
      "/api/health": {
        get: {
          summary: "Health Check",
          description: "Returns the operational status of the application.",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        example: "ok",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec);
}
