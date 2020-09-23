import React, { useContext, useState, useEffect } from "react";
import { StatusContext } from "../context/StatusContext";
import Loading from "../styled_components/Loading";
import KanbanTable from "../layout/KanbanTable";
import axios from "axios";

function Main() {
  const statusContext = useContext(StatusContext);
  const [statuses, setStatuses] = useState([]);

  let content = <Loading />;

  const getStatuses = () => {
    if (!statusContext.statusesAreLoaded) {
      const url = "";
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

  if (statusContext.statusesAreLoaded) {
    content = <KanbanTable statuses={statuses} />;
  }

  return content;
}

export default Main;
