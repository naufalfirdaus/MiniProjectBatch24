import AppLayout from "@/pages/component/layout/AppLayout";
import { useRouter } from "next/router";

export default function EditBatch(){
    const router = useRouter()
    return (
        <AppLayout>
            Edit {router.query.id}
        </AppLayout>
    )
}