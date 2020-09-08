import React, { useState } from 'react';
import Dexie from '../node_modules/dexie/dist/dexie'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from "react-select";
import Facility from './facilityTime'
import Popup from "reactjs-popup";
function AddMore({ close }) {
  const [Location, setLocation] = useState("")
  const [Address1, setAddress1] = useState("")
  const [SuitNo, setSuitNo] = useState("")
  const [PhoneNo, setPhoneNo] = useState("")
  const [Address2, setAddress2] = useState("")
  const [City, setCity] = useState("")
  const [State, setState] = useState("")
  const [ZipCode, setZipCode] = useState("")
  const [TimeZone, setTimeZone] = useState("")
  const [AppointmentPool, setAppointmentPool] = useState("")
  const [FacilityTimes, setFacilityTimes] = useState("")
  const [selectedOption, setselectedOption] = useState(false);
  const [data] = useState([{label: "IST", value: "IST"},{label: "UST", value: "UST"}]);

  var db = new Dexie("Database");
  console.log(TimeZone)
  db.version(1).stores({
    LocationStore: "++id,Location,Address1,Address2,SuitNo,PhoneNo,City,State,ZipCode,TimeZone,AppointmentPool,FacilityTimes"
  });

  db.open().catch(function () {
    alert("Open failed: ");
  });
  function handleChange(selectedOption) {
    setTimeZone(selectedOption.value);
    setselectedOption(selectedOption);
   };

  function handleClick() {
   

    db.LocationStore.add({Location:Location,Address1:Address1,Address2:Address2,SuitNo:SuitNo,PhoneNo:PhoneNo,City:City,State:State,ZipCode:ZipCode,TimeZone:TimeZone,AppointmentPool:AppointmentPool,FacilityTimes:FacilityTimes})
    .then(function () {
      return db.LocationStore.toArray();
    }).then(result => console.log(result))
      .catch(function (e) {
        console.log(e)
      });
  }
  return (
  <div className="modal">
  
    <Container component="main" maxWidth="md" style={{ background: "#ECECE9" }}>
    <div style={{textAlign:"right" }}> <Button type="submit" onClick={close}>close</Button> </div>
  <div className="header">  <h1>Add Location</h1> </div>
  <div className="content">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField label="Location Name" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Location" onChange={(e) => setLocation(e.target.value)} /></Grid>
      
        <Grid item xs={6} sm={6}>
          <TextField label="Address Line 1" variant="outlined"
            margin="normal"
            required
            id="Address1"
            fullWidth onChange={(e) => setAddress1(e.target.value)} /></Grid>
        <Grid item xs={6} sm={6}>
          <TextField label="Suit No." variant="outlined"
            margin="normal"
            required
            id="SuitNo"
            fullWidth onChange={(e) => setSuitNo(e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={6}>
        <TextField label="Address Line 2" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Address2" onChange={(e) => setAddress2(e.target.value)} />
        </Grid>
        <Grid item xs={3} sm={3}>
        <TextField label="City" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="City" onChange={(e) => setCity(e.target.value)} />
        </Grid>
        <Grid item xs={3} sm={3}>
        <TextField label="State" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="State" onChange={(e) => setState(e.target.value)} />
        </Grid>
        <Grid item xs={3} sm={3}>
        <TextField label="Zip Code" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ZipCode" onChange={(e) => setZipCode(e.target.value)} />
         
        </Grid>
        <Grid item xs={3} sm={3}>
        <TextField label="Phone No" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="PhoneNo" onChange={(e) => setPhoneNo(e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={6}>
            Time Zone: <Select value={selectedOption} classname ="form-control input-sm" options={data}  onChange={handleChange}  />
       
        </Grid>
        <Grid item xs={6} sm={6}>
        <TextField label="Facility Times" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="FacilityTimes" onChange={(e) => setFacilityTimes(e.target.value)} />
            <div style={{ textAlign: "right", paddingRight: "8%" }}>
                        <Popup modal trigger={<Button type="submit"
                            variant="contained"
                            color="primary">FacilityTimes</Button>}>
                            {close => <Facility close={close} />}
                        </Popup>
                    </div>
      </Grid>
        <Grid item xs={6} sm={6}>
        <TextField label="Appointment Pool" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="AppointmentPool" onChange={(e) => setAppointmentPool(e.target.value)} />
        </Grid>
        <Grid item xs={8} sm={8}></Grid>
        <Grid item xs={2} sm={2}>
          <Button type="submit"
            variant="contained"
            color="primary" onClick={handleClick}>Add</Button>
        </Grid>
        <Grid item xs={2} sm={2}>
        <Button type="submit"
        variant="contained" color="secondary"
         onClick={close}>close</Button>
        </Grid>
      </Grid>
      </div>
  

    </Container>
    </div>
  
  );
}
export default AddMore;