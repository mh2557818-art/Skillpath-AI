import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrainCircuit, Sparkles, ClipboardCheck, Target, Map,
  FolderKanban, TrendingUp, Award, BookOpen, CheckCircle2,
  MessageCircle, Send, BarChart3, Clock, Star
} from "lucide-react";
import "./style.css";

const careerData = {
  "AI & Machine Learning": {
    career: "AI / Machine Learning Engineer",
    skills: ["Python", "Statistics", "Machine Learning", "Deep Learning", "SQL"],
    projects: ["Student Performance Predictor", "Career Recommendation Model", "AI Study Assistant"]
  },
  "Data Analytics": {
    career: "Data Analyst",
    skills: ["Python", "Excel", "SQL", "Power BI", "Statistics"],
    projects: ["Student Analytics Dashboard", "Sales Data Analyzer", "College Data Dashboard"]
  },
  "Web Development": {
    career: "Full Stack Developer",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database"],
    projects: ["College Portal", "Smart Complaint System", "Placement Management System"]
  },
  "Cyber Security": {
    career: "Cyber Security Analyst",
    skills: ["Networking", "Linux", "Python", "Security Basics", "Cloud Security"],
    projects: ["Password Strength Analyzer", "Security Awareness Portal", "Network Monitor"]
  }
};

