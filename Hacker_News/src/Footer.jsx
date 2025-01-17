import React from "react";

const footerLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/imsidharthj/" },
    { label: "GitHub", url: "https://github.com/imsidharthj" },
    { label: "Resume", url: "https://drive.google.com/file/d/1NpVHxycl0t29z1yO3THdrr-4m-4TS8N6/view?usp=sharing" },
    { label: "HackerRank", url: "https://www.hackerrank.com/profile/imsidharthj" },
  ];

const Footer = () => {
return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          {footerLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray text-xs mx-2"
              style={{
                marginLeft: '100px',
                marginRight: '10px',
                background: '#ccc', // Removed the conditional statement
                color: 'black',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
)
}

export default Footer;