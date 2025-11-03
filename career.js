// Career Portal JavaScript - UPDATED COMPLETE VERSION

// Jobs Data - All Remote
const jobsData = [
    {
        id: "BNFE001",
        title: "Frontend Developer Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Build responsive and interactive user interfaces for our AI-powered billing platform using React, HTML5, and CSS3.",
        skills: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
        featured: true
    },
    {
        id: "BNFS002",
        title: "Full Stack Developer Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Work on both frontend and backend development using MERN stack. Build scalable APIs and integrate with AI services.",
        skills: ["Node.js", "React", "MongoDB", "Express", "REST APIs"],
        featured: true
    },
    {
        id: "BNRD003",
        title: "React Native Developer Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Develop cross-platform mobile applications for Android and iOS using React Native and modern mobile development practices.",
        skills: ["React Native", "JavaScript", "Mobile UI", "Redux", "Firebase"],
        featured: false
    },
    {
        id: "BNFL004",
        title: "Flutter Developer Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Create beautiful and performant cross-platform mobile applications using Flutter and Dart programming language.",
        skills: ["Flutter", "Dart", "Mobile Development", "UI/UX", "REST APIs"],
        featured: false
    },
    {
        id: "BNSD005",
        title: "SDE Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Software Development Engineer role working on core product features, algorithm development, and system architecture.",
        skills: ["Data Structures", "Algorithms", "System Design", "Java/Python", "Databases"],
        featured: true
    },
    {
        id: "BNSL006",
        title: "Sales Intern",
        department: "sales",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Learn sales strategies, customer acquisition, and business development in the SaaS industry.",
        skills: ["Communication", "Sales", "CRM", "Customer Service", "Negotiation"],
        featured: false
    },
    {
        id: "BNPM007",
        title: "Project Manager Intern",
        department: "operations",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Assist in project planning, team coordination, and agile development processes for software projects.",
        skills: ["Agile", "Scrum", "Project Management", "JIRA", "Team Coordination"],
        featured: false
    },
    {
        id: "BNUI008",
        title: "UI/UX Designer Intern",
        department: "design",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Design intuitive and beautiful user interfaces for our billing platform. Create wireframes, prototypes, and design systems.",
        skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
        featured: true
    },
    {
        id: "BNBE009",
        title: "Backend Developer Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Develop robust backend services, APIs, and database architecture for our AI billing platform.",
        skills: ["Node.js", "Python", "MongoDB", "Redis", "API Development"],
        featured: false
    },
    {
        id: "BNML010",
        title: "Machine Learning Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Work on AI/ML models for voice recognition, natural language processing, and intelligent billing features.",
        skills: ["Python", "TensorFlow", "NLP", "Machine Learning", "Data Science"],
        featured: true
    },
    {
        id: "BNQA011",
        title: "QA Engineer Intern",
        department: "engineering",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Ensure software quality through manual and automated testing. Develop test cases and perform regression testing.",
        skills: ["Testing", "Selenium", "Jest", "Test Cases", "Bug Tracking"],
        featured: false
    },
    {
        id: "BNMK012",
        title: "Marketing Intern",
        department: "marketing",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Create marketing content, manage social media, and assist in digital marketing campaigns.",
        skills: ["Content Writing", "Social Media", "SEO", "Google Analytics", "Marketing"],
        featured: false
    },
    {
        id: "BNPD013",
        title: "Product Management Intern",
        department: "product",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Assist in product strategy, feature prioritization, and user research for our billing platform.",
        skills: ["Product Strategy", "User Research", "Analytics", "Roadmapping", "Agile"],
        featured: false
    },
    {
        id: "BNCS014",
        title: "Customer Success Intern",
        department: "operations",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Help customers succeed with our platform, gather feedback, and improve customer experience.",
        skills: ["Customer Service", "Communication", "Problem Solving", "CRM", "Support"],
        featured: false
    },
    {
        id: "BNBD015",
        title: "Business Development Intern",
        department: "sales",
        type: "internship",
        location: "remote",
        experience: "intern",
        description: "Identify new business opportunities, build partnerships, and contribute to growth strategies.",
        skills: ["Business Development", "Partnerships", "Market Research", "Sales", "Networking"],
        featured: false
    }
];

// DOM Elements
let currentJobs = [];
let displayedJobs = 6;
let currentUser = null;

// Initialize the portal
document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
    populateGraduationYears();
    checkUserLogin();
});

