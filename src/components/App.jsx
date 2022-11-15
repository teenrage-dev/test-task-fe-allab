import { Home } from 'pages/Home/Home';
import { JobBoard } from 'pages/JobBoard/JobBoard';
import { JobDetailed } from 'pages/JobDetailed/JobDetailed';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getCityName } from 'shared/api/getCityName';
import { getAllBoard } from 'shared/api/jobBoard';

export const App = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await getAllBoard();
        setData([...list]);
      } catch (error) {
        console.log(error.message);
      }
    };

    getList();
  }, []);

  useEffect(() => {
    data.forEach(async item => {
      try {
        const dataGeo = await getCityName(
          item.location.lat,
          item.location.long
        );

        item.country = dataGeo.countryName;
        item.locality = dataGeo.locality;
        item.city = dataGeo.city;
        setLocation(prevState => [...prevState, dataGeo]);
      } catch (error) {
        console.log(error.message);
      }
    });
  }, [data]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<JobBoard data={data} />} />
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
