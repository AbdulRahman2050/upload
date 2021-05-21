import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState();
  const [filesName, setFileName] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3001/upload", formData);
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      console.log(uploadedFile.filePath);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="ms">
      <main>
        <form onSubmit={handleForm} className="formS">
          <div className="ac">
            <label htmlFor="text">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />

            <input type="file" name="file" onChange={handleChange} />

            <button type="submit">Upload</button>
          </div>
        </form>

        <div className="disImg">
          {uploadedFile && (
            <>
              <img src={filesName} alt="123" />
              <p>{description}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
