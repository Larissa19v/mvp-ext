import { useState } from "react";

//Icons
import { MdFavorite, MdFavoriteBorder, MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

//Project components
import DeleteProjectButton from "./DeleteProject";
import ProjectModal from "./ProjectModal";
import EditProject from "./EditProject";

export default function ProjectCard1({ project, setProjects }) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);

  // Toggle favourite - fetch request to toggle favorite true/false
  const toggleFavorite = () => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/projects/favorites/${project.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  };

  // Toggle complete - fetch request to toggle complete true/false

  const toggleComplete = () => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/projects/completed/${project.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  };

  //Function to open the modal for selected project.
  {/*const openProjectModal = () => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };*/}

  //Function to toggle edit form
  const viewEditProject = () => {
    setSelectedProject(project);
    setDeleteWarning(false);
    setOpenEditProject(!openEditProject);
  };

  return (
    <div>
      <div>
        <img src={project.image} alt={project.name} className="project-image" />
      </div>
      <div className="button-container">

        {/* Button to call viewEditProject */}
        <button onClick={viewEditProject}>
          {openEditProject ? (
            <MdEdit style={{ color: "var(--mid-purple)" }} />
          ) : (
            <MdEdit style={{ color: "var(--grey-blue)" }} />
          )}
        </button>

        {/* Button opens delete confirmation div. */}
        <button
          onClick={() => {
            setDeleteWarning(true);
            setOpenEditProject(false);
          }}
        >
          <FaRegTrashAlt style={{ color: "var(--grey-blue)" }} />
        </button>
      </div>
      {/* The "hidden" parts of each projectc card - the delete confirmation, project modal and edit form*/}
      <div>
        {deleteWarning && (
          <div className="alert alert-success mt-3" role="alert">
            <h5>Delete project?</h5>
            {/* Renders delete button - on click calls delete fetch request */}
            <DeleteProjectButton project={project} setProjects={setProjects} />
            {/* Button to close and not delete project */}
            <button
              type="button"
              className="close"
              onClick={() => setDeleteWarning(false)}
            >
              No ❌
            </button>
          </div>
        )}
      </div>
      {projectModalOpen && (
        <ProjectModal
          project={project}
          setProjects={setProjects}
          setProjectModalOpen={setProjectModalOpen}
        />
      )}
      {openEditProject && (
        <EditProject
          project={project}
          setProjects={setProjects}
          openEditProject={openEditProject}
          setOpenEditProject={setOpenEditProject}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </div>
  );
}
