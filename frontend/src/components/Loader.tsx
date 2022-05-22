import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className="spinner-border
                   animate-spin inline-block
                   w-8 h-8 border-8 rounded-full
                   border-t-secondary"
        role="status"
      >
      </div>
    </div>
  );
};

export default Loader;
