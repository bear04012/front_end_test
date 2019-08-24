import React from 'react';
import './Label.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

class Label extends React.Component {
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
      .catch();
  }


  render() {
    const { labels } = this.state;
    // console.log(labels);
    const boxes = labels.map((label, ind) => {
      return (
        <div className="choices" key={label.id}>
          <input type="checkbox" onClick={() => this.props.toggleTypes(ind)} />
          <span>{label.title}</span>
        </div>
      )
    })
    return (
      <div >
        <div className="labelName" style={{fontWeight:"bold"}}><FontAwesomeIcon style={{ fontSize: "15px",marginRight:"5px"}} icon={faWrench} color="gray" />라벨 종류 선택
        </div>
        <div className="choiceBox"> 
          {boxes}
        </div>
        
      </div>
    );
  }

}

export default Label;
