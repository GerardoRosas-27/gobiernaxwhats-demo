import HomeLayout from '@components/admin/layouts/home';
import React from 'react'
import Link from 'next/link'

const ListFlowsPage = () => {
    return (
        <div>
            <Link href={'/admin/home/flows/new'}>New</Link>
            <div>Lista de flujos</div>
        </div>

    )
}
export default ListFlowsPage;
ListFlowsPage.Layout = HomeLayout