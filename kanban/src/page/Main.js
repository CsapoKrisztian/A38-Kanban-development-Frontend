import React, { useContext, useState, useEffect } from "react";
import { StatusContext } from "../context/StatusContext";
import Loading from "../styled_components/Loading";
import KanbanTable from "../layout/KanbanTable";
import axios from "axios";
import Filters from "../styled_components/Filters";
import serverUrl from "../context/ServerUrl";

function Main() {
  let content = <Loading />;
  const statusContext = useContext(StatusContext);
  const [statuses, setStatuses] = useState([]);

  const getStatuses = () => {
    if (!statusContext.statusesAreLoaded) {
      const url = `${serverUrl}/statuses`;
      const token = "";
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setStatuses(response);
          statusContext.setStatuses(response);
          statusContext.setStatusesAreLoaded(true);
        });
    } else {
      setStatuses(statusContext.statuses);
    }
  };

  useEffect(() => {
    getStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuses]);

  let projects = ["Project1", "Project2", "Project6"];
  let milestone = ["X"];

  if (statusContext.statusesAreLoaded) {
    content = (
      <React.Fragment>
        <Filters projects={projects} milestone={milestone}></Filters>
        <KanbanTable statuses={statuses} />
      </React.Fragment>
    );
  }

  return content;
}

export default Main;
