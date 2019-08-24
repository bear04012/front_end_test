import React from 'react';
import './Home.css';
import Label from './Label';
import ImageDetail from './ImageDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu:"home",
      meta:null,
      list: [],
      error: null,
      total: 0,
      currentPage:1,
      maxPage: -1,
      id: -1,
      types: [false,false,false,false],
    }
    this.createPages = this.createPages.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.createPhotos = this.createPhotos.bind(this);
    this.toggleTypes = this.toggleTypes.bind(this);
  }
  buildList = (data) => {
    console.log(data);
    this.setState({
      meta: data.meta,
      list: data.photos,
      total: data.meta.total,
      maxPage:data.meta.maxPage
    });
  }

  uploadData(num) {
    let str = "";
    this.state.types.forEach((type,ind) => {
      if (type) {
        str += "&labelTypeIds[]=" + (ind+1);
      }
    });
    let url = "https://tester-api.nearthlab.com/v1/photos?page=" + num +"per=12" +str;
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
      .catch();
  }

  componentDidMount() {
    // let url = "https://tester-api.nearthlab.com/v1/photos?page="+this.state.currentPage+1;
    // fetch(url)
    //   .then(response => response.json())
    //   .then(this.buildList)
    //   .catch();
    this.uploadData(1);
    
  }
  changeMenu() {
    this.setState({ menu: "home" });
  }
  toggleTypes(num) {
    let types = this.state.types;
    types[num] = !types[num];
    this.setState({ types });
    this.uploadData(this.state.currentPage);
  }

  createPhotos() {
    let photos = this.state.list.map(photo => {
      let str = photo.photoUrl;
      return (
        <div key={photo.id} onClick={() => {
          this.setState({
            menu: "detail",
            id: photo.id
          })
        }} className="photo">
          {photo.completed && <FontAwesomeIcon style={{ position: "absolute", right: 0, fontSize: "50px", top: -1 }} icon={faMedal} color="gold" />}
          <img src={photo.photoUrl} height={140} width={180} style={{ borderRadius: "10px" }} />
          <div style={{ marginTop: '8px', marginLeft: '5px' }}>{str.substring(64)}</div>
        </div>

      )
    })
    return photos;

  }

  createPages(num) {
    let pages = [];
    let start = (this.state.currentPage - 4 > 0 ? this.state.currentPage - 4 : 1)
    for (let i = start; i < (start+10>num+1?num+1:start+10); i++) {
      pages[i] = i;
    }
    let maxPage = pages.map(num => {
      if (this.state.currentPage === num) {
        return (<button className="selected" style={{color:"green"}} key={num}>{num}</button>)
      } else {
        return (<button onClick={() => {
          this.setState({ currentPage: num })
          this.uploadData(num);
        }} key={num}>{num}</button>)
      }
    }
  )
    return maxPage;
  }
  render() {
    
    const { menu } = this.state;
    console.log(this.state.list);
    // console.log(this.state.currentPage);
    console.log(this.state.types);

    const photos = this.createPhotos();
    const pages = this.createPages(this.state.maxPage);
    // const photos = this.state.list.photos.map(image => {
    //   <div key={image.id}>Hi</div>
     
    return ( 
      <div >
        {menu === "home" &&
        <div>
          <Label types={this.state.types} toggleTypes={this.toggleTypes}/>
          <div className="total">전체 {(this.state.currentPage) * 12}/{this.state.total}</div>
          
          <div className="currentPage">Page of {this.state.currentPage}</div>
          <div className="photos">
            {photos}
          </div>
          <div className="pages">
            {pages}
            ...
          </div>
        </div>
        }
        {menu === "detail" && <ImageDetail menu={this.state.menu} changeMenu={this.changeMenu} id={this.state.id} />}
        
      </div>
    );
  }

}

export default Home;