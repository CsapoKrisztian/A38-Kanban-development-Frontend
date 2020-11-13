import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AccessProvider } from './context/AccessContext';
import { SwimlaneProvider } from './context/SwimlaneContext';
import { FilterProjectIdsProvider } from './context/FilterProjectIdsContext';
import { FilterMilestoneTitlesProvider } from './context/FilterMilestoneTitlesContext';
import { FilterStoryTitlesProvider } from './context/FilterStoryTitlesContext';
import { StatusProvider } from './context/StatusContext';

/**
 * All child components of the App has access to the statuses, and the selected filters,
 * and they know if the user is authenticated or not,
 * because of the FilterContext and the AccessContext and the StatusContext.
 */
ReactDOM.render(
  <React.StrictMode>
    <AccessProvider>
      <SwimlaneProvider>
        <FilterProjectIdsProvider>
          <FilterMilestoneTitlesProvider>
            <FilterStoryTitlesProvider>
              <StatusProvider>
                <App />
              </StatusProvider>
            </FilterStoryTitlesProvider>
          </FilterMilestoneTitlesProvider>
        </FilterProjectIdsProvider>
      </SwimlaneProvider>
    </AccessProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
