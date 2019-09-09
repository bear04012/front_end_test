import React from 'react';
import styled from "styled-components";

const Num = styled.div`
  margin: 20px;
`;

const Type = styled.div`
  display: flex;
  margin: 20px;
`;

const Type_1 = styled.div`
  margin-right: 25px;
`;

const Description = styled.div`
  display: flex;
  margin: 20px;
`;

const Description_1 = styled.div`
  margin-right: 20px;
  width: 36px;
`;

const Wrapper = styled.div`
  height: 194px;
  border: solid 1px #dfe3ea;
  box-shadow: 0 2px 2px 0 #ecedef;
  border-radius: 10px;
  margin: 10px;
`;

const Label = (props) => {
  const type = props.labelTypes[props.typeId - 1];
  if (props.labelTypes.length >= 1) {
    return (
      <Wrapper>
        <Num>라벨 #{props.ind + 1}</Num>
        <Type>
          <Type_1>유형: </Type_1>
          <div>{type.title.substring(3)}</div>
        </Type>
        <Description>
          <Description_1>설명: </Description_1>
          <div>{props.description}</div>
        </Description>
      </Wrapper>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
  
}

export default Label;