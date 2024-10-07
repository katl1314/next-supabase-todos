import { permanentRedirect } from "next/navigation";
export default function Home() {
  permanentRedirect("/todos-no-rls");
  return <></>;
}
