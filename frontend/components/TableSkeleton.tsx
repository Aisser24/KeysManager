import { Skeleton } from "./ui/skeleton"


const TableSkeleton = () => {
  return (
    <>
    <div className="flex justify-end py-4">
        <Skeleton className="h-8 w-24 m-4" />
    </div>
    <div className="rounded-md border">
        {/* Tabellenkopf */}
        <div className="border-b bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
        {/* Tabellenkörper */}
        <div className="divide-y">
            {
                Array(5).fill(0).map((_, index) => (
                    <div key={index} className="px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default TableSkeleton