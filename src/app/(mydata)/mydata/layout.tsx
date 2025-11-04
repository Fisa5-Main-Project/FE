import React from 'react';

const MyDataLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-container h-full rounded-[44px] overflow-hidden">
      {children}
    </div>
  );
};

export default MyDataLayout;
