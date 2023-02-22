// Settings
const beltSpeeds = [150, 165, 180, 195, 210, 240, 270, 300, 330, 375, 420, 450, 480];
const tunnelLengths = [4, 5, 6];
const roboticArmTiers = [0, 1, 2, 3, 4];

/**
 * Convert an array to a string
 * @param {Array} arr The array to convert to string
 * @returns {String} The string that contains the array's data
 */
function arrToString(arr) {
    let s = "";
    arr.forEach((element, i) => s += element + ((i !== arr.length - 2 && i !== arr.length - 1) ? ", " : (i !== arr.length - 1) ? ", and " : ""));
    return s;
}

/** Requirements of a build */
class Requirements {
    /**
     * Constructs a Requirements object
     * @param {Object} settings The settings of the build
     * @param {?Number} settings.minBeltSpeed The minimum belt speed of the build
     * @param {?Number} settings.maxBeltSpeed The maximum belt speed of the build
     * @param {?Number} settings.tunnelLength The minimum belt tunnel length of the build
     * @param {?Number} settings.roboticArmTier The robotic arm tier of the build
     */
    constructor(settings = {}) {
        // minBeltSpeed
        if (settings.minBeltSpeed === undefined || settings.minBeltSpeed === null) this.minBeltSpeed = beltSpeeds[0];
        else if (beltSpeeds.every(beltSpeed => settings.minBeltSpeed !== beltSpeed)) throw new Error(`minBeltSpeed is not a valid belt speed. Valid numbers include the following: ${arrToString(beltSpeeds)}.`);
        else this.minBeltSpeed = settings.minBeltSpeed;
        // maxBeltSpeed
        if (settings.maxBeltSpeed === undefined || settings.maxBeltSpeed === null) this.maxBeltSpeed = beltSpeeds.at(-1);
        else if (beltSpeeds.every(beltSpeed => settings.maxBeltSpeed !== beltSpeed)) throw new Error(`maxBeltSpeed is not a valid belt speed. Valid numbers include the following: ${arrToString(beltSpeeds)}.`);
        else this.maxBeltSpeed = settings.maxBeltSpeed;
        // minBeltSpeed > maxBeltSpeed
        if (this.minBeltSpeed > this.maxBeltSpeed) throw new Error(`minBeltSpeed cannot be greater than maxBeltSpeed.`);

        // tunnelLength
        if (settings.tunnelLength === undefined || settings.tunnelLength === null) this.tunnelLength = tunnelLengths[0];
        else if (tunnelLengths.every(length => settings.tunnelLength !== length)) throw new Error(`tunnelLength is not a valid length. Valid numbers include the following: ${arrToString(tunnelLengths)}.`);
        else this.tunnelLength = settings.tunnelLength;

        // roboticArmTier
        if (settings.roboticArmTier === undefined || settings.roboticArmTier === null) this.roboticArmTier = roboticArmTiers[0];
        else if (roboticArmTiers.every(length => settings.roboticArmTier !== length)) throw new Error(`roboticArmTier is not a valid tier. Valid numbers include the following: ${arrToString(roboticArmTiers)}.`);
        else this.roboticArmTier = settings.roboticArmTier;
    }
}

/** Builds a Build */
class Build {

    /** @type {Number} */
    static buildsAmount = 0;

    /** @type {Object<string, Object<string, Build[]>} */
    static builds = {};

    /**
     * Construct a Build
     * @param {String} name The name of the build
     * @param {String} category The category of the build
     * @param {Number} width The width of the build
     * @param {Number} height The height of the build
     * @param {Boolean} symmetrical is the build symmetrical?
     * @param {Number} price The price of the build
     * @param {Requirements} requirements The requirements of the build
     * @param {String} blueprintCode The code to the blueprint of the build
     * @param {String} image The URL to the image of the build
     * @param {?String} note Note about the build
     */
    constructor(name, category, width, height, symmetrical, price, requirements, blueprintCode, image, note) {
        this.name = name;
        this.category = category;
        this.width = width;
        this.height = height;
        this.symmetrical = symmetrical;
        this.price = price;
        this.requirements = requirements;
        this.note = note;
        this.blueprint = new URL("https://builderment.com/blueprint/" + blueprintCode);
        this.image = new URL(image);
        // Add amount of builds
        Build.buildsAmount++;
        // Add build
        if (Build.builds[category] === undefined) Build.builds[category] = {};
        if (Build.builds[category][name] === undefined) Build.builds[category][name] = [];
        Build.builds[category][name].push(this);
    }
}

/** Builds a Balancer */
class Balancer extends Build {

    /** @type {Number} */
    static balancersAmount = 0;

    /** @type {Object<number, Object<number, Balancer[]>} */
    static balancers = {};

    /**
     * Construct a Balancer
     * @param {Number} n The amount of inputs of the balancer
     * @param {Number} m The amount of outputs of the balancer
     * @param {Number} width The width of the balancer
     * @param {Number} height The height of the balancer
     * @param {Boolean} symmetrical is the balancer symmetrical?
     * @param {Number} price The price of the balancer
     * @param {Requirements} requirements The requirements of the balancer
     * @param {String} blueprintCode The code of the blueprint of the balancer
     * @param {String} image The URL to the image of the balancer
     * @param {?String} note Note about the balancer
     */
    constructor(n, m, width, height, symmetrical, price, requirements, blueprintCode, image, note) {
        super(`${n}:${m}`, "Balancer", width, height, symmetrical, price, requirements, blueprintCode, image, note);
        this.n = n;
        this.m = m;
        // Add amount of balancers
        Balancer.balancersAmount++;
        // Add balancer
        if (Balancer.balancers[n] === undefined) Balancer.balancers[n] = {};
        if (Balancer.balancers[n][m] === undefined) Balancer.balancers[n][m] = [];
        Balancer.balancers[n][m].push(this);
    }
}

