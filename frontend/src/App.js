import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Chat from './pages/Chat'

import "./App.css"

const Hello = () => {
  return (
    <div className='App'>
      <Route path='/' component={HomePage} exact/>
      <Route path='/chat' component={Chat}/>
    </div>
  )
}
export default Hello