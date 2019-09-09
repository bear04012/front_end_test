import React from 'react';
import styled from "styled-components";
import Spinner from 'react-spinner-material';

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Loading = (props) => {
  return (
    <Loader>
      <Spinner size={120} spinnerColor={"green"} spinnerWidth={2} visible={true} />
    </Loader>
    
  )
}

export default Loading;
