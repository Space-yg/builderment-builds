// Initials
/** @type {HTMLSelectElement} */
const build = document.getElementById("build");
/** @type {HTMLSelectElement} */
const n = document.getElementById("n");
/** @type {HTMLSelectElement} */
const m = document.getElementById("m");
/** @type {HTMLSelectElement} */
const roboticArmTier = document.getElementById("roboticArmTier");
/** @type {HTMLDivElement} */
const tables = document.getElementById("tables");

/**
 * Show Builds
 * @param {Build[]} builds The category of the build 
 */
function showBuild(builds) {
    builds.forEach(buildInfo => {
        // createBuildURL function parameter
        const urlPrams = {
            build: build.value,
            blueprintCode: buildInfo.blueprint.href.match(/[^/]+$/)[0],
        };
        if (["Overflow Valve", "Research Lab Balancer"].indexOf(build.value) >= 0) urlPrams.roboticArmTier = roboticArmTier.value;
        else {
            urlPrams.inputs = n.value;
            urlPrams.outputs = m.value;
        }
        let div = `<div id="${buildInfo.blueprint.href.match(/[^/]+$/)[0]}">
            <div class="blueprint">
                <div class="tooltip">
                    <img src="./images/chain link icon.png" alt="Build Link" onclick="navigator.clipboard.writeText('${createBuildURL(urlPrams)}'); event.target.nextElementSibling.innerHTML = 'Copied!';" onmouseleave="event.target.nextElementSibling.innerHTML = 'Copy';">
                    <span>Copy</span>
                </div>
                <h3>${buildInfo.name} ${buildInfo.category}</h3>
                <a href="${buildInfo.blueprint}" target="_blank" class="blueprint"><img src="./images/blueprint.png" alt="blueprint"></a>
            </div>
            <img src="${buildInfo.image}" alt="${buildInfo.name} ${buildInfo.category}">
            <h4>Properties</h4>
            <div>
                <p>Width: ${buildInfo.width}</p>
                <p>Height: ${buildInfo.height}</p>
                <p>Symmetrical: ${(buildInfo.symmetrical) ? "Yes" : "No"}</p>`;
        
        // Add Price
        if (buildInfo.price !== null) div += `<p>Price: ${buildInfo.price}</p>`;
        // Close properties
        div += "</div>";

        //// Add Requirements
        if ((buildInfo.requirements.maxBeltSpeed !== 480 || buildInfo.requirements.minBeltSpeed !== 150) || buildInfo.requirements.tunnelLength !== 4 || buildInfo.requirements.roboticArmTier !== 0) {
            div += "<h4>Requirements</h4><div>";
            // Add belt speed range
            if (buildInfo.requirements.maxBeltSpeed !== 480 || buildInfo.requirements.minBeltSpeed !== 150) div += `<p>Belt speed: ${(buildInfo.requirements.minBeltSpeed === buildInfo.requirements.maxBeltSpeed) ? buildInfo.requirements.minBeltSpeed : `${buildInfo.requirements.minBeltSpeed}-${buildInfo.requirements.maxBeltSpeed}`}</p>`;
            // Add tunnel length
            if (buildInfo.requirements.tunnelLength !== 4) div += `<p>Belt tunnel length: ${buildInfo.requirements.tunnelLength}</p>`;
            // Add robotic arm tier
            if (buildInfo.requirements.roboticArmTier !== 0) div += `<p>Robotic arm tier: ${buildInfo.requirements.roboticArmTier}</p>`;
            // Close requirements
            div += "</div>";
        }

        // Add Note
        if (buildInfo.note !== undefined && buildInfo.note !== null) div += `<h4>Notes</h4><div><p>${buildInfo.note}</p></div>`;

        // Close div
        div += "</div>";

        // Add to tables
        tables.innerHTML += div;
    });
}

// if any input is changed...
function inputChange() {
    if (new URLSearchParams(window.location.search).get("build")) history.replaceState(null, null, "./");
}

