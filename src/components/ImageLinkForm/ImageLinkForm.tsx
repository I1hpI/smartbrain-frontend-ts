import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit,bees }:{onInputChange:any, onButtonSubmit:any, bees:any}, ) => {
  return (
    <div>
      <p className='f3'>
        {'Detects multiple faces in the image'}
      </p>
     {bees &&
      <div className='white f3'>
      {`The number of faces detected in the given image is ${bees}`}
      </div>
     }
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
         {/* on change triggers onInputChange and onClick triggers onbuttonsubmit */}
          <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;