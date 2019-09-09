import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import styled from "styled-components";

const Picture= styled.div`
  position: relative;
  height: 170px;
  margin: 20px;
  cursor: pointer;
  border: solid 1px #dfe3ea;
  box-shadow: 0 2px 2px 0 #ecedef;
  border-radius: 10px;
  padding: 5px;
`;


let permanentComplete = localStorage.getItem("completes");
if (!permanentComplete) {
  permanentComplete = [];
} else {
  permanentComplete = permanentComplete.substring(1, permanentComplete.length - 1).split(",");
  for (let i = 0; i < permanentComplete.length; i++) {
    permanentComplete[i] = parseInt(permanentComplete[i]);
  }
}


function isCompleteID(id) {
  for (let i = 0; i < permanentComplete.length; i++) {
    if (permanentComplete[i] == id) {
      return true;
    }
  }
  return false;
}

const photo = (props) => {
  
  return (
    <Link to={`/photos/${props.id}`}>
      <Picture>
        {(props.completed||isCompleteID(props.id)) && <FontAwesomeIcon style={{ position: "absolute", right: 0, fontSize: "50px", top: -1 }} icon={faMedal} color="gold" />}
        <img src={props.photoUrl} height={140} width={180} style={{ borderRadius: "10px" }} />
        <div style={{ marginTop: '8px', marginLeft: '5px' }}>{props.str.substring(64)}</div>
      </Picture>
    </Link>
  )
}

export default photo;