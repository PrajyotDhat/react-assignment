import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import useSelectModal from './utils/hooks/useSelectModal';
import ModalComponent from './components/ModalComponent';
import Sidebar from './components/SidebarComponent';
import ProfileInfo from './pages/ProfileInfo';

function App() {

  const { renderModal } = useSelectModal();
  const [open, setOpen] = useState(true);

  return (
    <div className="flex w-full">
    <div className='w-[11%]'>
      <Sidebar open={open} setOpen={setOpen} />
      </div>
      <div className='w-full'>
      <Routes>
        <Route
          path='/'
          element={<DashBoard />}
        />
        <Route
          path='/profile-info'
          element={<ProfileInfo/>}
        />
      </Routes>
      </div>
      {renderModal && <ModalComponent>{renderModal}</ModalComponent>}
    </div>
  );
}

export default App;
