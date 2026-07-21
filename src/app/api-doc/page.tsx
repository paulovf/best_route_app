import { getApiDocs } from "../../../src/lib/swagger";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const metadata = {
  title: "API Documentation | Best Route",
};

export default async function ApiDocPage() {
  const spec = await getApiDocs();

  return (
    <section className="bg-white min-h-screen py-10">
      <div className="container mx-auto">
        <SwaggerUI spec={spec} />
      </div>
    </section>
  );
}
