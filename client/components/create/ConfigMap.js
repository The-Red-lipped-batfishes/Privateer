import React from 'react';
import TextField from '@mui/material/TextField';
import { renderEditInputCell, useGridControlState } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// creates multiple fields to populate "data:" properties


const ConfigMap = () => {

  const multiFields = [];
  
  for (let i = 1; i <= 2; i++) {
    
    multiFields.push(
      // <div>
      //   <p>hi</p>
      // </div>
      <TextField
        key={i}
        required
        id="multi-fields"
        label="Key/Value Pair"
        defaultValue=""
      />
    );
  }

  return (
    <div>
      <form id="config-map">
        <h4>What is your "apiVersion:" value</h4>
          <TextField
            required
            id="outlined-required"
            label="Ex: v1"
            defaultValue=""
          />
          <h4>What is your "metadata" name value?</h4>
            <TextField
              required
              id="outlined-required"
              label="my-name"
              defaultValue=""
            />
          <h4>How many "data:" key/value pairs?</h4>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
            />
          <p>text here</p>
            {multiFields}
            {/* <Button id="save-button" variant="contained">Save</Button>
            <Button id="create-button" variant="contained">Create</Button> */}
        </form>
          <div className="file-save-buttons">
            <Button id="save-button" variant="contained">Save</Button>
            <Button id="create-button" variant="contained">Create</Button>
          </div>
    </div>
  )
};

export default ConfigMap;