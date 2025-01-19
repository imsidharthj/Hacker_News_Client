import React from "react";

const footerLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/imsidharthj/" },
    { label: "GitHub", url: "https://github.com/imsidharthj" },
    { label: "Resume", url: "https://drive.google.com/file/d/1NpVHxycl0t29z1yO3THdrr-4m-4TS8N6/view?usp=sharing" },
    { label: "HackerRank", url: "https://www.hackerrank.com/profile/imsidharthj" },
  ];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-200 py-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          {footerLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-sm">&copy; 2025 Sidharth Jain</p>
      </div>
    </footer>
  );
};

export default Footer;