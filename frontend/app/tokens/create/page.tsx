import TokenCreationForm from "./TokenCreationForm"

const Page = () => {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Token erstellen</h1>
            <div className="w-full max-w-[600px]">
                <TokenCreationForm />
            </div>
        </div>
  )
}

export default Page