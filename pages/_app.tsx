import ChatLayout from '@components/admin/layouts/flows';
import FlowsLayout from '@components/admin/layouts/flows';
import HomeLayout from '@components/admin/layouts/home';
import { ChatStateProvider } from '@store/chats/chatsContext';
import { ModuleStateProvider } from '@store/modulesFlows/ModulesContext';
import initialStateUser from '@store/users/initalStateUser';
import { reduceUser } from '@store/users/reducerUser';
import UserContext from '@store/users/UserContext';
import { AppProps } from 'next/app';
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
  '/admin/home/flows/chats',
  '/admin/home/flows/chats/new',
  '/admin/home/flows/chats/detail',
]

function MyApp({ Component, pageProps,router }: AppProps) {

  return (
    <ModuleStateProvider>
      <ChatStateProvider>
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
      </ChatStateProvider>
    </ModuleStateProvider>
  )
}


export default MyApp
