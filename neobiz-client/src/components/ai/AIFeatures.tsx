
import React from 'react';
import SmartWriting from './SmartWriting';
import DocumentAnalysis from './DocumentAnalysis';
import DataAnalysis from './DataAnalysis';

export const AIFeatures = () => {
  return (
    <div className="grid gap-6 grid-cols-1">
      <SmartWriting />
      <DocumentAnalysis />
      <DataAnalysis />
    </div>
  );
};
