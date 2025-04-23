import { Token } from "@/types/api";
import TokenEditForm from "./MyDialog";

const Page = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:8000/api/tokens/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    const data: Token = await res.json();

    return (
        <div className="container mx-auto py-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Token bearbeiten</h1>
            <div className="w-full max-w-[600px]">
                <TokenEditForm token={data} />
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic'
export default Page;