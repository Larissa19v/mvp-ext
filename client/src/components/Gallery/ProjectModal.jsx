import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProjectModal({ project, setProjectModalOpen }) {
  const navigate= useNavigate();
  const handleRegister =() => {
    navigate("/register");
  };
  
  //Create modal to show project info
  return (
    <div
      className="modal fade"
      id="projectModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content project-modal">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {project.projectname}
            </h5>
          </div>
          <div className="modal-body">
            <img className="project-image" src={project.image} />
            <ul>
              <li>
                <p>
                  <h5>Type</h5>
                  {project.type}
                </p>
              </li>
              <li>
                <p>
                  <h5>Materials</h5>
                  {project.materials}
                </p>
              </li>
              <li>
                <p>
                  <h5>Want to change?</h5>

                  <Link to="/login/" className="link" >
                    Sign in
                  </Link>
                </p>
              </li>
            </ul>
            <div>
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
                onClick={() => setProjectModalOpen(false)}
              >
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
