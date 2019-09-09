import React from 'react';
import Label from './Label';


class LabelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelTypes:[]
    }
  }

  buildList = (data) => {
    // console.log(data);
    this.setState({
      labelTypes: data
    });
  }

  componentDidMount() {
    let url = "https://tester-api.nearthlab.com/v1/labelTypes";
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
  }

  render() {
    const { labels } = this.props;
    const { labelTypes } = this.state
    const labelList = labels.map((label, ind) => {
      return (
        <Label key={ind} id={label.id} ind={ind} typeId={label.typeId} description={label.description} labelTypes={labelTypes}/>
      )
    })
      return (
        <div>
          {labelList}
        </div>
      )
  }
}
export default LabelList;
