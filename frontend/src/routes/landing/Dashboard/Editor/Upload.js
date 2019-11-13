import React from "react";
import Dropzone from "react-dropzone";
import { processFiles } from "../../../../utils/backend";

export default class Avatar extends React.Component {
  constructor() {
    super();
    this.state = {
      images: []
    };

    this.upload = this.upload.bind(this);
  }

  upload(files) {
    processFiles(files).then(urls => {
      this.props.setImage(...urls);
      this.setState({ images: urls });
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.upload}>
          {({ getRootProps, getInputProps }) => (
            <div className="container mt-5 ml-0 image-drop pt-4 pb-4">
              <div
                {...getRootProps({
                  className: "dropzone",
                  onDrop: event => event.stopPropagation()
                })}
              >
                <input name="file" {...getInputProps()} />
                <p className="m-0">Click to select and upload product images</p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
