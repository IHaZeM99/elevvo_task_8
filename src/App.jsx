import { Layout } from "./components/Layout"
import { BrowserRouter as Router , Routes , Route } from "react-router"
import { DashboardPage } from "./pages/DashboardPage"
import { AddJobPage } from "./pages/AddJobPage"
import { JobPage } from "./pages/JobPage.jsx"
import { EditJobPage } from "./pages/EditJobPage.jsx"
import { JobProvider } from "./context/JobContext.jsx"


function App() {
  // Use environment variable or detect production mode
  const basename = import.meta.env.PROD ? '/elevvo_task_8' : '';

  return (
    <div className="font-mono text-gray-800">
      <JobProvider>
        <Router basename={basename}>
          <Routes>
            <Route path="/" exact element={
              <Layout>
                <DashboardPage />
              </Layout>
            }/>
            <Route path="/add-job" element={
              <Layout>
                <AddJobPage />
              </Layout>
            }/>
            <Route path="/job/:id" element={
              <Layout>
                <JobPage />
              </Layout>
            }/>
            <Route path="/edit-job/:id" element={
              <Layout>
                <EditJobPage />
              </Layout>
            }/>
          </Routes>
        </Router>
      </JobProvider>
      
      {/**pages {Dashboard , Add job , Job it self} */}

    </div>
  )
}

export default App
