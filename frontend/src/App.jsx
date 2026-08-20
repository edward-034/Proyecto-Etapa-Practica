import { RouterProvider } from "react-router-dom"
import {router} from "./routes/router"
import useSession from "./hooks/useSession"

export default function App(){
  useSession()
  return(<RouterProvider router={router}/>)
}