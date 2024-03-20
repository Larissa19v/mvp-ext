import { Link } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";


export default function ButtonBack() {
  return (
    <div>
      <div>
        <Button>
          <Link to="/private" className="home-button">
            <MdAccountBox size="30" color="brown" />
          </Link>
        </Button>
      </div>
    </div>
  );
}


export function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
