function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}
function showEmergencyPage() {
    document.querySelector('.plus-sign').style.display = 'none';
    document.querySelector('p').style.display = 'none';
    document.getElementById('emergencyPage').classList.remove('hidden');
}
function goBack() {
    document.getElementById('emergencyPage').classList.add('hidden');
    document.querySelector('.plus-sign').style.display = 'block';
    document.querySelector('p').style.display = 'block';
}

const API_KEY = "AIzaSyAKy7lM2uhCBtyRHtR3japozfk_vusALp4";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

document.getElementById("typing-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const symptomsInput = document.getElementById("symptoms").value.trim();
    if (!symptomsInput) {
        alert("Please enter symptoms for personalized first aid.");
        return;
    }

    const userMessage = "First aid in 3 key points excluding medical attention for " + symptomsInput;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        
        // Update the First Aid Guide section
        document.getElementById("firstAidGuide").innerHTML = responseText.split("\n").map(point => `<p>${point}</p>`).join("");

    } catch (error) {
        console.log(error);
        alert("Failed to fetch first aid details. Please try again.");
    }
});