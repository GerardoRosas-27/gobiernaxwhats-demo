import ChatLayout from '@components/admin/layouts/flows';
import FlowsLayout from '@components/admin/layouts/flows';
import HomeLayout from '@components/admin/layouts/home';
import initialStateUser from '@store/users/initalStateUser';
import { reduceUser } from '@store/users/reducerUser';
import UserContext from '@store/users/UserContext';
import { useEffect, useReducer, useState } from 'react';
import '../styles/globals.css'

const routerHome = [
  '/admin/home',
  '/admin/home/flows',
  '/admin/home/users',
  '/admin/home/users/new',
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
  const store = useReducer(reduceUser, initialStateUser);
  return (
    <UserContext.Provider value={store}>
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
    </UserContext.Provider>
  )
}


export default MyApp
