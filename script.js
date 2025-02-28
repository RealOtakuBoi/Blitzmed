        const API_KEY = "AIzaSyAKy7lM2uhCBtyRHtR3japozfk_vusALp4";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        document.getElementById("typing-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            const selectedSymptoms = Array.from(document.querySelectorAll(".symptoms-list input:checked"))
                .map(checkbox => checkbox.value)
                .join(", ");

            const extraSymptoms = document.getElementById("extra-symptoms").value.trim();

            if (!selectedSymptoms && !extraSymptoms) {
                alert("Please select or enter at least one symptom for first aid guidance.");
                return;
            }

            const symptomsText = selectedSymptoms + (extraSymptoms ? `, ${extraSymptoms}` : "");
            const userMessage = "Given in angular brackets are the symptoms of a critical patient who has already called an ambulance. Analyze his symptoms step by step and provide only step by step guidance for first aid. Give your response in the {format Remain CALM, here is the necessary first aid (next line)1. (next line)2.}" + "<" + symptomsText + ">";

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
                
                document.getElementById("firstAidGuide").innerHTML = responseText.split("\n").map(point => `<p>${point}</p>`).join("");

            } catch (error) {
                console.log(error);
                alert("Failed to fetch first aid details. Please try again.");
            }
        });