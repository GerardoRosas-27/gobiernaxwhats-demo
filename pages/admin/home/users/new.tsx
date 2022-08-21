import UserForm from '@components/admin/users/UserForm';
import UserInfo from '@components/admin/users/UserInfo';
import React from 'react'

const newUser = () => {
    return (
        <div>
            <h1>New user</h1>

            <h2>Header</h2>

            <UserInfo />
            <UserForm />

        </div>
    )
}
export default newUser;
