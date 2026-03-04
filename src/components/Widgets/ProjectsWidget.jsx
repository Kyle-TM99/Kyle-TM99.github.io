import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ProjectsWidget() {
    const [activeProject, setActiveProject] = useState(0)

    const projects = [
        {
            id: 1,
            title: "PlanFlow",
            category: "SaaS Platform",
            image: "logo/planflow.png",
            mediaUrl: null,
            description: "Coupang Seller Tool"
        },
        {
            id: 2,
            title: "EduPlatform",
            category: "EdTech",
            image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            mediaUrl: null,
            description: "LMS System"
        },
        {
            id: 3,
            title: "DataAuto",
            category: "Automation",
            image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            mediaUrl: null,
            description: "Marketing Data"
        }
    ]

    // Auto-rotate projects every 5s
    // useEffect(() => { ... }, []) - Optional feature

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="widget-header">
                <i className="fas fa-layer-group"></i>
                <span>Key Projects</span>
            </div>
            <div className="widget-content">
                <div className="project-gallery">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="project-slide"
                            style={{ background: projects[activeProject].image }}
                            onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
                        >
                            {projects[activeProject].mediaUrl ? (
                                <div className="project-slide-media">
                                    <img
                                        src={projects[activeProject].mediaUrl}
                                        alt={projects[activeProject].title}
                                    />
                                </div>
                            ) : null}
                            <div className="project-dots">
                                {projects.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === activeProject ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveProject(index)
                                        }}
                                    ></span>
                                ))}
                            </div>
                            <div className="project-info-overlay">
                                <h4>{projects[activeProject].title}</h4>
                                <span>{projects[activeProject].category}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ProjectsWidget
