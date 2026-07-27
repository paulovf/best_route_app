import { useRoute } from "@/features/routing/context/RouteContext";
import { useIsMounted } from "@/hooks/useIsMounted";

export function useResultLink() {
  const { routeData, errorData } = useRoute();
  const isMounted = useIsMounted();

  let resultHref = "/#form-screen";

  if (isMounted) {
    if (routeData?.options && routeData.options.length > 0) {
      resultHref = "/result/success";
    } else if (errorData) {
      resultHref = "/result/fail";
    }
  }

  return resultHref;
}
