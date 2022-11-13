import { Home } from 'pages/Home/Home';
import { JobBoard } from 'pages/JobBoard/JobBoard';
import { JobDetailed } from 'pages/JobDetailed/JobDetailed';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<JobBoard />} />
        <Route path="details" element={<JobDetailed />} />
        <Route
          path="*"
          element={
            <div>
              <h2>Not Found</h2>
            </div>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <div>
            <h2>Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
};
