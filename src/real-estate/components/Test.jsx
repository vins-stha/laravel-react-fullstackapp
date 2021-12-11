import React from 'react'

import { Card } from "react-bootstrap";
// export const Testing = (props) => {
//     console.log('speedups')
//     return (
//         <div>
//             <h6>TESTs{props.props.id}</h6>
//         </div>
//     )
// }



export const Testing = (props) =>{
    console.log('test')
  return (
    <Card style={{ border: "0px solid red", overflow: "hidden",
    borderRadius: "12px",  height: "100%" }}>
      <Card.Img
        variant="top"
        src={props.props.url}
        style={{ height: "300px", width:"600px", marginBottom: "15px" , border:"0px solid yellow"}}
      />
    
    </Card>
  );
}