function initializePortal() {
    currentJobs = [...jobsData];
    renderJobs();
    updateJobsCount();
}

// Check if user is logged in
function checkUserLogin() {
    const savedUser = localStorage.getItem('billnexx_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateProfileButton();
    }
}

// Update profile button in header
function updateProfileButton() {
    const profileBtn = document.getElementById('profileBtn');
    if (currentUser) {
        profileBtn.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>${currentUser.name.split(' ')[0]}</span>
        `;
        profileBtn.onclick = openProfileModal;
    } else {
        profileBtn.innerHTML = `
            <i class="fas fa-user-plus"></i>
            <span>Create Profile</span>
        `;
        profileBtn.onclick = function() { openModal('profileModal'); };
    }
}

// Render jobs to the grid
function renderJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    jobsGrid.innerHTML = '';
    
    const jobsToShow = currentJobs.slice(0, displayedJobs);
    
    jobsToShow.forEach(job => {
        const jobCard = createJobCard(job);
        jobsGrid.appendChild(jobCard);
    });
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (displayedJobs >= currentJobs.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create individual job card
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = `job-card ${job.featured ? 'featured' : ''}`;
    
    // Get icon based on department
    const icon = getDepartmentIcon(job.department);
    
    card.innerHTML = `
        <div class="job-icon">${icon}</div>
        <div class="job-header">
            <h3 class="job-title">${job.title}</h3>
        </div>
        <div class="job-meta">
            <div class="job-meta-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${formatLocation(job.location)}</span>
            </div>
            <div class="job-meta-item">
                <i class="fas fa-clock"></i>
                <span>${formatJobType(job.type)}</span>
            </div>
            <div class="job-meta-item">
                <i class="fas fa-building"></i>
                <span>${formatDepartment(job.department)}</span>
            </div>
        </div>
        <p class="job-description">${job.description}</p>
        <div class="job-skills">
            ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        <div class="job-id">JOB-ID: ${job.id}</div>
        <div class="job-actions">
            <button class="btn btn-outline" onclick="viewJobDetails('${job.id}')">
                <i class="fas fa-eye"></i> View Details
            </button>
            <button class="btn btn-primary" onclick="applyForJob('${job.id}', '${job.title}')">
                <i class="fas fa-paper-plane"></i> Apply Now
            </button>
        </div>
    `;
    
    return card;
}

// Get department icon
function getDepartmentIcon(department) {
    const icons = {
        engineering: "💻",
        design: "🎨",
        product: "📊",
        marketing: "📢",
        sales: "💰",
        operations: "⚙️"
    };
    return icons[department] || "💼";
}

// Format location
function formatLocation(location) {
    const locations = {
        remote: "Remote",
        bangalore: "Bangalore",
        delhi: "Delhi",
        mumbai: "Mumbai"
    };
    return locations[location] || location;
}

// Format job type
function formatJobType(type) {
    const types = {
        internship: "Internship",
        fulltime: "Full-time",
        contract: "Contract"
    };
    return types[type] || type;
}

// Format department
function formatDepartment(department) {
    const departments = {
        engineering: "Engineering",
        design: "Design",
        product: "Product",
        marketing: "Marketing",
        sales: "Sales",
        operations: "Operations"
    };
    return departments[department] || department;
}

// Update jobs count
function updateJobsCount() {
    const countElement = document.getElementById('jobsCount');
    countElement.textContent = Math.min(displayedJobs, currentJobs.length);
}

// Load more jobs
function loadMoreJobs() {
    displayedJobs += 6;
    renderJobs();
    updateJobsCount();
}

// Search jobs
function searchJobs() {
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        currentJobs = [...jobsData];
    } else {
        currentJobs = jobsData.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
            job.id.toLowerCase().includes(searchTerm)
        );
    }
    
    displayedJobs = 6;
    renderJobs();
    updateJobsCount();
}

// Filter jobs
function filterJobs() {
    const department = document.getElementById('departmentFilter').value;
    const type = document.getElementById('typeFilter').value;
    const location = document.getElementById('locationFilter').value;
    const experience = document.getElementById('experienceFilter').value;
    
    currentJobs = jobsData.filter(job => {
        return (department === 'all' || job.department === department) &&
               (type === 'all' || job.type === type) &&
               (location === 'all' || job.location === location) &&
               (experience === 'all' || job.experience === experience);
    });
    
    displayedJobs = 6;
    renderJobs();
    updateJobsCount();
}

// Reset filters
function resetFilters() {
    document.getElementById('departmentFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('experienceFilter').value = 'all';
    document.getElementById('jobSearch').value = '';
    
    currentJobs = [...jobsData];
    displayedJobs = 6;
    renderJobs();
    updateJobsCount();
}

// View job details
function viewJobDetails(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
        applyForJob(jobId, job.title);
    }
}

// Apply for job
function applyForJob(jobId, jobTitle) {
    if (!currentUser) {
        showLoginMessage();
        return;
    }
    
    const job = jobsData.find(j => j.id === jobId);
    
    document.getElementById('applyingJobId').value = jobId;
    document.getElementById('applyingJobTitle').value = jobTitle;
    
    // Update modal preview
    document.getElementById('modalJobTitle').textContent = jobTitle;
    document.getElementById('previewJobTitle').textContent = jobTitle;
    document.getElementById('previewLocation').textContent = formatLocation(job.location);
    document.getElementById('previewType').textContent = formatJobType(job.type);
    document.getElementById('previewDepartment').textContent = formatDepartment(job.department);
    
    openModal('applicationModal');
}

// Show login message
function showLoginMessage() {
    const message = document.createElement('div');
    message.className = 'login-message';
    message.innerHTML = `
        <div style="background: var(--dark); border: 2px solid var(--primary); border-radius: 10px; padding: 20px; text-align: center; max-width: 400px; margin: 20px auto;">
            <h3 style="color: var(--primary); margin-bottom: 15px;">🔐 Login Required</h3>
            <p style="color: var(--light); margin-bottom: 20px;">Please create your profile first to apply for jobs.</p>
            <button class="btn btn-primary" onclick="openModal('profileModal')">
                <i class="fas fa-user-plus"></i> Create Profile
            </button>
        </div>
    `;
    
    // Add to page temporarily
    document.body.appendChild(message);
    setTimeout(() => {
        if (document.body.contains(message)) {
            document.body.removeChild(message);
        }
    }, 5000);
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open tracking modal
function openTrackingModal() {
    closeModal('successModal');
    openModal('trackingModal');
}

// Open profile modal
function openProfileModal() {
    loadProfileData();
    openModal('profileModal');
}

// Populate graduation years
function populateGraduationYears() {
    const select = document.getElementById('applicantGraduation');
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear + 2; year >= 2015; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    }
}

// Handle file upload display
document.getElementById('applicantResume').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
    document.getElementById('resumeFileName').textContent = fileName;
});

// Submit application form
document.getElementById('applicationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        alert('Please create your profile first.');
        openModal('profileModal');
        return;
    }
    
    // Get form data
    const formData = {
        jobId: document.getElementById('applyingJobId').value,
        jobTitle: document.getElementById('applyingJobTitle').value,
        name: document.getElementById('applicantName').value,
        email: document.getElementById('applicantEmail').value,
        phone: document.getElementById('applicantPhone').value,
        location: document.getElementById('applicantLocation').value,
        education: document.getElementById('applicantEducation').value,
        college: document.getElementById('applicantCollege').value,
        graduation: document.getElementById('applicantGraduation').value,
        experience: document.getElementById('applicantExperience').value,
        linkedin: document.getElementById('applicantLinkedIn').value,
        github: document.getElementById('applicantGitHub').value,
        portfolio: document.getElementById('applicantPortfolio').value,
        cover: document.getElementById('applicantCover').value,
        source: document.getElementById('applicantSource').value,
        resume: document.getElementById('applicantResume').files[0]?.name || 'Not uploaded'
    };
    
    // Generate application ID
    const appId = 'BN-APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Get current date for India timezone
    const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
    
    // Send emails with current date
    const finalAppId = await sendApplicationEmail(formData, appId, currentDate);
    
    // Save application data for tracking
    saveApplicationForTracking(formData, finalAppId, currentDate);
    
    // Update success modal
    document.getElementById('successAppId').textContent = finalAppId;
    document.getElementById('successPosition').textContent = formData.jobTitle;
    
    // Show success modal
    closeModal('applicationModal');
    openModal('successModal');
    
    // Reset form
    this.reset();
    document.getElementById('resumeFileName').textContent = 'No file chosen';
});

// Application data save karo tracking ke liye
function saveApplicationForTracking(formData, appId, applicationDate) {
    const applicationData = {
        appId: appId,
        jobTitle: formData.jobTitle,
        jobId: formData.jobId,
        name: formData.name,
        email: formData.email,
        applicationDate: applicationDate,
        status: 'under_review',
        statusHistory: [
            {
                status: 'submitted',
                date: applicationDate,
                description: 'Application submitted successfully'
            }
        ]
    };
    
    // User profile me save karo
    if (currentUser) {
        if (!currentUser.applications) {
            currentUser.applications = [];
        }
        currentUser.applications.push(applicationData);
        localStorage.setItem('billnexx_current_user', JSON.stringify(currentUser));
    }
    
    console.log('📝 Application saved for tracking:', applicationData);
}

// Track application
function trackApplication() {
    const email = document.getElementById('trackingEmail').value;
    const jobId = document.getElementById('trackingJobId').value;
    
    if (!email) {
        alert('Please enter your email address to track your application.');
        return;
    }
    
    // User data se applications get karo
    let applications = [];
    if (currentUser && currentUser.email === email) {
        applications = currentUser.applications || [];
    } else {
        // Fallback: localStorage se get karo
        const allApplications = JSON.parse(localStorage.getItem('billnexx_applications') || '[]');
        applications = allApplications.filter(app => 
            app.email.toLowerCase() === email.toLowerCase() &&
            (!jobId || app.jobId === jobId)
        );
    }
    
    const trackingResults = document.getElementById('trackingResults');
    
    if (applications.length === 0) {
        trackingResults.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>No Applications Found</h3>
                <p>No applications found for email: ${email}</p>
                <p>Please check your email address or try without Job ID.</p>
            </div>
        `;
    } else {
        // Show all applications for this user
        let html = '<h3>Your Applications</h3>';
        
        applications.forEach(application => {
            html += generateTrackingTimeline(application);
        });
        
        trackingResults.innerHTML = html;
    }
    
    trackingResults.style.display = 'block';
    trackingResults.scrollIntoView({ behavior: 'smooth' });
}

