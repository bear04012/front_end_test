import React from 'react';
import Photo from './Photo'
import styled from "styled-components";

const PicList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { list} = this.props;
    let photos = list.map(photo => {
      let str = photo.photoUrl;
      return (
        
        <Photo key={photo.id} id={photo.id} completed={photo.completed} str={str} photoUrl={photo.photoUrl}/>

      )
    })

    return (
      <PicList>
        {photos}
      </PicList>
    );
  }

}

export default PhotoList;
