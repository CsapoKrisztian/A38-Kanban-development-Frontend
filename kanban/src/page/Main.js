import React, { useContext, useState, useEffect } from "react";
import { LabelContext } from "../context/LabelContext";
import Loading from "../styled_components/Loading";
import KanbanTable from "../layout/KanbanTable";
import axios from "axios";
import Filters from "../styled_components/Filters";
import serverUrl from "../context/ServerUrl";

function Main() {
  let content = <Loading />;
  const labelContext = useContext(LabelContext);
  const [statuses, setStatuses] = useState([]);

  const getStatuses = () => {
    if (!labelContext.statusesAreLoaded) {
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
          labelContext.setStatuses(response);
          labelContext.setStatusesAreLoaded(true);
        });
    } else {
      setStatuses(labelContext.statuses);
    }
  };

  useEffect(() => {
    getStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuses]);

  let projects = ["Project1", "Project2", "Project6"];
  let milestone = ["X"];

  if (labelContext.statusesAreLoaded) {
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
