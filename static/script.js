const wrapper = document.querySelector(".wrapper");
const selectBtn = document.querySelector(".select-btn");
const options = document.querySelector(".options");
const search = document.querySelector("input");
const addBtn = document.querySelector(".add");
const list = document.querySelector(".list");
const submit = document.querySelector(".submit");
const dis = document.querySelector(".d");

let symptoms = ["itching","skin_rash","nodal_skin_eruptions","continuous_sneezing","shivering",
    "chills","joint_pain","stomach_pain","acidity","ulcers_on_tongue","muscle_wasting","vomiting",
    "burning_micturition","spotting_ urination","fatigue","weight_gain","anxiety",
    "cold_hands_and_feets","mood_swings","weight_loss","restlessness","lethargy",
    "patches_in_throat","irregular_sugar_level","cough","high_fever","sunken_eyes",
    "breathlessness","sweating","dehydration","indigestion","headache","yellowish_skin","dark_urine",
    "nausea","loss_of_appetite","pain_behind_the_eyes","back_pain","constipation","abdominal_pain",
    "diarrhoea","mild_fever","yellow_urine","yellowing_of_eyes","acute_liver_failure","fluid_overload",
    "swelling_of_stomach","swelled_lymph_nodes","malaise","blurred_and_distorted_vision","phlegm",
    "throat_irritation","redness_of_eyes","sinus_pressure","runny_nose","congestion","chest_pain",
    "weakness_in_limbs","fast_heart_rate","pain_during_bowel_movements","pain_in_anal_region",
    "bloody_stool","irritation_in_anus","neck_pain","dizziness","cramps","bruising","obesity",
    "swollen_legs","swollen_blood_vessels","puffy_face_and_eyes","enlarged_thyroid","brittle_nails",
    "swollen_extremeties","excessive_hunger","extra_marital_contacts","drying_and_tingling_lips",
    "slurred_speech","knee_pain","hip_joint_pain","muscle_weakness","stiff_neck","swelling_joints",
    "movement_stiffness","spinning_movements","loss_of_balance","unsteadiness",
    "weakness_of_one_body_side","loss_of_smell","bladder_discomfort","foul_smell_of urine",
    "continuous_feel_of_urine","passage_of_gases","internal_itching","toxic_look_(typhos)",
    "depression","irritability","muscle_pain","altered_sensorium","red_spots_over_body","belly_pain",
    "abnormal_menstruation","dischromic _patches","watering_from_eyes","increased_appetite",
    "polyuria","family_history","mucoid_sputum","rusty_sputum","lack_of_concentration",
    "visual_disturbances","receiving_blood_transfusion","receiving_unsterile_injections","coma",
    "stomach_bleeding","distention_of_abdomen","history_of_alcohol_consumption","fluid_overload",
    "blood_in_sputum","prominent_veins_on_calf","palpitations","painful_walking","pus_filled_pimples",
    "blackheads","scurring","skin_peeling","silver_like_dusting","small_dents_in_nails",
    "inflammatory_nails","blister","red_sore_around_nose","yellow_crust_ooze"];

symptoms.sort();

selectBtn.addEventListener("click",() => {
    wrapper.classList.toggle("active");
});

function addSymp(){
    symptoms.forEach(sympt => {
        let li = `<li onclick = "updateName(this)">${sympt}</li>`;
        options.insertAdjacentHTML("beforeend",li);
    })
}
addSymp();

function updateName(li){
    search.value = "";
    options.innerHTML = "";
    addSymp();
    wrapper.classList.toggle("active");
    selectBtn.firstElementChild.innerText = li.innerText;
}

search.addEventListener("keyup",() => {
    let arr = [];
    let searchVal = search.value.toLowerCase();
    arr = symptoms.filter(data => {
        return data.startsWith(searchVal);
    }).map(data => `<li onclick = "updateName(this)">${data}</li>`).join("");
    options.innerHTML = arr ? arr : `<p>Symptom not found</p>`;
});

addBtn.addEventListener("click",() => {
    let val = selectBtn.firstElementChild.innerText;
    if(val == "Add Symptoms" || val == "Submit or Add Symptoms")
        return ;
    let li = document.createElement("li");
    li.innerHTML = `<p>${val}</p>`;
    list.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    selectBtn.firstElementChild.innerText = "Submit or Add Symptoms";
});

list.addEventListener("click",function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
});

submit.addEventListener("click",() => {
    let ele = document.querySelectorAll(".list li p");
    const data = [];
    for(val of ele){
        data.push(val.innerText);
    }
    if(data.length == 0)  
        return ;
    
    fetch('/process-data', { 
    method: 'POST', 
    headers: { 
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({data: data}) 
    }) 
    .then(response => response.text()) 
    .then(result => { 
        dis.innerHTML = "";
        let li = document.createElement("li");
        li.innerHTML = result;
        dis.appendChild(li);
    }) 
    .catch(error => { 
    console.error('Error:', error); 
    }); 
});