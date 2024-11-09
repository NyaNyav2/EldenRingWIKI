import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {Navbar} from "./components";
import { Weapon,Armor,Sorceries,Ashes,Spirits,Talismans,ItemPage,Login,SignUp,User,Home,UserInfo,EditUserInfo } from './pages';
import styles from "./style";
function App() {
  return (
    <div className="w-full  min-h-screen bg-opacity-95 bg-black  ">
      <Router>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <main className="w-full pt-16 ">
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/weapons" element={<Weapon/>}/>
          <Route path="/armors" element={<Armor/>}/>
          <Route path="/sorceries" element={<Sorceries/>}/>
          <Route path="/ashes" element={<Ashes/>}/>
          <Route path="/spirits" element={<Spirits/>}/>
          <Route path="/talismans" element={<Talismans/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="/userinfo" element={<UserInfo/>}/>
          <Route path="/userinfo/:userId/:infoId" element={<EditUserInfo/>}/>

           {/* Dynamic Routes for Item Details */}
           <Route path="/:id" element={<ItemPage />} />
           <Route path="/:type/:id" element={<ItemPage />} />
          
        </Routes>

        </main>
      </Router>
    </div>
  );
}

export default App;