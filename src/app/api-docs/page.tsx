import ReactSwagger from "./react-swagger";
import { getOpenApiSpec } from "@/lib/swagger";

export default async function ApiDocsPage() {
  const spec = getOpenApiSpec();
  return (
    <section className="container mx-auto p-4">
      <ReactSwagger spec={spec} />
    </section>
  );
}
