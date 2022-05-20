import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';

const Loader = lazy(() => import("./components/Loader"));
const Login = lazy(() => import("./routes/Login"))

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      }/>
      <Route path='/login' element={
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      }/>
    </Routes>
  );
}

export default App;
