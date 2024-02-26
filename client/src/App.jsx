import { useState } from "react";
import { useEffect } from "react";

import "./App.css";

function App() {
  const [pageView, setPageView] = useState("home");
  const [projects, setProjects] = useState([]);

  //Use GET to fetch all projects, setProjects will update projects state and render in Gallery on load
  useEffect(() => {
    //GET all items from database
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // upon success, update tasks
        console.log("Data fetched from database");
        console.log(data);
        setProjects(data);
      })
      .catch((error) => {
        // upon failure, show error message
        console.error("Error fetching data:", error);
      });
  }, []);

  // Conditional rendering to set the view - home view renders by default in useState
  return (
    <div>
      <NavBar handlePageView={setPageView} />
      {pageView === "home" && <Home handlePageView={setPageView} />}
      {pageView === "create" && <Create handlePageView={setPageView} />}
      {pageView === "gallery" && (
        <Gallery handlePageView={setPageView} projects={projects} />
      )}
      {pageView === "ideas" && <Ideas handlePageView={setPageView} />}
    </div>
  );
}

//Reusable button
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function NavBar({ handlePageView }) {
  return (
    <>
      {/* Button to set view to landing (homepage) */}
      <Button onClick={() => handlePageView("home")}>🏠</Button>
      <h1>My Craftbook</h1>
    </>
  );
}

//HOME Contains three buttons to go to different pages
function Home({ handlePageView }) {
  return (
    <div>
      <div>
        <Button onClick={() => handlePageView("create")}>Create</Button>
      </div>
      <div>
        <Button onClick={() => handlePageView("gallery")}>My Projects</Button>
      </div>
      <div>
        <Button onClick={() => handlePageView("ideas")}>Get Ideas</Button>
      </div>
    </div>
  );
}

//Form - name, type, materials, description. Image - url OR new select option for preselected images
function Create() {
  return (
    <>
      <form>
        <h2>Create a new project</h2>
        <div>
          <h3>1. Give your project a name</h3>
          <input type="text" label="project name"></input>
        </div>
        <div>
          <h3>2. Choose a craft</h3>
          <select label="type" value="type">
            <option>Paper craft</option>
            <option>Knitting</option>
            <option>Sewing</option>
            <option>Painting and drawing</option>
            <option>Collage</option>
            <option>Fimo and clay</option>
            {/* Option to write own type */}
          </select>
        </div>
        <div>
          <h3>3. Describe your project</h3>
          <input type="text" label="description"></input>
        </div>
        {/* Is it possible to map through preset images and insert as component? */}
        <div>
          <h3>4. Add an image or choose one</h3>
          <input type="text" label="image url" placeholder="image url"></input>

          <label>
            <input type="radio" id="image1" name="presetImage" />
            <img
              className="image-select"
              src="src/assets/knitting.jpg"
              alt="knitting"
            />
          </label>

          <label>
            <input
              type="radio"
              id="image2"
              name="presetImage"
              // value={src/assets/scrapbook.jpg}
            />
            <img
              className="image-select"
              src="src/assets/scrapbook.jpg"
              alt="Scrapbooking"
            />
          </label>
        </div>
      </form>
    </>
  );
}

//Split project into separate component. Pass projects as prop or use component composition?
function Gallery({ projects }) {
  return (
    <div>
      View projects here
      <AllProjects projects={projects} />
    </div>
  );
}

//Project component - shows image and name. onClick shows all info. Accepts projects as a prop from gallery
function AllProjects({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        // Creates a project from each item in the array and gives it a key
        <ProjectCard project={project} key={project.id} />
      ))}
    </ul>
  );
}

function ProjectCard({ project }) {
  return (
    <>
      <h4>{project.projectname}</h4>
      <img src={project.image} alt={project.name} />
    </>
  );
}

//Youtube API
function Ideas() {
  return <div>Get ideas here</div>;
}

//showImage component -
export default App;
