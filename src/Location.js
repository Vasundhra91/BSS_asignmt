import React, { useEffect, useState } from 'react'
import Dexie from '../node_modules/dexie/dist/dexie'
import AddMore from './AddMore'
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { generateRows } from './data';
import Container from '@material-ui/core/Container';


import {
    PagingState,
    IntegratedPaging,
    EditingState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel, TableEditRow, TableEditColumn
} from '@devexpress/dx-react-grid-material-ui';

export default function Location() {
    
    const [rows,setRows] = useState([]);
    var db = new Dexie("Database");

    db.version(1).stores({
        LocationStore: "++id,Location,Address1,Address2,PhoneNo"
    });

    db.open().catch(function () {
        alert("Open failed: ");
    });
    const [columns] = useState([
        { name: 'Location', title: 'Location' },
        { name: 'Address1', title: 'Address' },
        { name: 'PhoneNo', title: 'PhoneNo' },
    ]);



     const [pageSizes] = useState([5, 10, 15]);
     const getRowId = rows => rows.id;
   
    // let map = rows.map((item=>{
    //     return {"Location": item.Location,"Address1":item.Address1,"PhoneNo":item.PhoneNo}
    // }));
    
    
    useEffect(() => {
        db.LocationStore.toArray()
        .then(result => setRows(generateRows({ length: result.length , test:result })))
        .catch(function (e) {
            console.log(e)
        })
        
    }, [])
    const commitChanges = ({  changed, deleted }) => {
        let changedRows;
        
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      var c=   rows.map(row => (changed[row.id] ? { 
             ...changed[row.id] 
            } : changed[row.id]));
            const columns = Object.keys(changed);
           db.LocationStore.update(parseInt(columns[0]), changed[columns[0]])
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));

            db.LocationStore.delete(deleted[0])
        }
        setRows(changedRows);
    };
    return (
        <div>
            {rows === [] ? (<> <b>Kindly Add your Location First</b> </>) : (
                <>
                    <div style={{ paddingLeft: "8%" }}>
                        <h2> Location </h2>
                    </div>
                    <div style={{ textAlign: "right", paddingRight: "8%" }}>
                        <Popup modal trigger={<Button type="submit"
                            variant="contained"
                            color="primary">Add Location</Button>}>
                            {close => <AddMore close={close} />}
                        </Popup>
                    </div>
                    <Container component="main" maxWidth="md" style={{ background: "#ECECE9" }}>
                        <Paper>
                            <Grid
                                rows={rows}
                                columns={columns}
                                getRowId={getRowId}>
                                <EditingState onCommitChanges={commitChanges} />
                                <PagingState
                                    defaultCurrentPage={0}
                                    defaultPageSize={5}
                                />
                                <IntegratedPaging />
                                <Table />
                                <TableHeaderRow />
                                <TableEditRow />
                                <TableEditColumn
                                    showEditCommand
                                    showDeleteCommand
                                />
                                <PagingPanel
                                    pageSizes={pageSizes}
                                />
                            </Grid>
                        </Paper>
                    </Container>
                </>
            )
            }
        </div >
    )
}
