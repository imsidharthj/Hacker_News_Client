import React from "react";

const footerLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/imsidharthj/" },
    { label: "GitHub", url: "https://github.com/imsidharthj" },
    { label: "Resume", url: "https://drive.google.com/file/d/1NpVHxycl0t29z1yO3THdrr-4m-4TS8N6/view?usp=sharing" },
    { label: "HackerRank", url: "https://www.hackerrank.com/profile/imsidharthj" },
  ];

const Footer = () => {
  return (
    <footer className="py-5 bg-gray-200 text-gray-600">
      <hr /> {/* Added top border */}
      <p className="text-xs font-semibold mb-2">Connect with me:</p>
      <div className="flex justify-between items-center">
        <div className="text-xs font-semibold mb-2">Connect with me:</div>
        <div className="flex items-center">
          {footerLinks.map(({ label }) => (
            <a
              key={label}
              href={footerLinks.find((link) => link.label === label).url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 mr-4 transition duration-300"
              style={{marginRight: '150px'}}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold mb-2">&copy; 2025 Sidharth Jain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;