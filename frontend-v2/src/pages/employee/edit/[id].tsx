import { useRouter } from 'next/router';
import EditPage from './editPage';

export default function UpdatePage() {
  const router = useRouter();
  const empEntityId = router.query.data;

  console.log("empEntityId: ", empEntityId);

  return <EditPage empEntityId={empEntityId} />;
}