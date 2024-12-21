const jobList = document.getElementById('jobList');
let jobData = [];

async function loadData() {
    try {
        const res = await fetch('./data.json');
        if (!res.ok) throw new Error('Erro ao carregar dados');
        jobData = await res.json();
        renderJobs(jobData);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function renderJobs(data) {
    jobList.innerHTML = '';
    data.forEach(job => {
        const jobCard = createCard(job);
        jobList.appendChild(jobCard);
    });
}

function createCard(job) {
    const card = document.createElement('div');
    const jobCard = document.createElement('div');
    jobCard.classList.add('jobCard', 'flex');

    const jobLogo = document.createElement('img');
    jobLogo.src = job.logo;
    jobLogo.alt = `${job.company} logo`;

    const jobContent = document.createElement('div');
    jobContent.classList.add('jobCard__content', 'flex');

    const jobInfo = document.createElement('div');
    jobContent.appendChild(jobInfo);
    jobInfo.classList.add('jobCard__info', 'flex');

    const jobInfoTop = document.createElement('h2');
    jobInfoTop.classList.add('jobInfoTop', 'flex');
    jobInfo.appendChild(jobInfoTop);

    const jobCompany = document.createElement('h2');
    jobCompany.textContent = job.company;
    jobInfoTop.appendChild(jobCompany);

    if (job.new) {
        const jobIsNew = document.createElement('span');
        jobIsNew.textContent = 'NEW!';
        jobIsNew.classList.add('jobIsNew');
        jobInfoTop.appendChild(jobIsNew);
    }

    if (job.featured) {
        const jobIsFeatured = document.createElement('span');
        jobIsFeatured.textContent = 'FEATURED';
        jobIsFeatured.classList.add('jobIsFeatured');
        jobInfoTop.appendChild(jobIsFeatured);

        const featuredJob = document.createElement('div');
        featuredJob.classList.add('featured')
        jobCard.appendChild(featuredJob);
    }

    const jobPosition = document.createElement('a');
    jobPosition.textContent = job.position;
    jobInfo.appendChild(jobPosition);

    const jobDetails = document.createElement('div');
    jobDetails.classList.add('flex', 'jobCard_details');
    jobDetails.innerHTML = `
                <div">${job.postedAt}  ·  ${job.contract}  ·  ${job.location}</div>
            `;
    jobInfo.appendChild(jobDetails);

    const jobTags = document.createElement('div');
    jobTags.classList.add('jobCard__tags', 'flex');

    const roleTag = document.createElement('p');
    roleTag.classList.add('tag');
    roleTag.textContent = job.role;
    jobTags.appendChild(roleTag);

    const levelTag = document.createElement('p');
    levelTag.classList.add('tag');
    levelTag.textContent = job.level;
    jobTags.appendChild(levelTag);

    const jobLangs = job.languages;
    jobLangs.forEach((lang) => {
        const langTag = document.createElement('p');
        langTag.classList.add('tag');
        langTag.textContent = lang;
        jobTags.appendChild(langTag);
    });

    const jobTools = job.tools;
    jobTools.forEach((tool) => {
        const toolTag = document.createElement('p');
        toolTag.classList.add('tag');
        toolTag.textContent = tool;
        jobTags.appendChild(toolTag);
    });

    jobCard.appendChild(jobLogo);
    jobCard.appendChild(jobContent);
    jobCard.appendChild(jobTags);

    jobList.appendChild(jobCard);
    return card;
}

loadData();