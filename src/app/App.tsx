import { RouterProvider } from 'react-router';
import { medicalRouter } from './medicalRoutes';
import "../styles/index.css"
export default function App() {
  return (
    <div dir="rtl">
      <RouterProvider router={medicalRouter} />
    </div>
  );
}
