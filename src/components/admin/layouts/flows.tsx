import React from 'react'
import HomeLayout from './home'

const ChatLayout = (components: any) => {
    return (
        <>
             <h2>Chats</h2>

            {components.children}

        </>
    )
}
export default ChatLayout