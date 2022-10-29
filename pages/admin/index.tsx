import React from 'react'
import Link from 'next/link'
const AdminPage = () => {
    return (
        <div>
            <h1>Amin</h1>
            <Link href="/admin/login">Login</Link>
            <Link href="/admin/home">Home</Link>
        </div>
    )
}
export default AdminPage