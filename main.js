const jobList = document.getElementById('jobList');

async function loadData() {
    try {
        const res = await fetch('./data.json');
        if (!res.ok) {
            throw new Error('Erro ao carregar dados');
        }
        const data = await res.json();
        console.log(data);

        data.forEach(job => {
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

            const jobCompany = document.createElement('h2');
            jobCompany.textContent = job.company;
            jobInfo.appendChild(jobCompany);

            const jobPosition = document.createElement('a');
            jobPosition.textContent = job.position;
            jobInfo.appendChild(jobPosition);

            const jobDetails = document.createElement('div');
            jobDetails.classList.add('flex');
            jobDetails.innerHTML = `
                <div class="jobCard_details">${job.postedAt}  ·  ${job.contract}  ·  ${job.location}</div>
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

            const languagesTag = document.createElement('p');
            languagesTag.classList.add('tag');
            const jobLangs = job.languages;
            jobLangs.forEach((lang) => {
                languagesTag.textContent = lang;
            })
            jobTags.appendChild(languagesTag);

            const toolsTag = document.createElement('p');
            toolsTag.classList.add('tag');
            const jobTools = job.tools;
            jobTools.forEach((tool) => {
                toolsTag.textContent = tool;
            })
            jobTags.appendChild(languagesTag);

            jobCard.appendChild(jobLogo);
            jobCard.appendChild(jobContent);
            jobCard.appendChild(jobTags);

            if(job.featured) {
                const featuredJob = document.createElement('div');
                featuredJob.classList.add('featured')
                jobCard.appendChild(featuredJob);
            }

            jobList.appendChild(jobCard);
        });
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

loadData();