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
     */
    constructor(name, category, width, height, symmetrical, price, requirements, blueprintCode, image) {
        this.name = name;
        this.category = category;
        this.width = width;
        this.height = height;
        this.symmetrical = symmetrical;
        this.price = price;
        this.requirements = requirements;
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
     */
    constructor(n, m, width, height, symmetrical, price, requirements, blueprintCode, image) {
        super(`${n}:${m}`, "Balancer", width, height, symmetrical, price, requirements, blueprintCode, image);
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
     */
    constructor(n, m, width, height, symmetrical, price, requirements, blueprintCode, image) {
        super(`${n}:${m}`, "Splitter", width, height, symmetrical, price, requirements, blueprintCode, image);
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
     * @param {String} name The name of the factory
     * @param {Number} n The amount of inputs of the factory
     * @param {Number} m The amount of outputs of the factory
     * @param {Number} width The width of the factory
     * @param {Number} height The height of the factory
     * @param {Boolean} symmetrical is the factory symmetrical?
     * @param {Number} price The price of the factory
     * @param {Requirements} requirements The requirements of the factory
     * @param {String} blueprintCode The code of the blueprint of the factory
     * @param {String} image The URL to the image of the factory
     */
    constructor(name, category, n, m, width, height, symmetrical, price, requirements, blueprintCode, image) {
        super(name, category, width, height, symmetrical, price, requirements, blueprintCode, image);
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

// Initials
/** @type {HTMLSelectElement} */
const build = document.getElementById("build");
/** @type {HTMLSelectElement} */
const n = document.getElementById("n");
/** @type {HTMLSelectElement} */
const m = document.getElementById("m");
/** @type {HTMLDivElement} */
const tables = document.getElementById("tables");

////// Builds

//// Balancers
// N:N
new Balancer(2, 2, 3, 5, false, 80, new Requirements(), "rzh5ph", "https://cdn.discordapp.com/attachments/1015662339737006090/1016471678068461589/IMG_3817.png");
new Balancer(3, 3, 5, 9, false, 230, new Requirements(), "2hfn0f", "https://cdn.discordapp.com/attachments/1015662339737006090/1016471715112554557/IMG_0495.jpg");
new Balancer(3, 3, 9, 5, true, 230, new Requirements(), "q298nv", "https://cdn.discordapp.com/attachments/1015662339737006090/1016471744812429382/IMG_0496.jpg");
new Balancer(4, 4, 6, 9, false, 336, new Requirements(), "rndfx4", "https://cdn.discordapp.com/attachments/1015662339737006090/1016471774319353886/IMG_3812.png");
new Balancer(5, 5, 10, 12, false, 710, new Requirements(), "gn6wps", "https://cdn.discordapp.com/attachments/1015662339737006090/1016662866423722055/IMG_4288.png");
new Balancer(5, 5, 11, 13, true, 846, new Requirements(), "y0zqh2", "https://cdn.discordapp.com/attachments/1015662339737006090/1016664165001216120/IMG_8785.png");
new Balancer(5, 5, 7, 20, false, 896, new Requirements(), "b645g8", "https://cdn.discordapp.com/attachments/1015662339737006090/1018772741198987295/IMG_4455.png");
new Balancer(6, 6, 10, 13, true, 824, new Requirements(), "t327wk", "https://cdn.discordapp.com/attachments/1015662339737006090/1016756770305220730/IMG_4297.png");
new Balancer(7, 7, 12, 15, false, 1142, new Requirements(), "6yhzlc", "https://cdn.discordapp.com/attachments/1015662339737006090/1032773172963061881/IMG_0443.png");
new Balancer(8, 8, 12, 15, true, 1128, new Requirements(), "rxwds2", "https://cdn.discordapp.com/attachments/1015662339737006090/1032773374918799411/IMG_0442.png");
new Balancer(8, 8, 10, 17, false, 1160, new Requirements({tunnelLength: 5}), "25kcl0", "https://cdn.discordapp.com/attachments/1015662339737006090/1016830945074102324/IMG_4313.png");
new Balancer(8, 8, 8, 32, false, 1732, new Requirements(), "s53pz0", "https://cdn.discordapp.com/attachments/1015662339737006090/1016794876408496259/IMG_4303.png");
new Balancer(8, 8, 8, 30, false, 1572, new Requirements({tunnelLength: 6}), "tts9rd", "https://cdn.discordapp.com/attachments/1015662339737006090/1017015994323042384/IMG_4304.png");
new Balancer(9, 9, 15, 19, false, 1694, new Requirements(), "x67kn7", "https://cdn.discordapp.com/attachments/1015662339737006090/1016813936294768777/IMG_8790.png");
new Balancer(10, 10, 20, 18, false, 2236, new Requirements(), "l9tbqb", "https://cdn.discordapp.com/attachments/1015662339737006090/1017031345320509502/IMG_8792.png");
new Balancer(10, 10, 18, 19, true, 2148, new Requirements({tunnelLength: 6}), "sgks2x", "https://cdn.discordapp.com/attachments/1015662339737006090/1031867937000280075/IMG_0408.png");
new Balancer(11, 11, 18, 23, false, 2644, new Requirements(), "5a3z1a", "https://cdn.discordapp.com/attachments/1015662339737006090/1031581126889852988/IMG_0396.png");
new Balancer(12, 12, 20, 20, true, 2480, new Requirements(), "v48dzp", "https://cdn.discordapp.com/attachments/1015662339737006090/1034830142536700016/IMG_0491.png");
new Balancer(13, 13, 24, 24, false, 3688, new Requirements(), "c108vv", "https://cdn.discordapp.com/attachments/1015662339737006090/1022513465061036122/IMG_4666.png");
new Balancer(14, 14, 24, 24, false, 3556, new Requirements(), "74bnz3", "https://cdn.discordapp.com/attachments/1015662339737006090/1022427844242051082/IMG_4664.png");
new Balancer(15, 15, 25, 27, false, 4020, new Requirements(), "7qm006", "https://cdn.discordapp.com/attachments/1015662339737006090/1077249564941221898/latest.png");
new Balancer(16, 16, 24, 27, false, 3944, new Requirements(), "0w5a05", "https://cdn.discordapp.com/attachments/1015662339737006090/1067871737527681095/IMG_1064.png");
new Balancer(16, 16, 20, 26, true, 3340, new Requirements({tunnelLength: 6}), "8qsq9n", "https://cdn.discordapp.com/attachments/1015662339737006090/1017341583500251197/IMG_4335.png");
new Balancer(17, 17, 30, 28, false, 4740, new Requirements(), "j3x7p8", "https://cdn.discordapp.com/attachments/1015662339737006090/1046553961383088188/IMG_0782.png");
new Balancer(18, 18, 30, 28, false, 4784, new Requirements(), "gvs1fy", "https://cdn.discordapp.com/attachments/1015662339737006090/1046554054010077276/IMG_0781.png");
new Balancer(19, 19, 40, 28, false, 6806, new Requirements(), "qsmysd", "https://cdn.discordapp.com/attachments/1015662339737006090/1027607847313354792/IMG_5041.png");
new Balancer(20, 20, 40, 28, true, 6744, new Requirements(), "wr5765", "https://cdn.discordapp.com/attachments/1015662339737006090/1027529107371737108/IMG_5040.png");
new Balancer(21, 21, 36, 36, false, 7448, new Requirements(), "m43tb5", "https://cdn.discordapp.com/attachments/1015662339737006090/1022823066130186240/IMG_9003.png");
new Balancer(22, 22, 40, 31, true, 7480, new Requirements(), "ppq5qr", "https://cdn.discordapp.com/attachments/1015662339737006090/1065254271295176794/IMG_1015.png");
new Balancer(23, 23, 40, 31, false, 7520, new Requirements(), "m5zatv", "https://cdn.discordapp.com/attachments/1015662339737006090/1065254436097753128/IMG_1016.png");
new Balancer(24, 24, 40, 31, true, 7560, new Requirements(), "3c55hs", "https://cdn.discordapp.com/attachments/1015662339737006090/1027370303170551838/IMG_5036.png");
new Balancer(25, 25, 50, 38, false, 11032, new Requirements(), "vjyt1a", "https://cdn.discordapp.com/attachments/1015662339737006090/1023365429688807464/IMG_4741.png");

//// Splitters
// 1:N
new Splitter(1, 4, 4, 2, false, 42, new Requirements(), "01vxl1", "https://cdn.discordapp.com/attachments/1015664941421822002/1016639132598018099/1.jpg");
new Splitter(1, 5, 5, 3, false, 90, new Requirements(), "fwgldk", "https://cdn.discordapp.com/attachments/1015664941421822002/1016639499016605786/1.jpg");
new Splitter(1, 5, 5, 4, true, 152, new Requirements(), "8v8236", "https://cdn.discordapp.com/attachments/1015664941421822002/1016639547418878042/IMG_4050.png");
new Splitter(1, 6, 6, 2, false, 76, new Requirements(), "y37wqa", "https://cdn.discordapp.com/attachments/1015664941421822002/1016639624019447900/1.jpg");
new Splitter(1, 7, 7, 4, true, 124, new Requirements(), "bnknx8", "https://cdn.discordapp.com/attachments/1015664941421822002/1016644282322522122/IMG_8784.png");
new Splitter(1, 8, 8, 2, false, 116, new Requirements(), "hb591f", "https://cdn.discordapp.com/attachments/1015664941421822002/1016640145887350794/IMG_4244.png");
new Splitter(1, 9, 9, 2, true, 88, new Requirements(), "ywa0fc", "https://cdn.discordapp.com/attachments/1015664941421822002/1016640450133753876/IMG_4245.png");
new Splitter(1, 10, 10, 3, false, 146, new Requirements(), "7qvd7z", "https://cdn.discordapp.com/attachments/1015664941421822002/1016640526054866944/IMG_3691.png");
new Splitter(1, 11, 11, 4, true, 298, new Requirements(), "khyl8w", "https://cdn.discordapp.com/attachments/1015664941421822002/1016641662161801296/IMG_4246.png");
new Splitter(1, 12, 12, 2, false, 148, new Requirements(), "p5mwzj", "https://cdn.discordapp.com/attachments/1015664941421822002/1016641715475587082/1.jpg");
new Splitter(1, 13, 13, 4, true, 294, new Requirements(), "nc7hjf", "https://cdn.discordapp.com/attachments/1015664941421822002/1016641756881760286/4E5948C9-4B1D-4EE2-BB72-5DD2781F5F10.jpg");
new Splitter(1, 14, 14, 3, false, 334, new Requirements(), "p4brj4", "https://cdn.discordapp.com/attachments/1015664941421822002/1016641822115762176/IMG_3694.png");
new Splitter(1, 15, 15, 4, true, 350, new Requirements(), "y3lbs9", "https://cdn.discordapp.com/attachments/1015664941421822002/1016641918190485504/IMG_3695.png");
new Splitter(1, 16, 16, 3, false, 234, new Requirements(), "d36q3p", "https://cdn.discordapp.com/attachments/1015664941421822002/1016641989342674984/IMG_3696.png");
new Splitter(1, 17, 17, 4, true, 260, new Requirements(), "gmcsdz", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642054727663686/IMG_3697.png");
new Splitter(1, 18, 18, 3, false, 222, new Requirements(), "kpxk66", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642155516801044/IMG_3698.png");
new Splitter(1, 19, 19, 4, true, 359, new Requirements(), "711yws", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642240539537469/IMG_3699.png");
new Splitter(1, 20, 20, 3, false, 274, new Requirements(), "rcclvg", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642410824077374/IMG_3700.png");
new Splitter(1, 21, 21, 4, true, 400, new Requirements(), "xlzfs4", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642621944381500/IMG_3701.png");
new Splitter(1, 22, 22, 3, false, 316, new Requirements(), "ml9p8k", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642664642396160/IMG_3702.png");
new Splitter(1, 23, 23, 4, true, 352, new Requirements(), "fr6hvy", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642749241511966/IMG_3703.png");
new Splitter(1, 24, 24, 3, false, 314, new Requirements(), "xtjqtg", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642800634298448/IMG_3704.png");
new Splitter(1, 25, 25, 4, true, 370, new Requirements(), "nlds9c", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642896662892544/IMG_3705.png");
new Splitter(1, 26, 26, 4, false, 534, new Requirements(), "0yava1", "https://cdn.discordapp.com/attachments/1015664941421822002/1016642951910273044/IMG_3706.png");
new Splitter(1, 27, 27, 3, true, 346, new Requirements(), "7qc5sc", "https://cdn.discordapp.com/attachments/1015664941421822002/1016643022965981195/IMG_3707.png");
new Splitter(1, 28, 28, 3, false, 482, new Requirements(), "zvdwgq", "https://cdn.discordapp.com/attachments/1015664941421822002/1016643088028024862/IMG_3708.png");
new Splitter(1, 29, 29, 4, true, 560, new Requirements(), "aa9985", "https://cdn.discordapp.com/attachments/1015664941421822002/1016643159440228362/IMG_3709.png");
new Splitter(1, 30, 30, 3, false, 580, new Requirements(), "crsv1w", "https://cdn.discordapp.com/attachments/1015664941421822002/1016643223592116254/IMG_3710.png");
new Splitter(1, 31, 31, 4, true, 596, new Requirements(), "g0ggfy", "https://cdn.discordapp.com/attachments/1015664941421822002/1016643280370421770/IMG_3711.png");
new Splitter(1, 32, 32, 3, false, 590, new Requirements(), "3sgpqg", "https://cdn.discordapp.com/attachments/1015664941421822002/1016643332836970516/IMG_3712.png");

//// Factories
// Workshop/Furnace
new FactorySplitter("Manifold Even", "Workshop/Furnace", 1, Infinity, Infinity, 2, false, null, new Requirements(), "a7tjbr", "https://cdn.discordapp.com/attachments/1015688533467480074/1016645748412121118/IMG_3772.png");
new FactorySplitter("Manifold Even", "Workshop/Furnace", 1, Infinity, 5, Infinity, true, null, new Requirements(), "fzc0pg", "https://cdn.discordapp.com/attachments/1015688533467480074/1016646388202864701/IMG_3773.png");
new FactorySplitter("Manifold Odd", "Workshop/Furnace", 1, Infinity, Infinity, 3, true, null, new Requirements(), "rskn8s", "https://cdn.discordapp.com/attachments/1015688533467480074/1016646419098120212/IMG_3771.png");
new FactorySplitter("Manifold Odd", "Workshop/Furnace", 1, Infinity, 5, Infinity, true, null, new Requirements(), "8pq40j", "https://cdn.discordapp.com/attachments/1015688533467480074/1016646454690971648/IMG_3872.png");
// Machine Shop/Forge
new FactorySplitter("Manifold Even", "Machine Shop/Forge", 1, Infinity, Infinity, 6, false, null, new Requirements(), "y1was8", "https://cdn.discordapp.com/attachments/1015693706835279995/1016648749784776724/IMG_3736.png");
new FactorySplitter("Manifold Even", "Machine Shop/Forge", 1, Infinity, 13, Infinity, false, null, new Requirements(), "3mpzjk", "https://cdn.discordapp.com/attachments/1015693706835279995/1016648783787995226/IMG_3770.png");
new FactorySplitter("Manifold Odd", "Machine Shop/Forge", 1, Infinity, Infinity, 7, false, null, new Requirements(), "x7ah94", "https://cdn.discordapp.com/attachments/1015693706835279995/1016648829208109106/IMG_3738.png");
new FactorySplitter("1:2", "Machine Shop/Forge", 1, 2, 4, 4, false, 88, new Requirements(), "hsra5q", "https://cdn.discordapp.com/attachments/1015693706835279995/1016648915883405322/IMG_3753.png");
new FactorySplitter("1:3", "Machine Shop/Forge", 1, 3, 6, 5, false, 132, new Requirements(), "ctftmy", "https://cdn.discordapp.com/attachments/1015693706835279995/1016648983998898229/IMG_3754.png");
new FactorySplitter("1:4", "Machine Shop/Forge", 1, 4, 8, 4, false, 0, new Requirements(), "52tryk", "https://cdn.discordapp.com/attachments/1015693706835279995/1016649037769867274/IMG_3755.png");
new FactorySplitter("1:5", "Machine Shop/Forge", 1, 5, 10, 4, true, 0, new Requirements(), "8y3hcm", "https://cdn.discordapp.com/attachments/1015693706835279995/1073996040241430718/IMG_1228.png");
new FactorySplitter("1:6", "Machine Shop/Forge", 1, 6, 12, 4, false, 0, new Requirements(), "g48f26", "https://cdn.discordapp.com/attachments/1015693706835279995/1016649134809288734/IMG_3761.png");
new FactorySplitter("1:7", "Machine Shop/Forge", 1, 7, 14, 6, true, 0, new Requirements(), "vp3sqg", "https://cdn.discordapp.com/attachments/1015693706835279995/1016649180179083324/IMG_3763.png");
new FactorySplitter("1:8", "Machine Shop/Forge", 1, 8, 16, 5, true, 0, new Requirements(), "v3djmp", "https://cdn.discordapp.com/attachments/1015693706835279995/1016649222579298355/IMG_3765.png");
new FactorySplitter("1:9", "Machine Shop/Forge", 1, 9, 18, 5, true, 0, new Requirements(), "ptkms4", "https://cdn.discordapp.com/attachments/1015693706835279995/1016649289625247824/IMG_3767.png");
new FactorySplitter("1:10", "Machine Shop/Forge", 1, 10, 20, 5, true, 0, new Requirements(), "5xqzzn", "https://cdn.discordapp.com/attachments/1015693706835279995/1016649331970940968/IMG_3768.png");

// Clear all Ms
let _ = [...document.getElementsByClassName("m")].forEach(element => element.style.display = "none");

function buildChange() {
    // Remove all tables
    tables.innerHTML = "";
    
    // Show or remove N and M inputs
    if (["Belt Balancer", "Belt Splitter"].indexOf(build.value) >= 0 || build.options.item(build.selectedIndex).parentElement.label === "Factory Design") {
        [...document.getElementsByClassName("n")].forEach(element => element.style.display = "inline-block");
        [...document.getElementsByClassName("m")].forEach(element => element.style.display = "none");
        n.innerHTML = "";
        // <option selected style="display: none;"></option> 
        const option1 = document.createElement("option");
        option1.selected = true;
        option1.style.display = "none";
        n.appendChild(option1);
        // <option></option>
        const ns = (build.value === "Belt Balancer") ? Balancer.balancers : (build.value === "Belt Splitter") ? Splitter.splitters : FactorySplitter.factories[build.value];
        for (const nn in ns) {
            const option2 = document.createElement("option");
            option2.innerHTML = nn;
            n.appendChild(option2);
        }
    } else {
        [...document.getElementsByClassName("n")].forEach(element => element.style.display = "none");
        [...document.getElementsByClassName("m")].forEach(element => element.style.display = "none");
    }
}
build.addEventListener("change", buildChange);
buildChange();

n.addEventListener("change", () => {
    // Remove all tables
    tables.innerHTML = "";

    // Make M visible
    [...document.getElementsByClassName("m")].forEach(element => element.style.display = "inline-block");

    //// Add options to M
    m.innerHTML = "";
    // <option selected style="display: none;"></option> 
    const option1 = document.createElement("option");
    option1.selected = true;
    option1.style.display = "none";
    m.appendChild(option1);
    // <option></option>
    const ms = (build.value === "Belt Balancer") ? Balancer.balancers[n.value] : (build.value === "Belt Splitter") ? Splitter.splitters[n.value] : FactorySplitter.factories[build.value][n.value];
    for (const mm in ms) {
        const option2 = document.createElement("option");
        option2.innerHTML = mm;
        m.appendChild(option2);
    }
});

m.addEventListener("change", () => {
    tables.innerHTML = "";
    if (["Belt Balancer", "Belt Splitter"].indexOf(build.value) >= 0 || build.options.item(build.selectedIndex).parentElement.label === "Factory Design") {
        let buildName = (build.value === "Belt Balancer") ? Balancer.balancers : (build.value === "Belt Splitter") ? Splitter.splitters : FactorySplitter.factories[build.value];
        buildName[n.value][m.value].forEach(buildInfo => {
            let requirements = false;
            let table = `<table>
            <thead>
                <tr><th colspan="2">${buildInfo.name} ${buildInfo.category}<a href="${buildInfo.blueprint}" target="_blank"><img class="blueprint" src="./images/blueprint.png" alt="Blueprint"></a></th></tr>
                <tr><th colspan="2"><img src="${buildInfo.image}" alt="${buildInfo.name} ${buildInfo.category}"></th></tr>
            </thead>
            <tbody>
                <tr><th colspan="2">Properties</th></tr>
                <tr><td>Width</td><td>${buildInfo.width}</td></tr>
                <tr><td>Height</td><td>${buildInfo.height}</td></tr>
                <tr><td>Symmetrical</td><td>${(buildInfo.symmetrical) ? "Yes" : "No"}</td></tr>`;
            // Add Price
            if (buildInfo.price !== null) table += `<tr><td>Price:</td><td>${buildInfo.price}</td></tr>`;

            //// Add Requirements
            // Add belt speed range
            if (buildInfo.requirements.maxBeltSpeed !== 480 || buildInfo.requirements.minBeltSpeed !== 150) {
                if (!requirements) {
                    requirements = true;
                    table += '<tr><th colspan="2">Requirements</th></tr>';
                }
                table += `<tr><td>Belt speed:</td><td>${buildInfo.requirements.minBeltSpeed}-${buildInfo.requirements.maxBeltSpeed}</td></tr>`;
            }
            // Add tunnel length
            if (buildInfo.requirements.tunnelLength !== 4) {
                if (!requirements) {
                    requirements = true;
                    table += '<tr><th colspan="2">Requirements</th></tr>';
                }
                table += `<tr><td>Belt tunnel length:</td><td>${buildInfo.requirements.tunnelLength}</td></tr>`;
            }
            // Add robotic arm tier
            if (buildInfo.requirements.roboticArmTier !== 0) {
                if (!requirements) {
                    requirements = true;
                    table += '<tr><th colspan="2">Requirements</th></tr>';
                }
                table += `<tr><td>Robotic arm tier:</td><td>${buildInfo.requirements.roboticArmTier}</td></tr>`;
            }
            table += "</tbody></table>";
            tables.innerHTML += table;
        });
    }
});