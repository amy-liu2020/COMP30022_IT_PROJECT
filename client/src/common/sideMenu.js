import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import { getGroups } from "../api"

const SideMenu = ({ tab }) => {
  const [groups, setGroups] = useState([]);
  let history = useHistory();

  // initialise groups
  useEffect(() => {
    setGroups(getGroups(tab));
  }, [tab]);

  return (
    <div className="sideM">
      <button
        className="sideM-create"
        onClick={() => history.push(`/${tab}/edit`)}
      >
        <MdAdd />
        create {tab}
      </button>
      {groups.map((group) => (
        <Link className="sideM-group" to={`/${tab}?group=${group.value}`}>
          {group.label}
        </Link>
      ))}
      <button className="sideM-addGroup">add new group</button>
      <button className="sideM-import">import</button>
      <button className="sideM-export" onClick={() => {history.push("/contact/export")}}>export</button>
      <button className="sideM-bin">bin</button>
    </div>
  );
};

export default SideMenu;
