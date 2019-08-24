import React from 'react';
import dateFormat from 'dateformat';
import './ImageDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

let types = ["단순 손상", "페인트 벗겨짐", "긴급 수리 필요", "전문가 의뢰 필요"];

class ImageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      photoUrl: "",
      photoTaken: null,
      postDate: null,
      completed:null
    }
  }
  buildList = (data) => {
    console.log(data);
    this.setState({
      labels: data.labels,
      photoUrl: data.photoUrl,
      photoTaken: new Date(data.photoTakenAt),
      postDate: new Date(data.createdAt),
      completed: data.completed
    });
  }
  componentDidMount() {
    let url = "https://tester-api.nearthlab.com/v1/photos/" + this.props.id;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)

  }
  render() {
    let str = dateFormat(this.state.photoTaken, "TT") === "AM" ? "오전" : "오후";
    const labels = this.state.labels.map((label, ind) => {
      
      return (
        <div className="label" key={label.id}>
          <div className="num">라벨 #{ind+1}</div>
          <div className="type">
            <div className="type_1">유형: </div>
            <div>{types[label.typeId-1]}</div>
          </div>
          <div className="description">
            <div className="description_1">설명: </div>
            <div>{label.description}</div>
          </div>
        </div>
      )
    })
    return (
      <div >
        <div style={{fontWeight:"bold"}}>파일 상세 정보</div>
        <div className="body">
          <div className="left">
            <img src={this.state.photoUrl} height={180} width={230} />
            <div>파일명: {this.state.photoUrl.substring(64)}</div>
            <div>촬영시간: {dateFormat(this.state.photoTaken, "yyyy. m. dd. ") + str+ dateFormat(this.state.photoTaken," h:MM:ss")}</div>
            <div>등록일:   {dateFormat(this.state.postDate,"yyyy. m. dd.")}</div>
          </div>
          <div className="right">
            <div style={{ fontWeight: "bold" }}> <FontAwesomeIcon style={{ fontSize: "15px", marginRight: "5px",marginLeft:"20px" }} icon={faWrench} color="gray" />라벨 정보</div>
            {labels}
          </div>
        </div>
        
        
        <button className="home" onClick={this.props.changeMenu}>Home</button>
        {this.state.completed ? <div style={{ color: "green", fontSize: "2em" }} className="completed">완료</div> : <div style={{ color: "red", fontSize: "2em"}} className="incompleted">미완료</div>}
        
      </div>
    );
  }

}

export default ImageDetail;
