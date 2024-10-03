/**
 * Function to fetch tutorials data from the server.
 * 
 * Input: None (fetches data on user action).
 * Process: Makes an API call, processes the JSON response, and passes the relevant tutorial data for rendering.
 * Output: Renders the tutorial titles on the webpage.
 */


async function fetchTutorials() {
    try {
        // Input: API URL 
       // const response = await fetch('tutorial.json');
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.sesvtutorial.com/page-data/tutorials/page-data.json'));

       // console.log(typeof response);
        // Check if the server response is successful.
        if (!response.ok) {
            // If the response is not successful, throw an error.
            throw new Error('Failed to fetch the tutorials');
        }

        // Process: Parse the JSON data received from the API.
        const dataJSON = await response.json();
        //console.log(typeof dataJSON);

        // Process: Extract relevant tutorial data from the JSON response.
        // Assuming the JSON structure contains tutorials in `posts.edges`
        //fix here add dataJSON.contents
       // const tutorials = dataJSON.contents.result.data.posts.edges || []; // Ensure fallback in case of missing data.
         // Parse `dataJSON.contents` into a JSON object

        const tutorials = JSON.parse(dataJSON.contents).result.data.posts.edges || [];

        // Save tutorials to Local Storage
        localStorage.setItem('tutorials', JSON.stringify(tutorials));
        // Output: Render the extracted tutorials using the renderTutorials function.
        renderTutorials(tutorials);
    } catch (error) {
        // Handle any errors that occur during the fetch or processing stages.
        console.error('Error fetching tutorials:', error);
    }
}

/**
 * Function to render tutorials onto the webpage.
 * 
 * Input: Array of tutorial objects (extracted from the server response).
 * Process: For each tutorial object, create an anchor element (link) and append it to the page.
 * Output: Displays a list of tutorial titles as clickable links in the designated container on the webpage.
 * 
 * @param {Array} tutorials - Array of tutorial objects from the API response.
 */
function renderTutorials(tutorials) {
    // Log the tutorial data for debugging purposes (can be removed in production).
    console.log("Rendering tutorials:", tutorials);

    // Process: Iterate over each tutorial object.
    tutorials.forEach(({ node }) => {
        // Input: Extract the necessary data (slug and title) from each tutorial object.
        const { fields: { slug }, frontmatter: { title } } = node;

        // Process: Create a new anchor (`<a>`) element for each tutorial.
        const tutorialLink = document.createElement("a");

        // Set attributes: give the link an ID and assign the tutorial URL.
       // Assign a unique ID to the link.
       // Create the full URL using the slug.
        tutorialLink.setAttribute(
            "href",
            `https://www.sesvtutorial.com${slug}`
        );
        // Set the text content of the link to the tutorial's title.
        tutorialLink.innerText = title;

        // Output: Append the newly created link element to the container with ID 'contentz'.
        document.getElementById("content").appendChild(tutorialLink);
    });
}

document.getElementById('fetchBtn').addEventListener('click', fetchTutorials);
