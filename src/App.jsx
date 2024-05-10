import { useEffect, useState } from "react";
import { generateToken } from "./Notifications/Notif";
import { onMessage } from "firebase/messaging";
import { messaging, writeMessage } from "./Notifications/Notif";
import { upload, getImages, deleteImage } from "./Notifications/Storage";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
function App() {
  useEffect(() => {
    generateToken();
    let body;
    onMessage(messaging, (payload) => {
      console.log(payload);
      body = payload.notification.body;
      writeMessage(body);
    });
  }, []);

  const [image, setImage] = useState(null);
  const [id, setID] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlesubmit = () => {
    if (image) {
      upload(image, id);
    }
  };

  const getFiles = () => {
    let container = document.getElementsByName("Images")[0];
    container.innerHTML = "";
    getImages(id)
      .then((urls) => {
        if (urls.length == 0) {
          container.innerHTML = "- No Images exist for this user id";
        }
        for (let i in urls) {
          let li = document.createElement("li");
          li.classList.add("img");
          let img = document.createElement("img");
          let btn = document.createElement("button");
          btn.classList.add("btn");
          img.setAttribute("src", urls[i][0]);
          li.appendChild(img);
          li.appendChild(btn);
          container.appendChild(li);

          btn.innerHTML = "Delete";

          btn.onclick = () => deleteImage(urls[i][1], li);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="page">
      <Container maxWidth="xl">
        <Stack spacing={6} sx={{ marginBottom: "5rem" }}>
          <h1
            style={{
              fontWeight: "bold",
              alignSelf: "center",
              textTransform: "capitalize",
              marginTop: "3rem",
              color: "white",
            }}
          >
            images center
          </h1>
          <div>
            <p
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "1.7rem",
                marginBottom: "1.5rem",
              }}
            >
              Notifications:
            </p>
            <Paper
              sx={{
                width: "100%",
                height: "20rem",
                overflowY: "auto",
                scrollbarWidth: "none",
                boxShadow: "0 0 0.3rem white",
                backgroundColor: "#44aec2",
              }}
            >
              <ul name="list"></ul>
            </Paper>
          </div>

          <Paper
            name="upload"
            sx={{
              width: "100%",
              height: "15rem",
              boxShadow: "0 0 0.3rem white",
              backgroundColor: "#44aec2",
              padding: "0.8rem",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              Upload
            </p>
            <label
              htmlFor="ID"
              style={{
                paddingRight: "1rem",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Enter User ID
            </label>
            <input
              name="ID"
              type="number"
              onChange={(e) => setID(e.target.value)}
              style={{
                height: "1.5rem",
                width: "15rem",
                borderRadius: "0.3rem",
                border: "none",
                padding: "0.7rem",
              }}
            />
            <br />
            <br />
            <Stack gap={1}>
              <input
                type="file"
                onChange={handleChange}
                className="file-upload"
              />
              <button onClick={handlesubmit} className="btn">
                Upload
              </button>
            </Stack>
            <br />
            <br />
          </Paper>

          <Paper
            name="downlod"
            sx={{
              width: "100%",
              height: "12rem",
              boxShadow: "0 0 0.3rem white",
              backgroundColor: "#44aec2",
              padding: "0.8rem",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              download
            </p>
            <Stack gap={1}>
              <div>
                <label
                  htmlFor="ID"
                  style={{
                    paddingRight: "1rem",
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Enter User ID
                </label>
                <input
                  name="ID"
                  type="number"
                  onChange={(e) => setID(e.target.value)}
                  style={{
                    height: "1.5rem",
                    width: "15rem",
                    borderRadius: "0.3rem",
                    border: "none",
                    padding: "0.7rem",
                  }}
                />
              </div>
              <button
                onClick={getFiles}
                className="btn"
                style={{ width: "7rem" }}
              >
                Retrieve
              </button>
            </Stack>
            <br />
            <br />
          </Paper>
          <Paper
            sx={{
              height: "fitContent",
              background: "transparent",
              border: "0.3rem solid black",
              borderRadius: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                margin: "2rem",
                textAlign: "center",
                color: "white",
              }}
            >
              images
            </p>
            <div
              name="Images"
              style={{
                width: "25rem",
                color: "white",
                textTransform: "capitalize",
                padding: "1rem",
                fontFamily: "sans-serif",
              }}
            ></div>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