// Dynamic timeline generate karo
function generateTrackingTimeline(application) {
    const statusConfig = {
        'submitted': { icon: '📨', title: 'Application Submitted', days: 0 },
        'under_review': { icon: '👀', title: 'Under Review', days: 2 },
        'shortlisted': { icon: '✅', title: 'Shortlisted', days: 5 },
        'interview': { icon: '💼', title: 'Interview Scheduled', days: 7 },
        'selected': { icon: '🎉', title: 'Selected', days: 10 },
        'rejected': { icon: '❌', title: 'Not Selected', days: 10 }
    };
    
    const applicationDate = new Date(application.applicationDate);
    let timelineHTML = `
        <div class="application-tracking" style="margin-bottom: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <h4 style="color: var(--primary); margin-bottom: 10px;">
                ${application.jobTitle} 
                <span style="font-size: 0.8rem; color: var(--gray);">(${application.jobId})</span>
            </h4>
            <p style="color: var(--gray); margin-bottom: 15px;">
                Application ID: <strong>${application.appId}</strong> | 
                Applied on: <strong>${application.applicationDate}</strong>
            </p>
            <div class="status-timeline">
    `;
    
    // Generate timeline items based on current status
    const statusKeys = ['submitted', 'under_review', 'shortlisted', 'interview', 'selected'];
    const currentStatusIndex = statusKeys.indexOf(application.status);
    
    statusKeys.forEach((status, index) => {
        if (index <= currentStatusIndex) {
            // Completed steps
            const statusInfo = statusConfig[status];
            const stepDate = new Date(applicationDate);
            stepDate.setDate(stepDate.getDate() + statusInfo.days);
            
            timelineHTML += `
                <div class="timeline-item active">
                    <div class="timeline-marker">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="timeline-content">
                        <h4>${statusInfo.icon} ${statusInfo.title}</h4>
                        <p>${getStatusDescription(status)}</p>
                        <span class="timeline-date">${stepDate.toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                        })}</span>
                    </div>
                </div>
            `;
        } else {
            // Pending steps
            const statusInfo = statusConfig[status];
            timelineHTML += `
                <div class="timeline-item">
                    <div class="timeline-marker">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="timeline-content">
                        <h4>${statusInfo.icon} ${statusInfo.title}</h4>
                        <p>${getStatusDescription(status)}</p>
                        <span class="timeline-date">Pending</span>
                    </div>
                </div>
            `;
        }
    });
    
    timelineHTML += `
            </div>
        </div>
    `;
    
    return timelineHTML;
}

