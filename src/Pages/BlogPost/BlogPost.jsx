import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "./blogPostData";
import SecondaryBtn from "../../Component/Buttons/SecondaryBtn/SecondaryBtn";
import PrimaryBtn from "../../Component/Buttons/PrimaryBtn/PrimaryBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.readMoreLink.endsWith(slug));

  // Extract unique categories
  const allCategories = [
    ...new Set(blogPosts.map((p) => p.category).filter(Boolean)),
  ];

  // Newsletter Form State
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Comments State
  const [comments, setComments] = useState([
    // Sample comments for demo
    {
      id: 1,
      name: "Sarah Johnson",
      subject: "Great article!",
      comment:
        "I really enjoyed reading this. The tips were super helpful and the photos made everything look delicious!",
      likes: 12,
      likedByUser: false,
      date: "December 18, 2025",
    },
    {
      id: 2,
      name: "Mike Chen",
      subject: "Question about the recipe",
      comment:
        "Can I substitute the main ingredient with something vegetarian? Looking forward to trying this out.",
      likes: 5,
      likedByUser: true,
      date: "December 17, 2025",
    },
  ]);

  const [commentForm, setCommentForm] = useState({
    name: "",
    subject: "",
    comment: "",
  });

  const [commentErrors, setCommentErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
    if (commentErrors[name]) {
      setCommentErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isActive = (field) => {
    return form[field] || isSubmitted;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitMessage("Thank you for subscribing!");
      setForm({ email: "" });
      setIsSubmitted(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!commentForm.name.trim()) newErrors.name = "Name is required";
    if (!commentForm.subject.trim()) newErrors.subject = "Subject is required";
    if (!commentForm.comment.trim()) newErrors.comment = "Comment is required";

    setCommentErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const today = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const newComment = {
        id: comments.length + 1,
        ...commentForm,
        likes: 0,
        likedByUser: false,
        date: today,
      };

      setComments((prev) => [newComment, ...prev]);
      setCommentForm({ name: "", subject: "", comment: "" });
    }
  };

  const isCommentActive = (field) => commentForm[field].length > 0;

  // Like toggle with jump effect
  const toggleLike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likedByUser ? c.likes - 1 : c.likes + 1,
              likedByUser: !c.likedByUser,
            }
          : c
      )
    );
  };

  if (!post) {
    return (
      <div className="text-center py-24 min-h-screen">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-2xl text-gray-600">
          Blog post not found for: /blogs/{slug}
        </p>
        <Link to="/blog" className="inline-block mt-8">
          <SecondaryBtn>Back to Blog</SecondaryBtn>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content Area - Left (includes article + comments) */}
        <div className="lg:col-span-3 space-y-16">
          {/* Post Header */}
          <article>
            <header className="mb-10 text-center">
              <h2 className="text-3xl md:text-5xl mt-10 font-satisfy text-center mx-auto mb-2 text-primary-dark relative">
                {post.title}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 -bottom-3 w-full h-0.5 bg-hover-primary scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
              </h2>
              <p className="text-lg italic mb-1 text-slate-700">
                By {post.author}
              </p>
              <p className="post-date text-sm mb-6 text-slate-500">
                {post.date}
              </p>
              <div
                className="w-full h-[420px] bg-cover bg-center rounded-lg my-8 shadow-xl"
                style={{ backgroundImage: `url('${post.imageUrl}')` }}
              ></div>
            </header>

            {/* Full Content */}
            <div className="prose lg:prose-xl mx-auto text-gray-700 text-left mb-12">
              {post.fullContent}
            </div>
          </article>

          {/* Comments Section - Left Side */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-3xl lg:text-4xl text-primary-dark mb-8">
              Leave a Comment
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="name"
                    value={commentForm.name}
                    onChange={handleCommentChange}
                    className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                      commentErrors.name
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#f8c471]"
                    }`}
                  />
                  <label
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                      isCommentActive("name")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : ""
                    }`}
                  >
                    Name
                  </label>
                  {commentErrors.name && (
                    <p className="absolute text-red-600 text-sm left-2">
                      {commentErrors.name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={commentForm.subject}
                    onChange={handleCommentChange}
                    className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                      commentErrors.subject
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#f8c471]"
                    }`}
                  />
                  <label
                    className={`absolute left-4 top-1/2 -translate-y-1/2 md:-translate-y-[22px] text-gray-600 pointer-events-none text-lg transition-all ${
                      isCommentActive("subject")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : ""
                    }`}
                  >
                    Subject
                  </label>
                  {commentErrors.subject && (
                    <p className="absolute text-red-600 text-sm left-2">
                      {commentErrors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative mb-12">
                <textarea
                  name="comment"
                  rows="5"
                  value={commentForm.comment}
                  onChange={handleCommentChange}
                  className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none resize-none ${
                    commentErrors.comment
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#f8c471]"
                  }`}
                />
                <label
                  className={`absolute left-4 top-4 text-gray-600 pointer-events-none text-lg transition-all ${
                    isCommentActive("comment")
                      ? "!-top-3 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                      : ""
                  }`}
                >
                  Comment
                </label>
                {commentErrors.comment && (
                  <p className="absolute text-red-600 text-sm left-2">
                    {commentErrors.comment}
                  </p>
                )}
              </div>

              <SecondaryBtn type="submit" className="w-full md:w-auto">
                Post Comment
              </SecondaryBtn>
            </form>

            {/* Display Comments - Right side of the left column */}
            <div className="border-t pt-8">
              <h4 className="text-2xl font-bold text-primary-dark mb-6">
                Comments ({comments.length})
              </h4>
              {comments.length === 0 ? (
                <p className="text-gray-500 italic">Be the first to comment!</p>
              ) : (
                <div className="space-y-8">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-bold text-lg text-primary-dark">
                            {c.name}
                          </h5>
                          <p className="text-sm text-gray-600">{c.subject}</p>
                        </div>
                        <span className="text-sm text-gray-500">{c.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {c.comment}
                      </p>
                      {/* Like Button with Jump Effect */}
                      <button
                        onClick={() => toggleLike(c.id)}
                        className="flex items-center gap-[2px] group"
                        aria-label="Like comment"
                      >
                        <FontAwesomeIcon
                          icon={c.likedByUser ? faHeart : faHeartRegular}
                          className={`text-xl transition-all duration-300 ${
                            c.likedByUser
                              ? "text-[var(--hover-accent)] scale-125"
                              : "text-gray-600 group-hover:text-[var(--hover-accent)]"
                          } ${
                            // Jump animation only on like (not unlike)
                            !c.likedByUser && "animate-jump"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors ${
                            c.likedByUser
                              ? "text-[var(--hover-accent)]"
                              : "text-gray-600"
                          }`}
                        >
                          {c.likes}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar - Categories + Newsletter */}
        <aside className="lg:col-span-1 space-y-10">
          {/* Categories Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-36">
            <h3 className="text-2xl font-bold text-primary-dark mb-6 border-b pb-3 border-gray-200">
              Categories
            </h3>
            <ul className="space-y-3">
              {allCategories.map((category, index) => (
                <li key={index}>
                  <Link
                    to="/blog"
                    className="block text-gray-700 hover:text-primary-dark hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-medium"
                  >
                    {category || "Uncategorized"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="rounded-lg shadow-lg p-8">
            <h3 className="text-primary-dark text-2xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm opacity-90 mb-8">
              Subscribe to our newsletter to receive exclusive offers, recipes,
              and updates straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#f8c471]"
                  }`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                    isActive("email")
                      ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                      : ""
                  }`}
                >
                  Email
                </label>
                {errors.email && (
                  <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                    {errors.email}
                  </p>
                )}
              </div>

              <SecondaryBtn type="submit" className="w-full justify-center">
                Subscribe
              </SecondaryBtn>

              {submitMessage && (
                <p className="mt-4 text-sm font-semibold text-center text-green-200 animate-fade-in">
                  {submitMessage}
                </p>
              )}

              <p className="text-xs opacity-80 text-center mt-4">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </aside>

        {/* Back Button */}
        <div className="text-center mb-12">
          <Link to="/blog">
            <SecondaryBtn>Back to Blog</SecondaryBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

