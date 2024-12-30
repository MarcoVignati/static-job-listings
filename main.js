const jobList = document.getElementById('jobList');
const tagFilter = document.getElementById('filter');
let jobData = [];
let filteredData = [];

async function loadData() {
    try {
        const res = await fetch('./data.json');
        jobData = await res.json();
        filteredData = [...jobData];
        renderJobs(filteredData);
        generateTags(jobData);
        toggleFilterContainer();
    } catch (error) {
        console.error('Erro:', error);
    }
}

function renderJobs(data) {
    jobList.innerHTML = '';
    data.forEach(job => {
        const jobCard = new JobCard(job);
        jobList.appendChild(jobCard.render());
    });
}

function generateTags(data) {
    const uniqueTags = new Set();
    data.forEach(job => {
        uniqueTags.add(job.role);
        uniqueTags.add(job.level);
        job.languages.forEach(lang => uniqueTags.add(lang));
        job.tools.forEach(tool => uniqueTags.add(tool));
    });

    uniqueTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.classList.add('filterTag');
        tagButton.textContent = tag;
        tagButton.addEventListener('click', () => toggleFilter(tag));
    });
}

const selectedTags = new Set();

function toggleFilter(tag) {
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
    } else {
        selectedTags.add(tag);
    }
    updateFilterTags();
    filterJobs();
    toggleFilterContainer();
}

function filterJobs() {
    filteredData = jobData.filter(job => {
        const jobTags = new Set([job.role, job.level, ...job.languages, ...job.tools]);
        return [...selectedTags].every(tag => jobTags.has(tag));
    });
    renderJobs(filteredData);
}

function updateFilterTags() {
    tagFilter.innerHTML = '';
    
    selectedTags.forEach(tag => {
        const tagContainer = document.createElement('div');
        tagContainer.classList.add('filterTagContainer');
        
        const tagName = document.createElement('div');
        tagName.classList.add('filterTagName');
        tagName.textContent = tag;
        tagContainer.appendChild(tagName);

        const removeIcon = document.createElement('div');
        removeIcon.classList.add('filterTagRemove');
        removeIcon.innerHTML = '<img src="./images/icon-remove.svg">';
        removeIcon.addEventListener('click', () => removeTagFromFilter(tag));
        tagContainer.appendChild(removeIcon);
        
        tagFilter.appendChild(tagContainer);
    });

    createClearFiltersButton();
    toggleFilterContainer();
}

function createClearFiltersButton() {
    const existingButton = document.getElementById('clearFiltersBtn');
    if (existingButton) return;

    const clearFiltersBtn = document.createElement('button');
    clearFiltersBtn.id = 'clearFiltersBtn';
    clearFiltersBtn.textContent = 'Clear';
    clearFiltersBtn.classList.add('clearFiltersButton');
    clearFiltersBtn.addEventListener('click', clearAllFilters);

    tagFilter.appendChild(clearFiltersBtn);
}

function clearAllFilters() {
    selectedTags.clear();
    updateFilterTags();
    filterJobs();
    toggleFilterContainer();
}

function removeTagFromFilter(tag) {
    selectedTags.delete(tag);
    updateFilterTags();
    filterJobs();
    toggleFilterContainer();
}

function toggleFilterContainer() {
    if (selectedTags.size > 0) {
        tagFilter.style.display = 'flex';
    } else {
        tagFilter.style.display = 'none';
    }
}

class JobCard {
    constructor(job) {
        this.job = job;
    }

    createCard() {
        const card = document.createElement('div');
        const jobCard = document.createElement('div');
        jobCard.classList.add('jobCard', 'flex');

        const jobLogo = document.createElement('img');
        jobLogo.src = this.job.logo;
        jobLogo.alt = `${this.job.company} logo`;

        const jobContent = document.createElement('div');
        jobContent.classList.add('jobCard__content', 'flex');

        const jobInfo = document.createElement('div');
        jobContent.appendChild(jobInfo);
        jobInfo.classList.add('jobCard__info', 'flex');

        const jobInfoTop = document.createElement('h2');
        jobInfoTop.classList.add('jobInfoTop', 'flex');
        jobInfo.appendChild(jobInfoTop);

        const jobCompany = document.createElement('h2');
        jobCompany.textContent = this.job.company;
        jobInfoTop.appendChild(jobCompany);

        if (this.job.new) {
            const jobIsNew = document.createElement('span');
            jobIsNew.textContent = 'NEW!';
            jobIsNew.classList.add('jobIsNew');
            jobInfoTop.appendChild(jobIsNew);
        }

        if (this.job.featured) {
            const jobIsFeatured = document.createElement('span');
            jobIsFeatured.textContent = 'FEATURED';
            jobIsFeatured.classList.add('jobIsFeatured');
            jobInfoTop.appendChild(jobIsFeatured);

            const featuredJob = document.createElement('div');
            featuredJob.classList.add('featured')
            jobCard.appendChild(featuredJob);
        }

        const jobPosition = document.createElement('a');
        jobPosition.textContent = this.job.position;
        jobInfo.appendChild(jobPosition);

        const jobDetails = document.createElement('div');
        jobDetails.classList.add('flex', 'jobCard_details');
        jobDetails.innerHTML = `
            <div>${this.job.postedAt}  ·  ${this.job.contract}  ·  ${this.job.location}</div>
        `;
        jobInfo.appendChild(jobDetails);

        const jobTags = document.createElement('div');
        jobTags.classList.add('jobCard__tags', 'flex');

        const roleTag = document.createElement('p');
        roleTag.classList.add('tag');
        roleTag.textContent = this.job.role;
        roleTag.addEventListener('click', () => toggleFilter(this.job.role));
        jobTags.appendChild(roleTag);

        const levelTag = document.createElement('p');
        levelTag.classList.add('tag');
        levelTag.textContent = this.job.level;
        levelTag.addEventListener('click', () => toggleFilter(this.job.level));
        jobTags.appendChild(levelTag);

        this.job.languages.forEach((lang) => {
            const langTag = document.createElement('p');
            langTag.classList.add('tag');
            langTag.textContent = lang;
            langTag.addEventListener('click', () => toggleFilter(lang));
            jobTags.appendChild(langTag);
        });

        this.job.tools.forEach((tool) => {
            const toolTag = document.createElement('p');
            toolTag.classList.add('tag');
            toolTag.textContent = tool;
            toolTag.addEventListener('click', () => toggleFilter(tool));
            jobTags.appendChild(toolTag);
        });

        jobCard.appendChild(jobLogo);
        jobCard.appendChild(jobContent);
        jobCard.appendChild(jobTags);

        card.appendChild(jobCard);

        return card;
    }

    render() {
        return this.createCard();
    }
}

loadData();