function getStatusDescription(status) {
    const descriptions = {
        'submitted': 'Your application has been received and is being processed.',
        'under_review': 'Our hiring team is reviewing your application.',
        'shortlisted': 'Your profile has been shortlisted for the next round.',
        'interview': 'Interview has been scheduled. Check your email for details.',
        'selected': 'Congratulations! You have been selected for the position.',
        'rejected': 'Thank you for your interest. We have chosen to move forward with other candidates.'
    };
    return descriptions[status] || 'Status update pending.';
}

// Create profile
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const password = document.getElementById('profilePassword').value;
    const confirmPassword = document.getElementById('profileConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    // Create user profile
    currentUser = {
        id: 'USER-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        name: name,
        email: email,
        phone: phone,
        profilePhoto: null,
        applications: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('billnexx_current_user', JSON.stringify(currentUser));
    
    // Update UI
    updateProfileButton();
    
    showMessage('Profile created successfully! You can now apply for jobs.', 'success');
    closeModal('profileModal');
    this.reset();
});

// Load profile data
function loadProfileData() {
    if (!currentUser) return;
    
    const profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = `
        <div class="profile-header" style="text-align: center; margin-bottom: 30px;">
            <div class="profile-photo" style="width: 120px; height: 120px; border-radius: 50%; background: var(--dark); margin: 0 auto 20px; border: 3px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--primary);">
                ${currentUser.profilePhoto ? 
                    `<img src="${currentUser.profilePhoto}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : 
                    '<i class="fas fa-user"></i>'
                }
            </div>
            <h2 style="color: var(--light); margin-bottom: 5px;">${currentUser.name}</h2>
            <p style="color: var(--gray);">${currentUser.email}</p>
            <button class="btn btn-outline" onclick="changeProfilePhoto()" style="margin-top: 10px;">
                <i class="fas fa-camera"></i> Change Photo
            </button>
        </div>
        
        <div class="profile-details" style="margin-bottom: 30px;">
            <h3 style="color: var(--light); margin-bottom: 15px; border-bottom: 1px solid var(--primary); padding-bottom: 10px;">
                <i class="fas fa-info-circle"></i> Personal Information
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="color: var(--gray); font-size: 0.9rem;">Email</label>
                    <p style="color: var(--light); margin: 5px 0;">${currentUser.email}</p>
                </div>
                <div>
                    <label style="color: var(--gray); font-size: 0.9rem;">Phone</label>
                    <p style="color: var(--light); margin: 5px 0;">${currentUser.phone || 'Not provided'}</p>
                </div>
                <div>
                    <label style="color: var(--gray); font-size: 0.9rem;">Member Since</label>
                    <p style="color: var(--light); margin: 5px 0;">${new Date(currentUser.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                    <label style="color: var(--gray); font-size: 0.9rem;">Applications</label>
                    <p style="color: var(--light); margin: 5px 0;">${currentUser.applications ? currentUser.applications.length : 0}</p>
                </div>
            </div>
        </div>
        
        ${currentUser.applications && currentUser.applications.length > 0 ? `
        <div class="application-history">
            <h3 style="color: var(--light); margin-bottom: 15px; border-bottom: 1px solid var(--primary); padding-bottom: 10px;">
                <i class="fas fa-history"></i> Application History
            </h3>
            <div style="max-height: 300px; overflow-y: auto;">
                ${currentUser.applications.map(app => `
                    <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid var(--primary);">
                        <div style="display: flex; justify-content: between; align-items: center;">
                            <div>
                                <h4 style="color: var(--light); margin: 0 0 5px 0;">${app.jobTitle}</h4>
                                <p style="color: var(--gray); margin: 0; font-size: 0.9rem;">Applied: ${app.applicationDate} | ID: ${app.appId}</p>
                            </div>
                            <span style="background: ${getStatusColor(app.status)}; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem; text-transform: capitalize;">
                                ${app.status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <div class="profile-actions" style="margin-top: 30px; text-align: center;">
            <button class="btn btn-outline" onclick="logout()" style="margin-right: 10px;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
            <button class="btn btn-primary" onclick="closeModal('profileModal')">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;
}

function getStatusColor(status) {
    const colors = {
        'submitted': '#f59e0b',
        'under_review': '#3b82f6', 
        'shortlisted': '#10b981',
        'interview': '#8b5cf6',
        'selected': '#059669',
        'rejected': '#ef4444'
    };
    return colors[status] || '#6b7280';
}

function changeProfilePhoto() {
    // Simple photo upload simulation
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentUser.profilePhoto = e.target.result;
                localStorage.setItem('billnexx_current_user', JSON.stringify(currentUser));
                loadProfileData();
                showMessage('Profile photo updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('billnexx_current_user');
    updateProfileButton();
    closeModal('profileModal');
    showMessage('Logged out successfully!', 'success');
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: ${type === 'success' ? '#10b981' : '#ef4444'}; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 10000; max-width: 300px;">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            document.body.removeChild(messageDiv);
        }
    }, 4000);
}

// Email sending function
async function sendApplicationEmail(formData, appId, currentDate) {
    try {
        const response = await fetch('/api/send-career-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                education: formData.education,
                college: formData.college,
                graduation: formData.graduation,
                experience: formData.experience,
                linkedin: formData.linkedin,
                github: formData.github,
                portfolio: formData.portfolio,
                cover: formData.cover,
                source: formData.source,
                jobTitle: formData.jobTitle,
                jobId: formData.jobId,
                applicationDate: currentDate
            })
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Email sent successfully!');
            return result.appId || appId;
        } else {
            console.log('❌ Email failed:', result.message);
            return appId;
        }
    } catch (error) {
        console.error('📧 Email error:', error);
        return appId;
    }
}

