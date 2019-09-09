import React from 'react';
import styled from "styled-components";

const Selected = styled.button`
  font-weight: bold;
  margin: 10px;
  border: white;
  font-size: 20px;
  cursor:default;
`;

const Button = styled.button`
  background: white;
  font-weight: bold;
  margin: 10px;
  border: white;
  cursor: pointer;
  font-size: 20px;
`;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { currentPage, maxPage, handlePage } = this.props;
    console.log(currentPage);
    let pages = [];
    let start = (currentPage - 4 > 0 ? currentPage - 4 : 1);
    for (let i = start; i < (start + 10 > maxPage + 1 ? maxPage + 1 : start + 10); i++) {
      pages[i] = i;
    }
    let displayPages = pages.map(num => {
      if (currentPage == num) {
        return (<Selected className="selected" style={{ color: "green" }} key={num}>{num}</Selected>)
      } else {
        return (<Button onClick={() => {
          handlePage(num);
        }} key={num}>{num}</Button>)
      }
    })

    return (
      <div >
        {displayPages}
      </div>
    );
  }

}

export default Pagination;