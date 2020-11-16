import React, { useContext } from 'react';
import Loading from '../components/reuseables/Loading';
import { TableBody } from './TableBody';

import { StatusContext } from '../context/StatusContext';
import { SwimlaneContext } from '../context/SwimlaneContext';
import { FilterProjectIdsContext } from '../context/FilterProjectIdsContext';
import { FilterMilestoneTitlesContext } from '../context/FilterMilestoneTitlesContext';
import { FilterStoryTitlesContext } from '../context/FilterStoryTitlesContext';

import useApiCall from '../hooks/useApiCall';

const RenderIssues = () => {
  const [statuses] = useContext(StatusContext);
  const [swimlane] = useContext(SwimlaneContext);
  const [filterProjectIds] = useContext(FilterProjectIdsContext);
  const [filterMilestoneTitles] = useContext(FilterMilestoneTitlesContext);
  const [filterStoryTitles] = useContext(FilterStoryTitlesContext);

  let urlGetIssues =
    swimlane === 'ASSIGNEE'
      ? process.env['REACT_APP_SERVER_ISSUES_BY_ASSIGNEE']
      : process.env['REACT_APP_SERVER_ISSUES_BY_STORY'];

  const [
    objectIssuesMap,
    objectIssuesMapIsLoading,
    setObjectIssuesMap,
  ] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${urlGetIssues}`,
    'POST',
    filterProjectIds,
    filterMilestoneTitles,
    filterStoryTitles
  );

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
