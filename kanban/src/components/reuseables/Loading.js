import React from "react";

/**
 * Bootstrap spinner in the center of the page
 */
function Loading() {
  return (
    <div className="spinner-container">
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
