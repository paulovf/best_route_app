import { getApiDocs } from "../../../src/lib/swagger";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const metadata = {
  title: "API Documentation | Best Route",
};

export default async function ApiDocPage() {
  const spec = await getApiDocs();

  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <div className="container mx-auto py-10">
          <SwaggerUI spec={spec} />
        </div>
      </body>
    </html>
  );
}
