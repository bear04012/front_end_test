import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const LabelName = styled.div`
  height: 24px;
  font-family: NotoSansCJKkr;
  font-weight:"bold"
`;

const ChoiceBox = styled.div`
  display: flex;
  margin: 20px;
  margin-left: 0px;
`;

const Choices = styled.div`
  display:flex;
  margin-right: 20px;
`;

class LabelTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: []
    }
  }

  buildList = (data) => {
    // console.log(data);
    this.setState({
      labels:data
    });
  }

  componentDidMount() {
    let url = "https://tester-api.nearthlab.com/v1/labelTypes";
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
  }


  render() {
    const { labels } = this.state;
    const boxes = labels.map((label, ind) => {
      return (
        <Choices key={label.id}>
          <input type="checkbox" onChange={() => this.props.toggleTypes(ind)} checked={this.props.types[ind]}  />
          <span>{label.title.substring(3)}</span>
        </Choices>
      )
    })
    return (
      <div >
        <LabelName>
          <FontAwesomeIcon style={{ fontSize: "15px",marginRight:"5px"}} icon={faWrench} color="gray" />라벨 종류 선택
        </LabelName>
        <ChoiceBox> 
          {boxes}
        </ChoiceBox>
        
      </div>
    );
  }

}

export default LabelTypes;
