import React, { useState } from 'react';
import Dexie from '../node_modules/dexie/dist/dexie'
import { Grid, Container, InputLabel, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';


function Facility({ close }) {
    const jsondata =[{
        "week":"",
        "totime":"",
        "fromTime":""
    }]
    const [WeekDay, setWeekDay] = useState(jsondata)
    const [week, setWeek] = useState(["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"])
    const [fromTime, setfromTime] = useState("")
    const [toTime, settoTime] = useState("")
    const [chkweek, setchkweek] = useState("")

    var db = new Dexie("Database");

    db.version(1).stores({
        LocationStore: "++id,Location,Address1,Address2,SuitNo,PhoneNo,City,State,ZipCode,TimeZone,AppointmentPool,FacilityTimes"
    });

    db.open().catch(function () {
        alert("Open failed: ");
    });

    var id=[];
    const ss=(e)=>
  { //add input id
    
    // add all value in Array
    id.push({"week":e.target.id})
    setchkweek(...id)
    console.log(chkweek)
  }
function handleSubmit(e)
{

}
    function handleevent(e)
    {


    
    }
    return (
        <>
         <Container component="main" maxWidth="md" style={{ background: "#ECECE9" }}>
         <div style={{textAlign:"right" }}> <Button type="submit" onClick={close}>close</Button> </div>
                    <div className="header">  <h1>Facility Time</h1> </div>
                    <div className="content">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={1} sm={1}>
                            </Grid>
                            <Grid item xs={5} sm={5}>
                                <h3>To</h3>
                            </Grid>
                            <Grid item xs={5} sm={5}>
                                <h3>From</h3>
                            </Grid>
                        </Grid>
                        {week.map((week, i) => {
                            return (
                                <Grid container spacing={2} key={i}>
                                    <Grid item xs={1} sm={1}>
                                        <FormControlLabel
                                            control={<Checkbox  id={week} value="Y" color="primary" />}
                                            label={week}
                                            onChange={ss} />
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <TextField label="Fromtime" variant="outlined"
                                            margin="normal"
                                            
                                            fullWidth
                                            id={"Fromtime_" + week} onChange={(e) => setfromTime(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={1} sm={1}>
                                        <Button type="submit"
                                            variant="contained"
                                            color="primary"
                                            id={"ToAM_" + week}>AM</Button>
                                    </Grid>
                                    <Grid item xs={1} sm={1}>
                                        <Button type="submit"
                                            variant="contained"
                                            id={"ToPM_" + week}>PM</Button>
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <TextField label="ToTime" variant="outlined"
                                            margin="normal"
                                            
                                            fullWidth
                                            id={"FromTime_" + week} onChange={(e) => settoTime(e.target.value)} /></Grid>
                                    <Grid item xs={1} sm={1}>
                                        <Button type="submit"
                                            variant="contained"
                                            color="primary"
                                            id={"FromAM_" + week}>AM</Button>
                                    </Grid>
                                    <Grid item xs={1} sm={1}>
                                        <Button type="submit"
                                            variant="contained"
                                            id={"FromPM_" + week}>PM</Button>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                        <Button label="APPLYChecked" variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            onClick={handleevent}
                                            id={"btntoall_" + week}>APPLY TO ALL Checked</Button> </Grid>
                                </Grid>
                            )
                        })}
                        <Grid>
                        <Button
            type="submit"
            
            variant="contained"
            color="primary"
          >
            Save
          </Button>
                        </Grid>
                        </form>
                    </div>
                </Container>
        </>
    );
}
export default Facility;