// Add event listener for Enter key in search
document.getElementById('jobSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchJobs();
    }
});

// Profile form show/hide functions
function showProfileForm() {
    document.querySelector('.profile-welcome').style.display = 'none';
    document.getElementById('profileFormContainer').style.display = 'block';
}

function hideProfileForm() {
    document.querySelector('.profile-welcome').style.display = 'block';
    document.getElementById('profileFormContainer').style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Enhanced job application validation
function validateApplicationForm() {
    const requiredFields = [
        'applicantName',
        'applicantEmail', 
        'applicantPhone',
        'applicantLocation',
        'applicantEducation',
        'applicantCollege',
        'applicantGraduation',
        'applicantExperience',
        'applicantCover'
    ];
    
    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            showMessage(`Please fill in ${element.previousElementSibling.textContent}`, 'error');
            element.focus();
            return false;
        }
    }
    
    // Email validation
    const email = document.getElementById('applicantEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }
    
    // Phone validation
    const phone = document.getElementById('applicantPhone').value;
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showMessage('Please enter a valid 10-digit Indian phone number', 'error');
        return false;
    }
    
    return true;
}

// Update application form submit to include validation
document.getElementById('applicationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateApplicationForm()) {
        return;
    }
    
    // Rest of the existing submit logic...
    if (!currentUser) {
        alert('Please create your profile first.');
        openModal('profileModal');
        return;
    }
    
    // Get form data and continue with existing logic...
    const formData = {
        // ... existing form data collection
    };
    
    // ... rest of existing submit logic
});

