import React from 'react';

const ImportFromFileBodyComponent = () => {
    let fileReader;

    const handleFileReader = (e) => {
        const content = fileReader.result;
        console.log(content);
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return 
    <div className="upload-expense">
        <input type="file" id="file" className="input-file"
            onChange={e => handleFileChosen(e.target.files[0])} />
    </div>
}

export default ImportFromFileBodyComponent;