/** Builds a Splitter */
class Splitter extends Build {

    /** @type {Number} */
    static splittersAmount = 0;

    /** @type {Object<number, Object<number, Splitter[]>} */
    static splitters = {};

    /**
     * Construct a Splitter
     * @param {Number} n The amount of inputs of the splitter
     * @param {Number} m The amount of outputs of the splitter
     * @param {Number} width The width of the splitter
     * @param {Number} height The height of the splitter
     * @param {Boolean} symmetrical is the splitter symmetrical?
     * @param {Number} price The price of the splitter
     * @param {Requirements} requirements The requirements of the splitter
     * @param {String} blueprintCode The code of the blueprint of the splitter
     * @param {String} image The URL to the image of the splitter
     * @param {?String} note Note about the splitter
     */
    constructor(n, m, width, height, symmetrical, price, requirements, blueprintCode, image, note) {
        super(`${n}:${m}`, "Splitter", width, height, symmetrical, price, requirements, blueprintCode, image, note);
        this.n = n;
        this.m = m;
        // Add amount of splitters
        Splitter.splittersAmount++;
        // Add splitter
        if (Splitter.splitters[n] === undefined) Splitter.splitters[n] = {};
        if (Splitter.splitters[n][m] === undefined) Splitter.splitters[n][m] = [];
        Splitter.splitters[n][m].push(this);
    }
}

/** Builds a Factory Splitter */
class FactorySplitter extends Build {

    /** @type {Number} */
    static factorySplittersAmount = 0;

    /** @type {Object<string, Object<number, Object<number, FactorySplitter[]>>} */
    static factories = {};

    /**
     * Construct a Factory Splitter
     * @param {String} name The name of the factory splitter
     * @param {Number} n The amount of inputs of the factory splitter
     * @param {Number} m The amount of outputs of the factory splitter
     * @param {Number} width The width of the factory splitter
     * @param {Number} height The height of the factory splitter
     * @param {Boolean} symmetrical is the factory splitter symmetrical?
     * @param {Number} price The price of the factory splitter
     * @param {Requirements} requirements The requirements of the factory splitter
     * @param {String} blueprintCode The code of the blueprint of the factory splitter
     * @param {String} image The URL to the image of the factory splitter
     * @param {?String} note Note about the factory splitter
     */
    constructor(name, category, n, m, width, height, symmetrical, price, requirements, blueprintCode, image, note) {
        super(name, category, width, height, symmetrical, price, requirements, blueprintCode, image, note);
        this.n = n;
        this.m = m;
        // Add amount of factories
        FactorySplitter.factorySplittersAmount++;
        // Add factory
        if (FactorySplitter.factories[category] === undefined) FactorySplitter.factories[category] = {};
        if (FactorySplitter.factories[category][n] === undefined) FactorySplitter.factories[category][n] = {};
        if (FactorySplitter.factories[category][n][m] === undefined) FactorySplitter.factories[category][n][m] = [];
        FactorySplitter.factories[category][n][m].push(this);
    }
}

/** Builds a Valve */
class Valve extends Build {

    /** @type {Number} */
    static valvesAmount = 0;

    /** @type {Object<number, Valve[]>} */
    static valves = {};

    /**
     * Construct a Valve
     * @param {String} name The name of the valve
     * @param {Number} width The width of the valve
     * @param {Number} height The height of the valve
     * @param {Boolean} symmetrical is the valve symmetrical?
     * @param {Number} price The price of the valve
     * @param {Requirements} requirements The requirements of the valve
     * @param {String} blueprintCode The code of the blueprint of the valve
     * @param {String} image The URL to the image of the valve
     * @param {?String} note Note about the valve
     */
    constructor(name, width, height, symmetrical, price, requirements, blueprintCode, image, note) {
        super(name, "Valve", width, height, symmetrical, price, requirements, blueprintCode, image, note);
        // Add amount of valves
        Valve.valvesAmount++;
        // Add valve
        if (Valve.valves[requirements.roboticArmTier] === undefined) Valve.valves[requirements.roboticArmTier] = [];
        Valve.valves[requirements.roboticArmTier].push(this);
    }
}

/** Builds a Lab Balancer */
class LabBalancer extends Build {

    /** @type {Number} */
    static labBalancersAmount = 0;

    /** @type {Object<number, LabBalancer[]>} */
    static labBalancers = {};

    /**
     * Construct a Lab Balancer
     * @param {String} name The name of the lab balancer
     * @param {Number} width The width of the lab balancer
     * @param {Number} height The height of the lab balancer
     * @param {Boolean} symmetrical is the lab balancer symmetrical?
     * @param {Number} price The price of the lab balancer
     * @param {Requirements} requirements The requirements of the lab balancer
     * @param {String} blueprintCode The code of the blueprint of the lab balancer
     * @param {String} image The URL to the image of the lab balancer
     * @param {?String} note Note about the lab balancer
     */
    constructor(name, width, height, symmetrical, price, requirements, blueprintCode, image, note) {
        super(name, "Lab Balancer", width, height, symmetrical, price, requirements, blueprintCode, image, note);
        // Add amount of lab balancers
        LabBalancer.labBalancersAmount++;
        // Add lab balancer
        if (LabBalancer.labBalancers[requirements.roboticArmTier] === undefined) LabBalancer.labBalancers[requirements.roboticArmTier] = [];
        LabBalancer.labBalancers[requirements.roboticArmTier].push(this);
    }
}