import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "best_route_app",
  });
}
