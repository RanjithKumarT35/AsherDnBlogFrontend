import { useEffect, useRef, useState } from "react";
import axios from "axios";
import API_URL from "../Components/global";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
export default function EditPost() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [imagePath, setImagePath] = useState("");
  const blogId = useParams();

  console.log("blogId", blogId.id);

  const [initialImage, setInitialImage] = useState(
    "/images/Thumbnailpreview.png"
  );

  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`${API_URL}/blog/get/${blogId.id}`);
      setBlogData(response.data);
    };
    getBlog();
  }, [blogId]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file);
  };
  const handleThumbnail = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file, true);
  };
  const handleUpload = async (file, isThumbnail = false) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("sampleFile", file);
      const response = await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // You can use 'percentCompleted' to update a loading indicator
          },
        },
        { crossDomain: true, withCredentials: true }
      );
      setLoading(false);
      if (isThumbnail) {
        setBlogData({ ...blogData, thumbnail: response.data.link });
        isThumbnail = false;
      } else {
        if (editorRef.current) {
          const editor = editorRef.current;
          editor.execCommand(
            "mceInsertContent",
            false,
            `<img className="ImportIamgeWItdh"  src="${response.data.link}" alt="Uploaded Image" />`
          );
          setImagePath(response.data.link);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      `${API_URL}/blog/edit/${blogId.id}`,
      blogData
    );
    if (response.data === "true") {
      navigate("/");
    }
  };

  const DeletePost = async () => {
    if (window.confirm("Do you want to delete blog")) {
      const response = await axios.delete(
        `${API_URL}/blog/delete/${blogId.id}`
      );

      if (response.data === true) {
        navigate("/");
      }
    }
  };
  return (
    <div>
      <div>
        <h2 className="createpostheadingdiv">Edit Blog</h2>
        {console.log(blogData)}
        <div className="FlexMiddleofthedivmain">
          <div className="createpostdivwidthj">
            <div className="postionofimage">
              <form onSubmit={handleSubmit}>
                <div className="cforumtopics">
                  <div className="headingcreatepost">Blog Type</div>
                  <div className="cmarginleft">
                    <label htmlFor="createpost">
                      <select
                        type="text"
                        placeholder="Select the Heading"
                        required
                        value={blogData.type}
                        onChange={(e) => {
                          setBlogData({ ...blogData, type: e.target.value });
                        }}
                      >
                        <option value="Bike">Bike</option>
                        <option value="Car">Car</option>
                        <option value="Rider">Rider</option>
                        <option value="Technical">Technical</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="cheadingtopics">
                  <div className="headingcreatepost">Title</div>
                  <div className="cinputforumcreatepost">
                    <input
                      value={blogData.title}
                      onChange={(e) => {
                        setBlogData({ ...blogData, title: e.target.value });
                      }}
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>
                <div className="cheadingtopics">
                  <div className="headingcreatepost">Author</div>
                  <div className="cinputforumcreatepost">
                    <input
                      type="text"
                      value={blogData.author}
                      onChange={(e) => {
                        setBlogData({ ...blogData, author: e.target.value });
                      }}
                      placeholder="Author Name"
                      required
                    />
                  </div>
                </div>
                <div className="thumbnailsecrionforcreatepost">
                  <div className="thumbnailtextscreatepost">Thumbnail</div>
                  <div className="imagethumbnailpreviewdivtag">
                    <div>
                      <div className="file-input">
                        <input
                          type="file"
                          name="sampleFile"
                          id="file-input"
                          className="file-input__input"
                          onChange={handleThumbnail}
                        />
                        <label
                          className="file-input__label"
                          htmlFor="file-input"
                        >
                          <img src="./images/tabler_photo.png" alt="" />
                          <span className="uploadimagecreatepost">
                            Select Thumbnail
                          </span>
                        </label>
                      </div>
                      <div className="recommenededsizees">
                        Recomended 900x350 px
                      </div>
                    </div>

                    <div className="previewwimagesizee">
                      {blogData && blogData.thumbnail ? (
                        <img
                          // src={newThread.thumbnail}
                          src={blogData.thumbnail}
                          alt=""
                          style={{
                            width: "200px",
                            height: "77.78px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          // src={newThread.thumbnail}

                          src={initialImage}
                          alt=""
                          style={{
                            width: "200px",
                            height: "77.78px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="thumbnailsecrionforcreatepost11">
                  <div className="thumbnailtextscreatepost">Post</div>

                  <div className="imagethumbnailpreviewdivtag">
                    <div>
                      <div className="file-input">
                        <input
                          type="file"
                          name="sampleFile"
                          className="file-input__input"
                          id="file-insert"
                          onChange={handleFileChange}
                        />
                        <label
                          className="file-input__label"
                          htmlFor="file-insert"
                        >
                          <img src="./images/tabler_photo.png" alt="" />
                          <span className="uploadimagecreatepost">
                            Insert Image
                          </span>
                        </label>
                      </div>
                      {/* {loading && <p>Image Loading...</p>} */}
                      <div className="recommenededsizees"></div>
                    </div>
                  </div>
                </div>
                <div className="Lateudffbdfshfsffg"></div>
                <div>
                  <Editor
                    apiKey="2edzfx0mgryctyfre9pj8d0fikd96259j7w4wvz15jcfma3g"
                    //initialValue={newThread.content}
                    //onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                      toolbar1:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough  | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      toolbar2:
                        "link image media table mergetags | align lineheight",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      setup: (editor) => {
                        editorRef.current = editor; // Save the editor instance to the ref
                      },
                    }}
                    value={blogData.content}
                    onEditorChange={(content) => {
                      setBlogData({ ...blogData, content });
                    }}
                  />
                </div>

                <div
                  className="buttonsubmit"
                  style={{ marginBottom: "20px", paddingBottom: "0px" }}
                >
                  <button type="submit">Update your Post</button>
                </div>
              </form>
              <div className="buttonsubmit" style={{ marginTop: "10px" }}>
                <button
                  onClick={DeletePost}
                  style={{ background: "red", marginTop: "0px" }}
                  type="submit"
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
