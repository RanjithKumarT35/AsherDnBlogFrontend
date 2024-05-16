import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "./global";
import moment from "moment";
//import SimpleImageSlider from "react-simple-image-slider";

export default function Page() {
  const [blog, setBlog] = useState([]);
  // const [type, setType] = useState("all");
  // const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blog/all?type=all`);
      setBlog(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching forum stats:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  });

  // const handleTypeChange = (type) => {
  //   setType(type);
  // };

  // const images = [
  //   { url: "images/Rectangle 24 (2).png" },
  //   { url: "images/Rectangle 59 (1).png" },
  // ];

  return (
    <div>
      <div className="BannerIMage">
        <img src="./images/Webbanner asher2.png" alt="Banner" />
      </div>

      <div>
        <section className="blog-posts">
          <div className="heading-section">
            <div className="latest-news">
              {/* <div className="button-container">
                <button
                  className="button"
                  onClick={() => handleTypeChange("all")}
                >
                  All
                </button>
                <button
                  className="button"
                  onClick={() => handleTypeChange("Bike")}
                >
                  Bike Review
                </button>
                <button
                  className="button"
                  onClick={() => handleTypeChange("Car")}
                >
                  Car Review
                </button>
                <button
                  className="button"
                  onClick={() => handleTypeChange("Rider")}
                >
                  Rider&nbsp;Viewpoint
                </button>
                <button
                  className="button"
                  onClick={() => handleTypeChange("Technical")}
                >
                  Technical&nbsp;Reviews
                </button>
              </div> */}
              <h1 className="heading">Latest Blogs</h1>

              {/* Conditional rendering of the spinner */}
              {/* {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div
                  style={{
                    border: "4px solid rgba(0, 0, 0, 0.1)",
                    borderTopColor: "#009688",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              </div>
            )} */}

              {/* Display blogs */}

              <>
                {blog.length > 0 ? (
                  blog.map((blogitem, index) => (
                    <article className="cardzz" key={index}>
                      <div className="card-image">
                        <img
                          src={blogitem.thumbnail}
                          alt={blogitem.title}
                          title={blogitem.title}
                        />
                      </div>

                      <div className="card-content">
                        <h3>{blogitem.title}</h3>
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: blogitem.content
                                .replace(/<img[^>]*>/g, "")
                                .slice(0, 150),
                            }}
                          />
                          <Link to={`/blogtype/${blogitem._id}`}>
                            ... Read more
                          </Link>
                        </p>
                        <p className="author-info">
                          By {blogitem.author}
                          <span className="dete">
                            {moment(blog.createdAt).format("MMMM Do YYYY")}
                          </span>
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>No blogs found.</p>
                )}
              </>
            </div>

            <div className="trending-articles">
              <h2 className="heading2">Related Articles</h2>

              <>
                {blog.length > 0 ? (
                  blog
                    .slice()
                    .reverse()
                    .map((blogitem, index) => (
                      <article className="card3">
                        <div className="card-image2">
                          <img
                            className="Imageofthedivjsdfghghds"
                            src={blogitem.thumbnail}
                            alt={blogitem.title}
                            title={blogitem.title}
                          />
                        </div>
                        <div className="card-content2">
                          <h3>{blogitem.title}</h3>
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: blogitem.content
                                  .replace(/<img[^>]*>/g, "")
                                  .slice(0, 50),
                              }}
                            />
                            <Link to={`/blogtype/${blogitem._id}`}>
                              ... Read more
                            </Link>
                          </p>

                          <p className="author-info">
                            By {blogitem.author}
                            <span className="dete">
                              {moment(blog.createdAt).format("MMMM Do YYYY")}
                            </span>
                          </p>
                        </div>
                      </article>
                    ))
                ) : (
                  <p>No blogs found.</p>
                )}
              </>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
