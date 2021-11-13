import React from 'react';

//////////////////////////////////////////////////////////
// FORM IMPORTS
//////////////////////////////////////////////////////////
import BucketFormsCreate from './Create';
import BucketFormsToDo from './ToDo';
import BucketFormsInProgress from './InProgress';
import BucketFormsComplete from './Complete';

const BucketForms = (props) => {
  return (
    <div>
      <BucketFormsCreate handleCreateForm={props.handleBucketForm} />
      <BucketFormsToDo handleToDoForm={props.handleBucketForm} />
      <BucketFormsInProgress handleInProgressForm={props.handleBucketForm} />
      <BucketFormsComplete handleCompleteForm={props.handleBucketForm} />
    </div>
  );
};

export default BucketForms;
