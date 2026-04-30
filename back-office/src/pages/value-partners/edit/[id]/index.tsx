import { useEffect } from "react";
import { useRouter } from "next/router";

export default function EditValuePartnerRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      router.replace(`/value-partners/partner/${router.query.id}`);
    }
  }, [router]);
  return null;
}
