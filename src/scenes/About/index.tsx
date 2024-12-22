import React, { useState } from "react";

const AboutPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };
  const styleBg = { backgroundColor: 'teal', padding: '1px 8px', borderRadius: '35px', color: 'white' }

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f7f8fc, #ffffff)",
        // minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#34495e",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          LEGAL DIARY SYSTEM
        </h1>
        <p
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "#57606f",
          }}
        >
          ~Digital Diary For Lawyers~
        </p>
      </div>

      {/* Description */}
      <div
        style={{
          background: "#ecf0f1",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#2c3e50" }}>
          <strong style={{ color: "#27ae60" }}>Crux:</strong> Our Mobile Apps
          give you access to your data anytime. Lawyer Diaries Mobile Apps allow
          you to use your data even outside your office, and you don’t need to
          carry old-fashioned bulky diaries with you. Our mobile app does not
          bind you to manually update information. Data added by your associates
          (Sub Users) will be available to you in a fraction of seconds.
        </p>
      </div>

      {/* Accordion */}
      <div>
        {[
          {
            title: "What are our aims?",
            content: (
              <div>
                <p>
                  <strong>Digital Diary:</strong> It enables you to manage all
                  your case records in digital format. <span style={styleBg}>Feature</span>
                </p>
                <p>
                  <strong>All case details at one place:</strong> All your case
                  details are available at your fingertips, no more looking into
                  different diaries for different years.<span style={styleBg}>Feature</span>
                </p>
              </div>
            ),
          },
          {
            title: "What is our scope?",
            content: (
              <p>
                The app for the legal professionals who love to do smart work The app in hand has been built for the digitalized experience of conventional legal diary in Pakistan. The app for the legal professionals who love to do smart work. It is embedded with amazing features which can help a lawyer to manage his law office through his cell phone. The world we are living in has becomes more technologically advanced, therefore we have moved from writing by hand to typing, whether it be on computers or on their phones and tablets. It is time the diaries of legal fraternity should move from manual notebooks to our digital devices. By getting a digital diary, you can bring your law office into the 21st century with convenience, accessibility and security. <span style={styleBg}>Feature</span>
              </p>
            ),
          },
          {
            title: "Who are our clients?",
            content: (
              <p>
                This app is designed specifically for lawyers and allows you to easily and quickly access important case or contact from your internal Storage information on your Android device while working on the go or sitting in court. This app allows you to connect your email accounts, calendars one convenient spot. It works with Gmail. It includes a function which allows you to click to call or email contacts directly from the application. Including the security expenses for Advocate juniors can see only allocating case details. See when your due dates keep in all cases. You can set the app to remind you up to a week ahead of time or five minutes before via email, calendar alert in app, or a text message. <br /> <span style={styleBg}>Our Clients</span>
              </p>
            ),
          },
          {
            title: "Our offices and locations?",
            content: (
              <p>
                Our Lawyer Diaries Web Application and Mobile Apps makes you feel better and help you to be more organise your data about cases.<br />
                <span style={styleBg}>Reliable and Secure Platform</span> <span style={styleBg}>Everything is perfectly organized for future</span> <span style={styleBg}>Our support team is always ready to help</span><br />
                JINNAH TECHNOLOGIES PRIVATE LIMITED<br />
                APARTMENT#11, 3rd FLOOR, BHUTTA CENTER, GT ROAD. GUJRANWALA<br />
                Kalim Law Chamber, 130-District Courts, Gujranwala<br />
                03-111-222-139, 0311-2222799, 0309-4084377<br />
                www.jinnahtechnologies.com info@jinnahtechnologies.com <span style={styleBg}>Location</span>
              </p>
            ),
          },
        ].map((section, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              border: "1px solid #dcdde1",
            }}
          >
            <div
              onClick={() => toggleSection(index)}
              style={{
                background: openSection === index ? "#27ae60" : "#f1f2f6",
                color: openSection === index ? "#fff" : "#34495e",
                padding: "15px 20px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {section.title}
              <span>{openSection === index ? "−" : "+"}</span>
            </div>
            {openSection === index && (
              <div
                style={{
                  background: "#f7f8fc",
                  color: "#2c3e50",
                  padding: "15px 20px",
                  lineHeight: "1.6",
                  fontSize: "16px",
                }}
              >
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      {/* <footer
        style={{
          marginTop: "30px",
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "14px",
        }}
      >
        <p>
          Copyright © 2024 <strong style={{ color: "#34495e" }}>Diary</strong>.
          All rights reserved.
        </p>
        <p>Version 7.3.0.0 [20240330]</p>
      </footer> */}
    </div>
  );
};

export default AboutPage;
