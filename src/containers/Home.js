import React from 'react';
import LabelTypes from './LabelTypes';
import PhotoList from '../components/PhotoList';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import styled from "styled-components";
import qs from 'qs';

const CurrentPage = styled.div`
  text-align: center;
`;

const Pages = styled.div`
  text-align: center;
  margin-top: 10vh;
`;


const Total = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta:null,
      list: [],
      total: 0,
      currentPage:localStorage.getItem("page")==null?1:localStorage.getItem("page"),
      maxPage: -1,
      id: -1,
      per:-1,
      types: [false, false, false, false],
      isLoading: true,
      permanentComplete:[]
    }
    // 
    this.buildList = this.buildList.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.toggleTypes = this.toggleTypes.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }
  buildList(data){
    // console.log(data);
    this.setState({
      meta: data.meta,
      list: data.photos,
      total: data.meta.total,
      per:data.meta.per,
      maxPage: data.meta.maxPage,
      isLoading:false
    });
  }
  async uploadData(num) {
    let str = "";
    this.state.types.forEach((type,ind) => {
      if (type) {
        str += "&labelTypeIds[]=" + (ind+1);
      }
    });
    let url = "https://tester-api.nearthlab.com/v1/photos?page=" + num +"per=12" +str;
    const response = await fetch(url);
    const data = await response.json();
    this.buildList(data);
      // .then(response => response.json())
      // .then(this.buildList)
    console.log(data);
  }
  componentDidMount() {
    this.uploadData(this.state.currentPage);
  }
  toggleTypes(num) {
    let types = this.state.types;
    types[num] = !types[num];
    this.setState({ types });
    this.uploadData(this.state.currentPage);
  }
  handlePage(num) {

    localStorage.setItem("page", num);
    this.setState({ currentPage: num });
    this.uploadData(num)

  }
  render() {
    const { currentPage, types, total, maxPage, list,per,isLoading } = this.state;
    let currentPics = (currentPage * per);
    console.log(list);

    // console.log(qs);
    // let obj = qs.parse('a=c');
    // let obj = [1, 2, 3];
    // localStorage.setItem("completes", JSON.stringify(obj));
    console.log(localStorage);
     
    return ( 
      <div style={{margin:"30px"}}>
        {isLoading ? <Loading /> :
          <div>
            <LabelTypes types={types} toggleTypes={this.toggleTypes} />
            <Total>전체 {currentPics}/{total}</Total>
            <CurrentPage>Page of {currentPage}</CurrentPage>

            <PhotoList list={list} />

            <Pages>
              <Pagination maxPage={maxPage} currentPage={currentPage} handlePage={this.handlePage} />
            </Pages>
          </div>
      }  
      </div>
    );
  }

}

export default Home;