import { useState, useEffect } from "react";
import "./SearchProject.css";


export default function SearchProjects({ projects, setFiltProjects}) {
  const [search, setSearch] = useState("");
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    filterProjects(e.target.value);
  };

  const filterProjects= (search) => {
    const filtProjects= projects.filter((project) =>
    project.type.toLowerCase().includes(search.toLowerCase())
    );
    setFiltProjects(filtProjects);
  };
      

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="search"
          placeholder="Find a project by type"
          value={search}
          onChange={handleSubmit}
        />
      </form>
    </div>
  );
}
