import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", 
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Best Route API - Internal documentation",
        version: "1.0.0",
        description: "internal documentation for Best Route project endpoints.",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
