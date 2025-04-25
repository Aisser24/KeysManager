import React from 'react'

const Page = async ({ params }: { params:Promise<{id: string}>}) => {
    const { id } = await params;

    return (
        <div>Page</div>
    )
}

export default Page