import React, { Component } from 'react';
import { initDatabase, insertImage, getAllImages } from '../../../lib/sqliteHelper';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: null,         // SQLite Database instance
      images: []        // Images retrieved from the DB
    };
  }

  // Initialize the database on component mount
  async componentDidMount() {
    const database = await initDatabase();
    this.setState({ db: database });
  }

  // Handle file change, read it as binary, and insert it into the database
  handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && this.state.db) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBlob = new Uint8Array(reader.result); // Convert file to binary
        insertImage(this.state.db, file.name, imageBlob);
        this.fetchImages(); // Refresh the image list
      };
      reader.readAsArrayBuffer(file); // Read file as binary
    }
  };

  // Fetch all images from the database and update state
  fetchImages = () => {
    if (this.state.db) {
      const savedImages = getAllImages(this.state.db);
      this.setState({ images: savedImages });
    }
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <h1>SQLite Image Uploader</h1>
        <input type="file" accept="image/*" onChange={this.handleFileChange} />
        <div>
          <h2>Uploaded Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {images.map((image) => (
              <div key={image.id} style={{ margin: '10px' }}>
                <img
                  src={`data:image/png;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(image.data))
                  )}`}
                  alt={image.name}
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <p>{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