// Enhanced search with debouncing
let searchTimeout;
function searchJobs() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
}

function performSearch() {
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        currentJobs = [...jobsData];
    } else {
        currentJobs = jobsData.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
            job.id.toLowerCase().includes(searchTerm)
        );
    }
    
    displayedJobs = 6;
    renderJobs();
    updateJobsCount();
}

// Add loading states
function showLoading(show = true) {
    const loadingElement = document.getElementById('loadingIndicator');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

// Export data functions (for admin purposes)
function exportApplications() {
    if (!currentUser || !currentUser.applications) {
        showMessage('No applications to export', 'error');
        return;
    }
    
    const dataStr = JSON.stringify(currentUser.applications, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `billnexx-applications-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Initialize with enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
    populateGraduationYears();
    checkUserLogin();
    
    // Add any additional initialization here
    console.log('🚀 BillNexx Career Portal Initialized');
});




// Mobile Menu Functionality for Career Page
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('careerHamburgerBtn');
    const mobileMenu = document.getElementById('careerMobileMenu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
});

function openModalFromMobile(modalId) {
    const mobileMenu = document.getElementById('careerMobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    setTimeout(() => {
        openModal(modalId);
    }, 300);
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('careerMobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('careerMobileMenu');
    const hamburgerBtn = document.getElementById('careerHamburgerBtn');
    
    if (mobileMenu && hamburgerBtn && 
        !mobileMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});



function goToMainSite() {
    console.log('Navigating to main site...');
    // Direct navigate without any path issues
    window.location.href = '../index.html';
}