function App() {
  const [page, setPage] = useState("home");
  const [skills, setSkills] = useState("Java, Python");
  const [interest, setInterest] = useState("AI & Machine Learning");
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [tasks, setTasks] = useState([false, false, false, false, false]);
  const [chat, setChat] = useState([
    { who: "ai", text: "Hi! I am your SkillPath AI assistant. Ask me about skills, careers, or projects." }
  ]);
  const [message, setMessage] = useState("");

  const data = careerData[interest];
  const completed = tasks.filter(Boolean).length;
  const progress = completed * 20;

  const nav = (name, label) => (
    <button className={page === name ? "nav active" : "nav"} onClick={() => setPage(name)}>{label}</button>
  );

  const finishAssessment = () => {
    setAssessmentDone(true);
    setPage("dashboard");
  };

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;
    let reply = `For ${interest}, I recommend focusing on ${data.skills.slice(0,3).join(", ")}.`;
    if (text.toLowerCase().includes("project")) reply = `Try building: ${data.projects.join(", ")}. Start with a simple version and improve it step by step.`;
    if (text.toLowerCase().includes("skill")) reply = `Your recommended skill order is: ${data.skills.join(" → ")}.`;
    setChat([...chat, { who: "user", text }, { who: "ai", text: reply }]);
    setMessage("");
  };

  const roadmap = data.skills.map((skill, i) => ({
    title: skill,
    desc: [
      "Learn the fundamentals and important concepts.",
      "Practice with small exercises and examples.",
      "Build one mini project to demonstrate the skill."
    ][i % 3]
  }));

  return (
    <div className="app">
      <header>
        <div className="brand"><BrainCircuit size={30}/><span>SkillPath <b>AI</b></span></div>
        <nav>
          {nav("home", "Home")}
          {nav("assessment", "Assessment")}
          {nav("dashboard", "Dashboard")}
          {nav("roadmap", "Roadmap")}
          {nav("projects", "Projects")}
          {nav("assistant", "AI Assistant")}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div>
                <div className="badge"><Sparkles size={16}/> AI-powered career guidance for students</div>
                <h1>Discover Your Skills.<br/><span>Build Your Future.</span></h1>
                <p>SkillPath AI helps engineering students identify skills, discover suitable careers, track learning progress, and build an impressive project portfolio.</p>
                <button className="primary" onClick={() => setPage("assessment")}>Start Skill Assessment <Target size={18}/></button>
              </div>
              <div className="hero-card">
                <BrainCircuit size={95}/>
                <h2>Your AI Career Companion</h2>
                <p>Skills → Analysis → Career → Roadmap</p>
                <div className="mini-stats">
                  <span>🎯 Career Match</span><span>📚 Learning Plan</span><span>🚀 Projects</span>
                </div>
              </div>
            </section>

            <section className="feature-grid">
              <Feature icon={<ClipboardCheck/>} title="Skill Assessment" text="Enter your current skills and interests."/>
              <Feature icon={<Target/>} title="Career Match" text="Get a suitable career recommendation."/>
              <Feature icon={<Map/>} title="Learning Roadmap" text="Follow a structured skill journey."/>
              <Feature icon={<FolderKanban/>} title="Project Ideas" text="Build projects for your portfolio."/>
            </section>

            <section className="stats-grid">
              <Stat icon={<TrendingUp/>} value={`${progress}%`} label="Learning Progress"/>
              <Stat icon={<Award/>} value={completed} label="Milestones Completed"/>
              <Stat icon={<BookOpen/>} value={data.skills.length} label="Recommended Skills"/>
            </section>
          </>
        )}

        {page === "assessment" && (
          <section className="page-section">
            <div className="section-tag">STEP 1</div>
            <h2>AI Skill Assessment</h2>
            <p>Enter what you already know. The system will create a personalized career path.</p>
            <div className="form-card">
              <label>Your current skills</label>
              <textarea value={skills} onChange={e => setSkills(e.target.value)} placeholder="Example: Java, Python, HTML"/>
              <label>Main interest</label>
              <select value={interest} onChange={e => setInterest(e.target.value)}>
                {Object.keys(careerData).map(x => <option key={x}>{x}</option>)}
              </select>
              <button className="primary" onClick={finishAssessment}>Analyze My Skills <Sparkles size={18}/></button>
            </div>
          </section>
        )}

        {page === "dashboard" && (
          <section className="page-section">
            <div className="section-tag">YOUR DASHBOARD</div>
            <h2>Welcome to your SkillPath</h2>
            <p>Here is your current personalized learning summary.</p>
            {!assessmentDone && <div className="notice">Complete the assessment first for personalized recommendations.</div>}
            <div className="dashboard-grid">
              <div className="big-card">
                <div className="icon-box"><Target/></div>
                <h3>Recommended Career</h3>
                <h2 className="accent">{data.career}</h2>
                <p>Based on your selected interest: <b>{interest}</b></p>
              </div>
              <div className="big-card">
                <div className="icon-box"><BarChart3/></div>
                <h3>Learning Progress</h3>
                <div className="progress"><div style={{width: `${progress}%`}}></div></div>
                <h2>{progress}% Complete</h2>
                <p>{completed} of 5 weekly milestones completed.</p>
              </div>
              <div className="big-card">
                <div className="icon-box"><Clock/></div>
                <h3>Next Focus</h3>
                <h2>{data.skills[Math.min(completed, data.skills.length - 1)]}</h2>
                <p>Spend 30–60 minutes learning and practicing today.</p>
              </div>
            </div>
            <div className="task-card">
              <h3>Weekly Learning Checklist</h3>
              {["Learn one new concept", "Practice 5 coding problems", "Watch one tutorial", "Build a mini feature", "Update your portfolio"].map((task, i) => (
                <label className="task" key={task}>
                  <input type="checkbox" checked={tasks[i]} onChange={() => {
                    const copy = [...tasks]; copy[i] = !copy[i]; setTasks(copy);
                  }}/>
                  <span>{task}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        {page === "roadmap" && (
          <section className="page-section">
            <div className="section-tag">PERSONALIZED PLAN</div>
            <h2>Your Learning Roadmap</h2>
            <p>A recommended path toward becoming an {data.career}.</p>
            <div className="roadmap">
              {roadmap.map((item, i) => (
                <div className="road-item" key={item.title}>
                  <div className="number">{i+1}</div>
                  <div><h3>{item.title}</h3><p>{item.desc}</p></div>
                </div>
              ))}
              <div className="road-item">
                <div className="number"><Star size={18}/></div>
                <div><h3>Build Real Projects</h3><p>Use your skills to create portfolio projects and demonstrate what you have learned.</p></div>
              </div>
            </div>
          </section>
        )}

        {page === "projects" && (
          <section className="page-section">
            <div className="section-tag">PORTFOLIO BUILDER</div>
            <h2>Recommended Project Ideas</h2>
            <p>Build these projects to demonstrate your skills and strengthen your resume.</p>
            <div className="project-grid">
              {data.projects.map((project, i) => (
                <div className="project-card" key={project}>
                  <div className="project-top"><FolderKanban/><span>Level {i+1}</span></div>
                  <h3>{project}</h3>
                  <p>Build a complete project with a clean interface, useful features, and proper documentation.</p>
                  <div className="chips">{data.skills.slice(0,3).map(s => <span key={s}>{s}</span>)}</div>
                  <button onClick={() => setPage("assistant")}>Ask AI for Plan</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "assistant" && (
          <section className="page-section assistant-page">
            <div className="section-tag">SKILLPATH AI CHAT</div>
            <h2>Your Career Assistant</h2>
            <p>Ask questions about skills, career paths, learning plans, or project ideas.</p>
            <div className="chat-card">
              <div className="chat-window">
                {chat.map((m, i) => <div className={`bubble ${m.who}`} key={i}>{m.text}</div>)}
              </div>
              <div className="chat-input">
                <input value={message} onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about skills, career, or projects..."/>
                <button className="primary" onClick={sendMessage}><Send size={18}/></button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>SkillPath AI • College Project • AI-powered Career Guidance Platform</footer>
    </div>
  );
}

function Feature({icon, title, text}) {
  return <div className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>
}
function Stat({icon, value, label}) {
  return <div className="stat"><div>{icon}</div><h2>{value}</h2><p>{label}</p></div>
}

createRoot(document.getElementById("root")).render(<App/>);
