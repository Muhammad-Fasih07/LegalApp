import React from 'react';
import '../Css/Blog.css';
import image1 from '../images/crime.jpg';
import image2 from '../images/crime.jpg'
interface Post {
  date: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

const blogPosts: Post[] = [
  {
    date: '10 October 2023',
    title: 'The Role of a Criminal Defense Attorney',
    description: 'Our team of dedicated criminal defense attorneys in Pakistan provides unwavering support and expert legal guidance.',
    link: '#',
    image: image1,
  },
  {
    date: '10 October 2023',
    title: 'Stay Informed About Criminal Law Updates',
    description: 'We are committed to protecting your rights, preserving your freedom, and advocating for the best possible outcome in your case.',
    link: '#',
    image: image2,
  },
  // Add more blog posts as needed
];

const Blog: React.FC = () => {
  return (
    <div className="blog-container">
      <h2>Our Latest Blog & News</h2>
      <div className="posts-container">
        {blogPosts.map((post, index) => (
          <div className="post" key={index}>
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <span className="post-date">{post.date}</span>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <a href={post.link} className="post-link">Learn More →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
