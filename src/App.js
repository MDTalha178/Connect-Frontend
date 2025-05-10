import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import { ToastContainer } from 'react-toastify';
import { ChatInterface } from './component/ChatInterface';
import { Provider } from 'react-redux';
import store from './store/store';
import OtpVerification from './component/OtpVerification';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <ChatInterface />
    },

    {
      path:"/login",
      element: <Login />
    },
    {
      path:'/verification',
      element: <OtpVerification />
    }
  ])
  return (
    <div className="App">
        <Provider store={store}>
          <RouterProvider router={router} />
          <ToastContainer />
        </Provider>
        
    </div>
  );
}

export default App;