// Change build
function buildChange() {
    // Remove all tables
    tables.innerHTML = "";

    // Change build if it is in URL parameter
    let url = new URLSearchParams(window.location.search);
    if (build.value === "") {
        const buildParam = url.get("build");
        if (buildParam) build.value = buildParam;
    } else inputChange();
    url = new URLSearchParams(window.location.search);

    // Remove all select
    [...document.getElementsByClassName("n")].forEach(element => element.style.display = "none");
    [...document.getElementsByClassName("m")].forEach(element => element.style.display = "none");
    [...document.getElementsByClassName("roboticArmTier")].forEach(element => element.style.display = "none");
    
    // Show or remove N and M inputs
    if (["Belt Balancer", "Belt Splitter"].indexOf(build.value) >= 0 || build.options.item(build.selectedIndex).parentElement.label === "Factory Design") {
        // Show n select
        [...document.getElementsByClassName("n")].forEach(element => element.style.display = "inline-block");
        n.innerHTML = "";
        // Add empty option
        n.innerHTML += '<option selected style="display: none;"></option>';
        // Add options
        const ns = (build.value === "Belt Balancer") ? Balancer.balancers : (build.value === "Belt Splitter") ? Splitter.splitters : FactorySplitter.factories[build.value];
        for (const nn in ns) n.innerHTML += `<option>${nn}</option>`;
    } else if (["Overflow Valve", "Research Lab Balancer"].indexOf(build.value) >= 0) {
        // Show n select
        [...document.getElementsByClassName("roboticArmTier")].forEach(element => element.style.display = "inline-block");
        roboticArmTier.innerHTML = "";
        // Add empty option
        roboticArmTier.innerHTML += '<option selected style="display: none;"></option>';
        // Add options
        const tiers = (build.value === "Overflow Valve") ? Valve.valves : LabBalancer.labBalancers;
        for (const tier in tiers) roboticArmTier.innerHTML += `<option>${tier}</option>`;
    }

    // Go to build if it is in URL parameters
    if (url.get("build")) {
        const nParam = url.get("inputs");
        const roboticArmTierParam = url.get("roboticArmTier");
        if (nParam) {
            n.value = nParam;
            changeN();
            m.value = url.get("outputs");
            changeM();
        } else if (roboticArmTierParam) {
            roboticArmTier.value = roboticArmTierParam;
            changeRoboticArmTier();
        }
    }
}
build.addEventListener("change", buildChange);
buildChange();

// If n is changed...
function changeN() {
    // Remove all tables
    tables.innerHTML = "";
    
    // Make M visible
    [...document.getElementsByClassName("m")].forEach(element => element.style.display = "inline-block");
    
    //// Add options to M
    m.innerHTML = "";
    // Add empty option
    m.innerHTML += '<option selected style="display: none;"></option>';
    // Add options
    const ms = (build.value === "Belt Balancer") ? Balancer.balancers[n.value] : (build.value === "Belt Splitter") ? Splitter.splitters[n.value] : FactorySplitter.factories[build.value][n.value];
    for (const mm in ms) m.innerHTML += `<option>${mm}</option>`;
}
n.addEventListener("change", () => {
    inputChange();
    changeN();
});

// If m is changed...
function changeM() {
    // Remove all tables
    tables.innerHTML = "";

    // Show tables
    showBuild(((build.value === "Belt Balancer") ? Balancer.balancers : (build.value === "Belt Splitter") ? Splitter.splitters : FactorySplitter.factories[build.value])[n.value][m.value]);
}
m.addEventListener("change", () => {
    inputChange();
    changeM();
});

// If roboticArmTier is changed...
function changeRoboticArmTier() {
    // Remove all tables
    tables.innerHTML = "";
    
    // Show tables
    showBuild(((build.value === "Overflow Valve") ? Valve.valves : LabBalancer.labBalancers)[roboticArmTier.value]);
}
roboticArmTier.addEventListener("change", () => {
    inputChange();
    changeRoboticArmTier();
});

/**
 * Creates a URL for a build
 * @param {{build: String, blueprintCode: String, inputs: ?Number, outputs: ?Number, roboticArmTier: ?Number}} params The build's settings
 */
function createBuildURL(params) {
    const url = new URL(window.location.href);

    url.searchParams.set("build", params.build);
    if (params.inputs) {
        url.searchParams.set("inputs", params.inputs);
        url.searchParams.set("outputs", params.outputs);
    } else if (params.roboticArmTier) url.searchParams.set("roboticArmTier", params.roboticArmTier);
    url.hash = params.blueprintCode;
    
    return url;
}
