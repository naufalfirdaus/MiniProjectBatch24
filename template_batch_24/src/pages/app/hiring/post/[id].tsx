import { useRouter } from "next/router";
export default function Update() {
  const router = useRouter();
  return <div>update id: {router.query.id}</div>;
}
