import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./global";
import moment from "moment";
import { Link, useParams, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

export default function Pagedetail() {
  const blogId = useParams();
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  // const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [popupOpened, setPopupOpened] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/get/${blogId.id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching Blog :", error);
      }
    };
    const viwesInc = async () => {
      try {
        await axios.put(`${API_URL}/blog/view/${blogId.id}`);
      } catch (error) {
        console.error("Error fetching Blog :", error);
      }
    };
    fetchBlog();
    viwesInc();
  });

  useEffect(() => {
    if (location.hash === "#popup1") {
      setPopupOpened(true);
    }
  }, [location.hash]);

  // const handleEdit = async () => {
  //   navigate(`${API_URL}/editPage/${blogId}`);
  // };
  // const handlelike = async () => {
  //   try {
  //     await axios.put(`${API_URL}/blog/like/${blogId.id}`);
  //   } catch (error) {
  //     console.error("Error fetching Blog :", error);
  //   }
  // };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog/all?type=${blog.type}`);
      setSuggestedBlogs(response.data);
    } catch (error) {
      console.error("Error fetching forum stats:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  });

  const handlePopupClose = () => {
    setPopupOpened(false);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div>
      <section className="blog-posts">
        <div className="heading-section">
          <div className="latest-news1">
            <h1 className="heading">{blog.title}</h1>
            <div
              className="PagedetailsPageidres"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="same-div">
              <p className="author-info-blog">
                By {blog.author} &nbsp;
                {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                <span className="icon-container">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className="BlogsCounteButtondsifh"
                      style={{ alignContent: "center" }}
                    >
                      {blog.views / 2}
                    </div>
                    <div>
                      <img
                        src="/images/zondicons_view-show.png"
                        alt="Heart Icon"
                        className="icon"
                      />
                    </div>
                    <div class="box">
                      {!popupOpened && (
                        <a href="#popup1" onClick={() => setPopupOpened(true)}>
                          <img src="/images/solar_share-bold.png" alt="popup" />
                        </a>
                      )}
                    </div>
                  </div>
                </span>
              </p>
            </div>
          </div>

          <div id="popup1" class="overlay">
            <div class="popup">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Share the Blog</h2>
                <Link class="close" onClick={handlePopupClose}>
                  &times;
                </Link>
              </div>

              <div class="content">
                <FacebookShareButton
                  style={{ marginRight: "7px" }}
                  url={
                    "\nclick this link : " +
                    `${window.location.origin}/blogtype/${encodeURIComponent(
                      blogId.id
                    )}`
                  }
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  style={{ marginRight: "7px" }}
                  url={
                    "\nclick this link : " +
                    `${window.location.origin}/blogtype/${blogId.id}`
                  }
                  title={blog.title}
                >
                  <XIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton
                  style={{ marginRight: "7px" }}
                  url={
                    "\nclick this link : " +
                    `${window.location.origin}/blogtype/${blogId.id}`
                  }
                  title={blog.title}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <RedditShareButton
                  style={{ marginRight: "7px" }}
                  url={
                    "\nclick this link : " +
                    `${window.location.origin}/blogtype/${blogId.id}`
                  }
                  title={blog.title}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>

                <TelegramShareButton
                  style={{ marginRight: "7px" }}
                  url={
                    "\nclick this link : " +
                    `${window.location.origin}/blogtype/${blogId.id}`
                  }
                  title={blog.title}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
            </div>
          </div>

          <div className="trending-articles">
            <h2 className="heading2">Related Articles</h2>

            {suggestedBlogs &&
              suggestedBlogs.map((blogitem, index) => (
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
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
