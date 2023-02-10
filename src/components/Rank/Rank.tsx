import React from 'react';
interface IProps{
  name:string,
  entries:number
}

class Rank extends React.Component<IProps>{
  state = {
    
    entries : this.props.entries
  }
  render(){
    return (
      <div>
        {/* the name and entries are displayed here which are passed down using props */}
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        
  
        <div className='white f1'>
          {this.props.entries}
        </div>
        
      </div>
    );
  }
  
  }
  
export default Rank;