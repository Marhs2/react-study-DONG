import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import IndexPage from './index/page';
import Layout from './layout';
import PostListPage from './post/list/page';
import Proivder from './provider';
import PostCreatePage from './post/create/page';

export default function App() {
  return (
    <Proivder>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<IndexPage />} />
            <Route path='/post' element={<Navigate to='/post/list' />} />
            <Route path='/post/list' element={<PostListPage />} />
            <Route path='/post/create' element={<PostCreatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Proivder>
  );
}
