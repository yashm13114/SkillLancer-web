// Import the necessary libraries and components
import React from 'react';
import Slider from 'react-slick';
import './styles.css';
import './responsive.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialsData = [
  {
    id: 1,
    userAvatar: '149071.png', 
    userName: 'Raj Kapoor',
    userRole: 'Web Developer',
    text: 'Skilllancer helped me find amazing projects and connect with talented professionals. Highly recommended!',
  },
  {
    id: 2,
    userAvatar: '149071.png', 
    userName: 'Priya Sharma',
    userRole: 'Graphic designer',
    text: 'Skilllancer helped me find amazing projects and connect with talented professionals. Highly recommended!',
  },
  {
    id: 3,
    userAvatar: '149071.png', 
    userName: 'Amit Patel',
    userRole: 'Script Writter',
    text: 'Skilllancer helped me find amazing projects and connect with talented professionals. Highly recommended!',
  },
  // Add more testimonials as needed
];

const HomePage = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-container">
        <div className="animated-background"></div>
        <div className="content">
          <h1>Skilllancer: Your Gateway to Skillful Freelancing Excellence</h1>
          <p>Your freelance adventure starts here. Showcase your skills, land exciting projects, and thrive in a community built for success</p>
          <div className="buttons">
            <button className="cta-button">Learn More</button>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us-container">
        <div className="about-us-content">
          {/* Left Side: Technological Photo */}
          <div className="technological-photo">
            {/* Update the alt attribute without redundant terms */}
            <img src="Skill-lancer.png" alt="Technological Illustration" />
          </div>

          {/* Right Side: About Us Description */}
          <div className="about-us-description">
            <h2>About Skill-lancer</h2>
            <p>
              Welcome to Skilllancer, your premier platform for unlocking the full potential of freelancing excellence. At Skilllancer, we believe in the power of skills to transform careers and businesses. Our platform is designed to connect skilled professionals with exciting freelance opportunities, fostering a thriving community built on talent, collaboration, and success.
            </p>
            <button className="Read-more">Read More</button>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <div className="icon-container">
          <div className="animated-icon">
            <img src="5455873.png" alt="Join Community" />
            <p>Sign Up</p>
          </div>
          <div className="animated-icon">
            <img src="exploreproject.png" alt="Explore Projects" />
            <p>Explore Projects</p>
          </div>
          <div className="animated-icon">
            <img src="postproject.png" alt="Post Projects" />
            <p>Post Projects</p>
          </div>
        </div>
      </div>

      {/* Benefits or Features Section */}
      <div className="benefits-container">
        <h2>Benefits Of Skilllancer</h2>
        <div className="benefit-item">
          <img className="benefit-icon" src="benefits1.jpg" alt="Feature 1" />
          <div className="benefit-title">Join a Thriving Community</div>
          <div className="benefit-description">Connect with skilled professionals and build your network.</div>
        </div>

        <div className="benefit-item">
          <img className="benefit-icon" src="6553383.png" alt="Feature 2" />
          <div className="benefit-title">Explore Exciting Projects</div>
          <div className="benefit-description">Discover and apply for diverse freelance opportunities.</div>
        </div>

        <div className="benefit-item">
          <img className="benefit-icon" src="freelancer-line.jpg" alt="Feature 3" />
          <div className="benefit-title">Post Your Projects</div>
          <div className="benefit-description">Showcase your projects and find the right talent for your needs.</div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-container">
        <h2>Testimonials</h2>
        <Slider {...sliderSettings}>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={testimonial.userAvatar} alt="User Avatar" className="user-avatar" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="user-info">
                <span className="user-name">{testimonial.userName}</span>
                <span className="user-role">{testimonial.userRole}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>Join Skilllancer Today</h2>
        <p>Unlock the full potential of freelancing excellence. Join our community of skilled professionals and discover exciting opportunities.</p>
        
        {/* Sign Up and Log In Buttons */}
        <div className="cta-buttons">
          <button className="cta-button">Sign Up</button>
          <button className="cta-button">Log In</button>
        </div>

        {/* Prominent "Post a Project" Button */}
        <button className="post-project-button">Post a Project</button>
      </div>
    </div>
  );
};

export default HomePage;
