import React from 'react'
import HomeLayout from './home'

const ChatLayout = (components: any) => {
    return (
        <>
            <p>Lista de chats</p>

            {components.children}

        </>
    )
}
export default ChatLayout