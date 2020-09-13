import React from "react";

export default function Square(props) {
   return (
      <span
         className={props.className ? `${props.className} square` : `square`}
         onClick={() => props.handleClicked(props.index)}
      >
         {props.val}
      </span>
   )
}