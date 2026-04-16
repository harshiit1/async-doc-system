import Upload from "./components/upload";
import JobList from "./components/job-list";
import "./App.css";
function App() {
  return (
    <>
      <div style={{ padding: 20 }}>
        <h1>Document Processing System</h1>
        <div className="wrap">
            <Upload />
            <JobList />

        </div>
      </div>
    </>
  );
}

export default App;
