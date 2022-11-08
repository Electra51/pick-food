import Main from "../../Layouts/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import CommentForm from "../../Pages/CommentForm/CommentForm";
import Home from "../../Pages/Home/Home";
import ServiceDetail from "../../Pages/ServiceDetail/ServiceDetail";
import Servicess from "../../Pages/Servicess/Servicess";


const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
      path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/home',
        element:<Home></Home>
      },
      {
        path: '/services',
        element: <Servicess></Servicess>,
        loader: async () => {
          return fetch('http://localhost:5000/services')
        }
      },
      {
        path: '/services/:id',
        element: <ServiceDetail></ServiceDetail>,
        loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
       
      },
      {
        path: '/commentForm',
        element:<CommentForm></CommentForm>
      },
      {
        path: '/blogs',
        element:<Blogs></Blogs>
        }
      
      ]
    },
  ]);