import React from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {}

export default function Layout(props: Props) {
    return (
        <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'> 
        <Header/>
        <main className='flex-1 flex flex-col p-4'>
        </main>
        <Footer/>
        </div>
    )
}