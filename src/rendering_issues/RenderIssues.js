import React, { useContext } from 'react';
import Loading from '../components/reuseables/Loading';
import { TableBody } from './TableBody';

import { StatusContext } from '../context/StatusContext';
import { SwimlaneContext } from '../context/SwimlaneContext';

/**
 * Renders content of tbody
 * @param {*} props
 */
const RenderIssues = ({
  objectIssuesMap,
  objectIssuesMapIsLoading,
  setObjectIssuesMap,
}) => {
  const [statuses] = useContext(StatusContext);
  const [swimlane] = useContext(SwimlaneContext);

  // Showing spinner while loading issues
  let tableBody = <tr></tr>;
  if (objectIssuesMapIsLoading)
    tableBody = (
      <tr className="border-0">
        <td className="border-0" colSpan={statuses.length + 1}>
          <Loading />
        </td>
      </tr>
    );

  if (
    !objectIssuesMapIsLoading &&
    objectIssuesMap !== undefined &&
    objectIssuesMap !== null
  ) {
    return (
      <TableBody
        swimlane={swimlane}
        objectIssuesMap={objectIssuesMap}
        setObjectIssuesMap={setObjectIssuesMap}
      />
    );
  }

  return tableBody;
};

export default RenderIssues;
