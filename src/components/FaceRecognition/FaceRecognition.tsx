// import React from 'react';
// import './FaceRecognition.css';

// const FaceRecognition = ({ imageUrl, box }) => {
//   return (
//     <div className='center ma'>
//       <div className='absolute mt2'>
//         <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
//         <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
//       </div>
//     </div>
//   );
// }

// export default FaceRecognition;

import React from 'react';
import './FaceRecognition.css';
import {IBoxes} from '../../App'

const FaceRecognition = ({ imageUrl, boxes  }:{imageUrl:string, boxes:[IBoxes]}) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2' >
      
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        {/* basically mapping the the images which are in the array to apply borders on each face */}
        {boxes && boxes.map(box =>
          <div key={`box${box.topRow}${box.rightCol}`}
              className='bounding-box'
              style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                
              
          </div>
        )}
      </div>
    
    </div>
  );
}

export default FaceRecognition;