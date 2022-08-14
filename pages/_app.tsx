import ChatLayout from '@components/admin/layouts/flows';
import FlowsLayout from '@components/admin/layouts/flows';
import HomeLayout from '@components/admin/layouts/home';
import { useEffect, useState } from 'react';
import '../styles/globals.css'

const routerHome = [
  '/admin/home',
  '/admin/home/flows',
  '/admin/home/users',
  '/admin/home/customers',
  '/admin/home/flows/new',
  '/admin/home/flows/detail',
]
const routerChats = [
  '/admin/home/flows/new/chats',
  '/admin/home/flows/new/chats/new',
  '/admin/home/flows/new/chats/detail',
]

function MyApp(data: any) {
  let { Component, pageProps, router } = data
  return (
    <>
      {routerHome.includes(router.pathname) ?
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout> :
        routerChats.includes(router.pathname) ?
          <HomeLayout>
            <ChatLayout>
              <Component {...pageProps} />
            </ChatLayout>
          </HomeLayout> :
          <>
            <Component {...pageProps} />
          </>
      }
    </>

  )
}


export default MyApp
