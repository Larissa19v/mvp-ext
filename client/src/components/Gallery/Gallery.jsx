import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Navbar";
import SearchProjects from "./SearchProjects";



function Gallery() {
  const [projects, setProjects]= useState([]);
  const [filtProjects, setFiltProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setFiltProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h3 className="page-header">All Projects</h3>
      <SearchProjects projects={projects} setFiltProjects={setFiltProjects} />
      <br />
      <br/>
      <div className="container overflow-hidden">
        <div className="row justify-content-center">
          {filtProjects.map((project) => (
            <div
              key={project.id}
              className="project-list-item col col-sm-12 col-md-6 col-lg-3 p-3 m-1"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
