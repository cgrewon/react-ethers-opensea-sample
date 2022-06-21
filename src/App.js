import './App.css';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/register/register';
import Magic from './pages/magic_login/magic';

import EmailConfirm from './pages/email_confirm/email_confirm';
import ConnectWallets from './pages/connect_wallets/connect_wallets';
import ArtistProfile from './pages/artist/artist_profile'
import ArtistNFTView from './pages/artist/artist_nft_view'
import SingleNFTView from './pages/artist/single-nft-view';
import ArtistFansFollowers from './pages/artist/artist-fans-followers';
import ArtistFanSigleView from './pages/artist/fan-single-view';
import FanProfile from './pages/fan/fan_profile';
import FanProfileEdit from './pages/fan/fan_profile_edit';
var metadata = require('../package.json')



const _v = window.localStorage.getItem('__v__')
if(_v != metadata.version) {
  window.localStorage.clear()
  window.sessionStorage.clear()
  window.localStorage.setItem('__v__', metadata.version)
  
}


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/email_confirm" element={<EmailConfirm />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/connect_wallets" element={<ConnectWallets />} />
        <Route path="/email/login/:code" element={<Magic />} />
        <Route path="/artist" element={<ArtistProfile />} />
        <Route path="/fan" element={<FanProfile />} />
        <Route path="/fan/edit" element={<FanProfileEdit />} />
        <Route path="/artist/nfts" element={<ArtistNFTView />} />
        <Route path="/nft/:tokenId/:tokenAddr" element={<SingleNFTView />} />
        <Route path="/artist/fans-followers" element={<ArtistFansFollowers />} />
        <Route path="/artist/fan" element={<ArtistFanSigleView />} />
      </Routes>
      <div className='lbl-version'>
        Version: {metadata.version}
      </div>
    </div>
  );
}

export default App;
