document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get references to form elements using their IDs.
    const profilePictureInput = document.getElementById('profilePicture');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');

    //** 
    const usernameElement = document.getElementById('username');


    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && usernameElement) {

        const name = (nameElement as HTMLInputElement).value;
        const email = (emailElement as HTMLInputElement).value;
        const phone = (phoneElement as HTMLInputElement).value;
        const address = (addressElement as HTMLInputElement).value;
        const education = (educationElement as HTMLInputElement).value;
        const experience = (experienceElement as HTMLInputElement).value;
        const skills = (skillsElement as HTMLInputElement).value;
        const username = (usernameElement as HTMLInputElement).value;
        const uniquePath = `resumes/${username.replace(/\s*/g, '_')}_cv.html`



        // Handle profile picture
        const profilePictureFile = (profilePictureInput as HTMLInputElement).files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        // Create resume output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Work Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
        `;


        // Display the resume in the output container.
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove('hidden');

            // Create container for buttons.
            const buttonsContainer = document.createElement('div');
            buttonsContainer.id = 'buttonsContainer';
            resumeOutputElement.appendChild(buttonsContainer);

            // Add Download PDF button.
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download as PDF';
            downloadButton.addEventListener('click',  () => {
                window.print(); // Open the print dialog, allowing the user to download as PDF.
            });
            buttonsContainer.appendChild(downloadButton);

            // Add Shareable Link button.
            const shareLinkButton = document.createElement('button');
            downloadButton.textContent = 'Copy Shareable Link';
            shareLinkButton.addEventListener('click', async () => {
                try {
                    // Create a unique shareable link (simulate it in this case).
                    const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                        /\s*/g,
                       '_' 
                    )}_cv.html`;

                    // The Clipboard API to copy the shareable link.
                    await navigator.clipboard.writeText(shareableLink);
                    alert(`Shareable link copied to clipboard`);
                } catch (err) {
                    console.error("Failed to copy link: ", err);
                    alert("Failed to copy link to clipboard. Please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
        } else {
            console.error("Resume output container not found");
        }
    } else {
        console.error("One or more form elements are missing");
    }
});