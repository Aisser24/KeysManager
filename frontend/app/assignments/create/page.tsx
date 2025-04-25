import AssignmentCrationForm from "./AssignmentCrationForm"

const Page = () => {
    return (
        <div className="container mx-auto py-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Assignment erstellen</h1>
                <div className="w-full max-w-[600px]">
                    <AssignmentCrationForm />
                </div>
        </div>
    )
}

export default Page