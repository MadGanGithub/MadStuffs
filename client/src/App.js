import "./App.css";
import AppBar from "./component/appbar.js";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/about.js";
import Home from "./Pages/home.js";
import Contact from "./Pages/contact.js";
import SinglePost from "./Pages/single_post.js";
import Login from "./Pages/login.js";
import SignUp from "./Pages/signup.js";
import Display from "./Pages/display.js";
import EditPage from "./Pages/editpage.js"
import DisplayEdit from "./Pages/editpageedit.js";
import Fab from "./component/fab.js";
import { SearchProvider } from "./component/searchcontext.js";
import {LogProvider} from "./component/logcontext.js";

function App() {
  return (
    <> 
    <LogProvider>
    <SearchProvider>

    <AppBar/>


      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/singlepost" element={<SinglePost/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/signup" element={<SignUp/>}/>
       <Route path="/each/:id" element={<Display/>} />
       <Route path="/editpage" element={<EditPage/>}/>
       <Route path="/eachonly/:id" element={<DisplayEdit/>}/>
      </Routes>
      <Fab/> 
    </SearchProvider>
    </LogProvider>
      </>
  );
}
export default App;


