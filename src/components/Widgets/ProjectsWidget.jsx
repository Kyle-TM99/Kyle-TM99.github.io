import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { featuredProjects } from '../../data/projects'

function ProjectsWidget() {
    const [activeProject, setActiveProject] = useState(0)
    const projects = featuredProjects

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
                            style={{
                                background: projects[activeProject].image.startsWith('linear-gradient')
                                    ? projects[activeProject].image
                                    : `url(${projects[activeProject].image}) center/cover`
                            }}
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
