import React from "react";
import { networkInterfaces } from "os";

const EarlyVoting = props => (
  
    <div>
      <div>
       <h4>{props.address.locationName}</h4>
      </div>
      <div>
       {props.address.line1}
      </div>
      <div>
      {props.address.city}, {props.address.state}
      </div>
      <div>
      {props.address.zip}
      </div>
      <br />
      <div>
      <p>Polling Hours:</p>
      {console.log(props.startDate)}
   
   
      {props.pollingHours}

      </div>
      <br />
    </div>
  );
  
  export default EarlyVoting;