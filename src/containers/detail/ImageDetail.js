import React from 'react';
import dateFormat from 'dateformat';
import Loading from '../../components/Loading';
import LabelList from './LabelList';
import './ImageDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = styled.button`
  position: absolute;
  bottom: 50px;
  background: white;
  font-weight: bold;
  margin: 10px;
  border: white;
  cursor: pointer;
  font-size: 20px;
`;

const Body = styled.div`
  display: flex;
`;

const Left = styled.div`
  margin-top: 20px;
  margin-right: 50px;
  border: solid 1px #dfe3ea;
  box-shadow: 0 2px 2px 0 #ecedef;
  border-radius: 10px;
  padding: 10px;
`;
const Info = styled.div`
  margin-top: 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const Completed = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  color:green;
  font-size:2.5em;
`;

const Incompleted = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  color:red;
  font-size:2.5em;
`;

const Complete = styled.button`
  margin-top: 30px;
  align-self: center;
  border-radius: 5px;
  width: 80px;
  color: white;
  background: dodgerblue;
  font-weight: bold;
  margin: 10px;
  border: white;
  cursor: pointer;
  font-size: 20px;
`;


class ImageDetail extends React.Component {
  constructor({ props,match }) {
    super(props);
    this.state = {
      id:match.params.id,
      labels: [],
      photoUrl: "",
      photoTaken: null,
      postDate: null,
      completed: false,
      isLoading: true,
    }
    this.uploadStorage = this.uploadStorage.bind(this);
    this.isCompleteID = this.isCompleteID.bind(this);
  }
  buildList = (data) => {
    console.log(data);
    this.setState({
      labels: data.labels,
      photoUrl: data.photoUrl,
      photoTaken: new Date(data.photoTakenAt),
      postDate: new Date(data.createdAt),
      completed: data.completed,
      id: data.id,
      isLoading: false,
    });
  }
  componentDidMount() {
    let url = "https://tester-api.nearthlab.com/v1/photos/" + this.state.id;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
  }
  uploadStorage() {
    let permanentComplete = localStorage.getItem("completes")
    if (!permanentComplete) {
      permanentComplete = [];
      permanentComplete.push(this.state.id+0);
    } else {
      permanentComplete = permanentComplete.substring(1, permanentComplete.length - 1).split(",");
      for (let i = 0; i < permanentComplete.length; i++) {
        permanentComplete[i] = parseInt(permanentComplete[i]);
      }
      permanentComplete.push(this.state.id+0);
    }
    localStorage.setItem("completes", JSON.stringify(permanentComplete));  
    this.setState({
      completed:true
    })
  }

  isCompleteID(id) {
    let permanentComplete = localStorage.getItem("completes")
    if (!permanentComplete) {
      return false;
    } else {
      permanentComplete = permanentComplete.substring(1, permanentComplete.length - 1).split(",");
      for (let i = 0; i < permanentComplete.length; i++) {
        permanentComplete[i] = parseInt(permanentComplete[i]);
      }
      for (let i = 0; i < permanentComplete.length; i++) {
        if (permanentComplete[i] == id) {
          return true;
        }
      }
    }
    return false;
    
}

  render() {
    const { photoUrl, photoTaken, postDate, completed,labels,isLoading,id } = this.state;
    let str = dateFormat(photoTaken, "TT") === "AM" ? "오전" : "오후";
    return (
      <div style={{ margin: "30px" }}>
        {isLoading ? <Loading /> :
          <div>
            <div style={{ fontWeight: "bold" }}>파일 상세 정보</div>
            <Body>
              <Left>
                <img src={photoUrl} height={180} width={230} />
                <Info>파일명: {photoUrl.substring(64)}</Info>
                <Info>촬영시간: {dateFormat(photoTaken, "yyyy. m. dd. ") + str + dateFormat(photoTaken, " h:MM:ss")}</Info>
                <Info>등록일:   {dateFormat(postDate, "yyyy. m. dd.")}</Info>
              </Left>
              <Right>
                <div style={{ fontWeight: "bold" }}> <FontAwesomeIcon style={{ fontSize: "15px", marginRight: "5px", marginLeft: "20px" }} icon={faWrench} color="gray" />라벨 정보</div>

                <LabelList labels={labels}/>
                {(!completed && !this.isCompleteID(id)) && <Complete onClick={this.uploadStorage} >완료</Complete>}
              </Right>
            </Body>

            <Link to="/photos" > <Home>Home</Home></Link>

            {(completed||this.isCompleteID(id)) ?
              <Completed>완료</Completed> :
              <Incompleted>미완료</Incompleted>
            }
          </div>  
      }
      </div>
    );
  }

}

export default ImageDetail;
