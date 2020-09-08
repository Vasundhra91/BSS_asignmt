import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

import { generateRows } from './data';

export default () => {

const test= [{"gender": "Female", "name": "Sandra", "city": "Las Vegas", "car": "Audi A4"},
{"gender": "Male", "name": "Paul", "city": "Paris", "car": "Nissan Altima"},
{"gender": "Male", "name": "Mark", "city": "Paris", "car": "Honda Accord"},
{"gender": "Male", "name": "Paul", "city": "Paris", "car": "Nissan Altima"},
{"gender": "Female", "name": "Linda", "city": "Austin", "car": "Toyota Corolla"},
 {"gender": "Male", "name": "Robert", "city": "Las Vegas", "car": "Chevrolet Cruze"}
,{"gender": "Female", "name": "Lisa", "city": "London", "car": "BMW 750"}
, {"gender": "Male", "name": "Mark", "city": "Chicago", "car": "Toyota Corolla"}
,{"gender": "Male", "name": "Thomas", "city": "Rio de Janeiro", "car": "Honda Accord"}
,{"gender": "Male", "name": "Robert", "city": "Las Vegas", "car": "Honda Civic"}
, {"gender": "Female", "name": "Betty", "city": "Paris", "car": "Honda Civic"}
, {"gender": "Male", "name": "Robert", "city": "Los Angeles", "car": "Honda Accord"}
, {"gender": "Male", "name": "William", "city": "Los Angeles", "car": "Honda Civic"}
, {"gender": "Male", "name": "Mark", "city": "Austin", "car": "Nissan Altima"}
, {"gender": "Female", "name": "Mary", "city": "Chicago", "car": "BMW 750"}]

  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [rows] = useState(generateRows({ length: test.length-1 , test:test }));
  const [pageSizes] = useState([5, 10, 15]);
 
  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}>
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
  );
};
