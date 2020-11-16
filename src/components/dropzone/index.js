import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  width: '15.4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const StyledDropzone = (props) => {
  const [filesTo, setFiles] = useState([]);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: 1,
    multiple: props.multiple,
    onDrop: props.onDrop
  });

  const files = acceptedFiles.map(file => (
    <li className="file-name" key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  // console.log(acceptedFiles);

  return (
    <div className="container">
      <div className="drop" {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p className="drag-msg">Виберіть файл, або перенесіть його в цю область</p>
      </div>
    </div>
  );
};

export default StyledDropzone
