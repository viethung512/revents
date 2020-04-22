import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropperInput = ({ imagePreview, setImage }) => {
  const cropper = useRef();
  const _crop = () => {
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
      return;
    } else {
      cropper.current.getCroppedCanvas().toBlob(blob => {
        setImage(blob);
      }, 'image/jpeg');
    }
  };

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 400, width: '100%' }}
      // Cropper.js options
      preview='.img-preview'
      aspectRatio={1}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      guides={false}
      crop={_crop}
    />
  );
};

export default CropperInput;
