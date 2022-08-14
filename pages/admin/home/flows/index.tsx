import HomeLayout from '@components/admin/layouts/home';
import React from 'react'
import Link from 'next/link'

const ListFlowsPage = () => {
    return (
        <div>
            <Link href={'/admin/home/flows/new'}>New</Link>
            <Link href={'/admin/home/flows/detail'}>Detail</Link>
            <div>Lista de flujos</div>
        </div>

    )
}
export default ListFlowsPage;
