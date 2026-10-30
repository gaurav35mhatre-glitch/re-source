import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation
    home: "Home",
    overview: "Overview",
    analyze: "Analyze Waste",
    plan: "Processing Plan",
    network: "Capacity Network",
    flow: "Material Flow",
    aggregation: "Aggregation",
    impact: "Impact",
    passport: "Material Passport",
    liveDemoBtn: "Live Demo (60s)",
    maharashtraIndia: "Maharashtra, India",
    demoFacility: "Demo Industrial Unit",

    // Hero
    heroBadge: "Maharashtra Circular Economy Hackathon • Secondary Material Recovery",
    heroTitle: "re'source",
    heroSub: "Don't just move waste. Prepare it for its next life.",
    heroDesc: "India has collection systems, transport networks and recycling facilities. But between a waste generator and a usable secondary raw material lies a fragmented gap: segregation, preprocessing, aggregation and quality preparation.",
    analyzeMyWaste: "Analyze My Waste",
    exploreNetwork: "Explore the Network",
    livePitchDemo: "60s Live Pitch Demo",

    // Standout Quote & Comparison
    standoutQuote: "« The truck isn't always the problem. The material is. »",
    standoutQuoteSub: "We don't optimize the truck's journey. We optimize the material's journey.",
    currentPathTitle: "Conventional Waste Flow",
    currentPathBadge: "CURRENT PATH",
    ourPathTitle: "re'source Protocol",
    ourPathBadge: "RE'SOURCE PATH",
    rejectedAtGate: "❌ Rejected at gate / Low-value landfilling",
    usableSecondaryMaterial: "✅ Usable Secondary Raw Material (Resource-Ready)",
    solveCondition: "« We solve the condition of the material before solving its destination. »",

    // Overview
    controlCenterTitle: "Material Flow Control Center",
    controlCenterSub: "Real-time physical preparation and preprocessing coordination layer for Maharashtra MSME clusters.",
    wasteReceived: "Waste Received",
    recoverable: "Recoverable",
    processingRequired: "Processing Required",
    resourceReady: "Resource Ready",
    wasteToResourceTitle: "Waste-to-Resource Conversion",
    conversionTooltip: "Prototype estimate — actual recovery depends on material composition and processing conditions.",
    wasteEntering: "Waste entering system",
    recoverableFraction: "Recoverable fraction",
    processedSecondary: "Processed secondary material",
    conversionRate: "Conversion to resource-ready material",
    barrierAnalysisTitle: "Recovery Barrier Analysis",
    barrierAnalysisSub: "Why is this post-industrial waste stream failing to enter secondary supply chains?",
    primaryBottleneck: "Primary Bottleneck:",
    recommendationLabel: "Recommendation:",

    // Analyze
    analyzeHeading: "What are you trying to recover?",
    analyzeSubtext: "The real bottleneck in Indian recycling happens before transportation. Upload a photo or enter stream details to diagnose physical recovery barriers.",
    tryDemoBtn: "⚡ Try Demo: 500 kg Mixed Plastic",
    tryDemoSub: "Pre-loads realistic post-industrial packaging waste from Rabale MIDC, Navi Mumbai.",
    enterWasteDetails: "Enter Waste Details",
    uploadWastePhoto: "Upload Waste Photo",
    wasteTypeLabel: "Waste Type / Primary Material *",
    quantityLabel: "Generation Quantity *",
    conditionLabel: "Current Physical Condition",
    moistureLabel: "Moisture Level",
    disposalLabel: "Current Disposal Method",
    locationLabel: "Generator Location",
    runDiagnosisBtn: "Run Material Diagnosis",
    diagnosisReport: "Diagnosis Report",
    estimatedBadge: "ESTIMATED (PROTOTYPE)",
    estComposition: "Estimated Composition:",
    whyDifficult: "Why this material is currently difficult to recover:",
    viewRecipeBtn: "View Pre-Processing Recipe",

    // Recipe
    recipeHeading: "BEFORE IT CAN MOVE, IT NEEDS TO CHANGE.",
    recipeSubtext: "Recyclers cannot ingest raw, mixed, contaminated waste. The 7-stage recipe below converts 500 kg of post-industrial plastic waste into uniform, high-density secondary flakes.",
    whyNeeded: "Why It Is Needed",
    requiredEquipment: "Required Equipment",
    processingCapacity: "Processing Node Capacity",
    assignedFacility: "Assigned Local Node",
    unitCost: "Estimated Unit Cost",
    prototypeDisclaimer: "All metrics represent an illustrative prototype estimate.",

    // Capacity Network
    capacityHeading: "Processing Capacity Network",
    capacitySubtext: "This is not just a directory of final recyclers. It maps the fragmented local infrastructure needed to perform sorting, decontamination, washing, and shredding.",
    capacityQuote: "« We don't necessarily need to build new infrastructure. We can coordinate underused infrastructure that already exists. »",
    allNodeTypes: "All Node Types",

    // Flow
    flowHeading: "Build My Material Path",
    flowSubtext: "Instead of dispatching a single truck directly to a distant recycler, the system plans a multi-stage physical processing journey that upgrades the material at local hubs.",
    flowQuote: "We optimize the MATERIAL, not just the TRUCK.",
    flowQuoteSub: "« The objective isn't simply to transport waste faster. It is to increase the value and usability of what is transported. »",
    conventionalApproach: "Conventional Approach",
    missingMiddleApproach: "re'source Protocol",
    materialJourneySummary: "Total Material Journey Audit",

    // Aggregation
    aggHeading: "Small streams become viable when aggregated.",
    aggSubtext: "In fragmented industrial zones like Rabale and Taloja, individual factories generate only 200–500 kg/month. By synchronizing localized collection and preprocessing, sub-scale scrap transforms into bulk industrial lots.",
    aggQuote: "« Small waste streams become a viable industrial input when aggregated. »",
    nearbyGenerators: "Nearby Fragmented MSME Generators:",
    consolidatedBatch: "Consolidated Batch Result",
    totalSynchronizedVolume: "Total Synchronized Volume",

    // Passport
    passportHeading: "Secondary Material Passport",
    passportSubtext: "Standardizing the physical specifications of post-industrial secondary materials so downstream compounders and extruders can procure with confidence.",
    passportDisclaimer: "« Prototype material passport — illustrative prototype estimate, not a regulatory certificate. »",
    batchIdLabel: "Batch Identification",
    specTitle: "RE'SOURCE SPECIFICATION",
    printSpecSheet: "Print Spec Sheet",

    // Impact
    impactHeading: "Material Recovery Impact",
    impactSubtext: "Transparent conversion auditing from industrial discards into qualified secondary raw materials.",
    wasteDiverted: "Waste Diverted",
    secondaryCreated: "Secondary Created",
    virginSubstituted: "Virgin Substituted",
    disposalResidue: "Sent to Disposal",
    viewMethodology: "View Methodology"
  },

  hi: {
    // Navigation
    home: "होम",
    overview: "कंट्रोल सेंटर",
    analyze: "कचरे का विश्लेषण",
    plan: "प्रोसेसिंग रेसिपी",
    network: "क्षमता नेटवर्क",
    flow: "मटेरियल जर्नी",
    aggregation: "एकत्रीकरण",
    impact: "पर्यावरणीय प्रभाव",
    passport: "मटेरियल पासपोर्ट",
    liveDemoBtn: "लाइव डेमो (60s)",
    maharashtraIndia: "महाराष्ट्र, भारत",
    demoFacility: "डेमो इंडस्ट्रियल यूनिट",

    // Hero
    heroBadge: "महाराष्ट्र सर्कुलर इकोनॉमी हैकथॉन • द्वितीयक कच्चा माल रिकवरी",
    heroTitle: "re'source (रिसोर्स)",
    heroSub: "सिर्फ कचरा मत ढोइए। इसे नए जीवन के लिए तैयार कीजिए।",
    heroDesc: "भारत के पास कचरा संग्रहण प्रणाली, परिवहन नेटवर्क और रिसाइकलिंग संयंत्र हैं। लेकिन कचरा उत्पादक और उपयोग करने योग्य द्वितीयक कच्चे माल के बीच छँटाई, पूर्व-प्रसंस्करण और एकत्रीकरण का अंतराल मौजूद है। re'source इसी भौतिक अंतराल को भरता है।",
    analyzeMyWaste: "मेरे कचरे का विश्लेषण करें",
    exploreNetwork: "नेटवर्क देखें",
    livePitchDemo: "60 सेकंड लाइव डेमो",

    // Standout Quote & Comparison
    standoutQuote: "« समस्या हमेशा ट्रक की नहीं होती। समस्या सामग्री की स्थिति की होती है। »",
    standoutQuoteSub: "हम ट्रक की यात्रा को नहीं, सामग्री की यात्रा को अनुकूलित करते हैं।",
    currentPathTitle: "पारंपरिक कचरा प्रवाह",
    currentPathBadge: "वर्तमान रास्ता",
    ourPathTitle: "re'source प्रोटोकॉल",
    ourPathBadge: "re'source रास्ता",
    rejectedAtGate: "❌ गेट पर अस्वीकृत / डंपिंग यार्ड में निस्तारण",
    usableSecondaryMaterial: "✅ उपयोग योग्य द्वितीयक कच्चा माल (संसाधन-तैयार)",
    solveCondition: "« हम सामग्री के गंतव्य से पहले उसकी स्थिति का समाधान करते हैं। »",

    // Overview
    controlCenterTitle: "मटेरियल फ्लो कंट्रोल सेंटर",
    controlCenterSub: "महाराष्ट्र एमएसएमई समूहों के लिए वास्तविक समय भौतिक तैयारी और पूर्व-प्रसंस्करण समन्वय।",
    wasteReceived: "प्राप्त कचरा",
    recoverable: "पुनर्प्राप्त करने योग्य",
    processingRequired: "आवश्यक चरण",
    resourceReady: "तैयार कच्चा माल",
    wasteToResourceTitle: "कचरे से संसाधन में रूपांतरण",
    conversionTooltip: "प्रोटोटाइप अनुमान — वास्तविक पुनर्प्राप्ति कचरे की संरचना और प्रसंस्करण स्थितियों पर निर्भर करती है।",
    wasteEntering: "प्रणाली में प्रवेश करने वाला कचरा",
    recoverableFraction: "पुनर्प्राप्ति योग्य भाग",
    processedSecondary: "प्रसंस्कृत द्वितीयक सामग्री",
    conversionRate: "संसाधन-तैयार सामग्री में रूपांतरण दर",
    barrierAnalysisTitle: "पुनर्प्राप्ति बाधा विश्लेषण",
    barrierAnalysisSub: "यह औद्योगिक कचरा रिसाइकलिंग आपूर्ति श्रृंखला में सीधे प्रवेश क्यों नहीं कर पा रहा है?",
    primaryBottleneck: "मुख्य बाधा:",
    recommendationLabel: "सिफ़ारिश:",

    // Analyze
    analyzeHeading: "आप किस सामग्री को पुनर्प्राप्त करना चाहते हैं?",
    analyzeSubtext: "भारतीय रिसाइकलिंग में मुख्य अड़चन परिवहन से पहले आती है। बाधाओं का निदान करने और पूर्व-प्रसंस्करण विधि तैयार करने के लिए विवरण दर्ज करें।",
    tryDemoBtn: "⚡ डेमो आज़माएँ: 500 किग्रा मिश्रित प्लास्टिक",
    tryDemoSub: "रबाले एमआईडीसी, नवी मुंबई का वास्तविक औद्योगिक प्लास्टिक कचरा लोड करता है।",
    enterWasteDetails: "कचरे का विवरण दर्ज करें",
    uploadWastePhoto: "कचरे की तस्वीर अपलोड करें",
    wasteTypeLabel: "कचरे का प्रकार / मुख्य सामग्री *",
    quantityLabel: "उत्पादन मात्रा *",
    conditionLabel: "वर्तमान भौतिक स्थिति",
    moistureLabel: "नमी का स्तर",
    disposalLabel: "वर्तमान निपटान विधि",
    locationLabel: "कारखाने का स्थान",
    runDiagnosisBtn: "सामग्री का निदान करें",
    diagnosisReport: "निदान रिपोर्ट",
    estimatedBadge: "अनुमानित (प्रोटोटाइप)",
    estComposition: "अनुमानित संरचना:",
    whyDifficult: "यह सामग्री वर्तमान में पुनर्प्राप्त करना कठिन क्यों है:",
    viewRecipeBtn: "प्री-प्रोसेसिंग रेसिपी देखें",

    // Recipe
    recipeHeading: "आगे बढ़ने से पहले, सामग्री का बदलना आवश्यक है।",
    recipeSubtext: "रिसाइकलर सीधे गंदा, मिश्रित कचरा नहीं ले सकते। नीचे दी गई 7-चरणीय रेसिपी 500 किग्रा कचरे को उच्च-गुणवत्ता वाले फ्लेक्स में बदलती है।",
    whyNeeded: "यह क्यों आवश्यक है",
    requiredEquipment: "आवश्यक उपकरण",
    processingCapacity: "संसाधन केंद्र क्षमता",
    assignedFacility: "स्थानीय केंद्र",
    unitCost: "अनुमानित इकाई लागत",
    prototypeDisclaimer: "सभी आंकड़े सांकेतिक प्रोटोटाइप अनुमान हैं।",

    // Capacity Network
    capacityHeading: "प्रसंस्करण क्षमता नेटवर्क",
    capacitySubtext: "यह केवल रिसाइकलरों की सूची नहीं है। यह स्थानीय छंटाई, धुलाई, सुखाने और श्रेडिंग सुविधाओं का मानचित्र है।",
    capacityQuote: "« हमें नया बुनियादी ढांचा बनाने की आवश्यकता नहीं है। हम मौजूदा कम उपयोग किए गए बुनियादी ढांचे का समन्वय कर सकते हैं। »",
    allNodeTypes: "सभी केंद्र प्रकार",

    // Flow
    flowHeading: "मटेरियल का रास्ता तैयार करें",
    flowSubtext: "सीधे दूर स्थित रिसाइकलर को ट्रक भेजने के बजाय, प्रणाली स्थानीय केंद्रों पर सामग्री को उन्नत करने वाला बहु-चरणीय मार्ग बनाती है।",
    flowQuote: "हम सामग्री को अनुकूलित करते हैं, केवल ट्रक को नहीं।",
    flowQuoteSub: "« उद्देश्य केवल कचरे को तेजी से पहुंचाना नहीं है, बल्कि जो ले जाया जा रहा है उसका मूल्य और उपयोगिता बढ़ाना है। »",
    conventionalApproach: "पारंपरिक दृष्टिकोण",
    missingMiddleApproach: "re'source प्रोटोकॉल",
    materialJourneySummary: "सामग्री यात्रा का संपूर्ण ऑडिट",

    // Aggregation
    aggHeading: "छोटे कचरा प्रवाह एक साथ आने पर ही आर्थिक रूप से व्यवहार्य बनते हैं।",
    aggSubtext: "रबाले और तलोजा जैसे क्षेत्रों में कारखाने केवल 200–500 किग्रा कचरा उत्पन्न करते हैं। एकत्रीकरण द्वारा यह औद्योगिक लॉट बन जाता है।",
    aggQuote: "« जब छोटे अपशिष्ट प्रवाह एकत्रित होते हैं, तो वे एक व्यवहार्य औद्योगिक इनपुट बन जाते हैं। »",
    nearbyGenerators: "आस-पास के एमएसएमई कारखाने:",
    consolidatedBatch: "एकत्रित बैच परिणाम",
    totalSynchronizedVolume: "कुल समकालिक मात्रा",

    // Passport
    passportHeading: "द्वितीयक सामग्री पासपोर्ट (Material Passport)",
    passportSubtext: "द्वितीयक सामग्रियों के तकनीकी मानकों का प्रमाणीकरण ताकि डाउनस्ट्रीम निर्माता विश्वास के साथ खरीद सकें।",
    passportDisclaimer: "« प्रोटोटाइप सामग्री पासपोर्ट — सांकेतिक प्रोटोटाइप अनुमान, कोई वैधानिक प्रमाणपत्र नहीं। »",
    batchIdLabel: "बैच पहचान संख्या",
    specTitle: "RE'SOURCE तकनीकी विशिष्टता",
    printSpecSheet: "विशिष्टता पत्रक प्रिंट करें",

    // Impact
    impactHeading: "सामग्री पुनर्प्राप्ति प्रभाव",
    impactSubtext: "औद्योगिक कचरे से प्रमाणित द्वितीयक कच्चे माल में पारदर्शी रूपांतरण ऑडिट।",
    wasteDiverted: "कचरा डायवर्ट किया",
    secondaryCreated: "द्वितीयक माल बना",
    virginSubstituted: "प्राकृतिक कच्चे माल की बचत",
    disposalResidue: "निस्तारित अवशेष",
    viewMethodology: "गणना पद्धति देखें"
  },

  mr: {
    // Navigation
    home: "मुख्यपृष्ठ",
    overview: "कंट्रोल सेंटर",
    analyze: "कचऱ्याचे विश्लेषण",
    plan: "प्रोसेसिंग कृती",
    network: "क्षमता नेटवर्क",
    flow: "मटेरियल प्रवास",
    aggregation: "एकत्रीकरण",
    impact: "पर्यावरणीय परिणाम",
    passport: "मटेरियल पासपोर्ट",
    liveDemoBtn: "लाइव्ह डेमो (60s)",
    maharashtraIndia: "महाराष्ट्र, भारत",
    demoFacility: "डेमो इंडस्ट्रियल युनिट",

    // Hero
    heroBadge: "महाराष्ट्र सर्कुलर इकॉनॉमी हॅकाथॉन • दुय्यम कच्चा माल पुनर्प्राप्ती",
    heroTitle: "re'source (रिसोर्स)",
    heroSub: "केवळ कचरा वाहून नेऊ नका. त्याला पुढील जीवनासाठी तयार करा.",
    heroDesc: "भारतात संकलन प्रणाली, वाहतूक नेटवर्क आणि पुनर्वापर प्रकल्प आहेत. परंतु कचरा निर्माण करणारा कारखाना आणि वापरण्याजोगा दुय्यम कच्चा माल यांमध्ये वर्गीकरण आणि पूर्व-प्रक्रियेचा मोठा दुवा गहाळ आहे. re'source हाच भौतिक दुवा जोडतो.",
    analyzeMyWaste: "माझ्या कचऱ्याचे विश्लेषण करा",
    exploreNetwork: "नेटवर्क पाहा",
    livePitchDemo: "60 सेकंद थेट डेमो",

    // Standout Quote & Comparison
    standoutQuote: "« अडचण नेहमी ट्रकची नसते. अडचण सामग्रीच्या स्थितीची असते. »",
    standoutQuoteSub: "आम्ही ट्रकचा प्रवास नाही, तर सामग्रीचा प्रवास कार्यक्षम करतो.",
    currentPathTitle: "पारंपरिक कचरा वहन",
    currentPathBadge: "सध्याचा मार्ग",
    ourPathTitle: "re'source कार्यपद्धती",
    ourPathBadge: "re'source मार्ग",
    rejectedAtGate: "❌ कारखान्याच्या गेटवर नाकारले / डंपिंग यार्डमध्ये फेकले",
    usableSecondaryMaterial: "✅ वापरण्याजोगा दुय्यम कच्चा माल (संसाधन-सज्ज)",
    solveCondition: "« आम्ही सामग्रीचे गंतव्य ठरवण्यापूर्वी तिच्या स्थितीचे निराकरण करतो. »",

    // Overview
    controlCenterTitle: "मटेरियल फ्लो कंट्रोल सेंटर",
    controlCenterSub: "महाराष्ट्रातील एमएसएमई क्लस्टरसाठी रिअल-टाइम भौतिक तयारी आणि पूर्व-प्रक्रिया समन्वय प्रणाली.",
    wasteReceived: "प्राप्त कचरा",
    recoverable: "पुनर्प्राप्ती योग्य",
    processingRequired: "आवश्यक टप्पे",
    resourceReady: "तयार कच्चा माल",
    wasteToResourceTitle: "कचऱ्यातून संसाधनात रूपांतरण",
    conversionTooltip: "प्रोटोटाइप अंदाज — प्रत्यक्ष पुनर्प्राप्ती सामग्रीच्या गुणधर्मांवर अवलंबून असते.",
    wasteEntering: "प्रणालीत आलेला कचरा",
    recoverableFraction: "पुनर्प्राप्ती योग्य भाग",
    processedSecondary: "प्रक्रिया केलेली दुय्यम सामग्री",
    conversionRate: "कच्च्या मालात रूपांतरण दर",
    barrierAnalysisTitle: "पुनर्प्राप्ती अडथळा विश्लेषण",
    barrierAnalysisSub: "हा औद्योगिक कचरा थेट पुनर्वापर साखळीत का जाऊ शकत नाही?",
    primaryBottleneck: "मुख्य अडथळा:",
    recommendationLabel: "शिफारस:",

    // Analyze
    analyzeHeading: "तुम्हाला कोणत्या सामग्रीची पुनर्प्राप्ती करायची आहे?",
    analyzeSubtext: "भारतीय पुनर्वापर प्रक्रियेतील खरी अडचण वाहतुकीपूर्वीच असते. अडथळ्यांचे निदान करण्यासाठी कचऱ्याचे तपशील प्रविष्ट करा.",
    tryDemoBtn: "⚡ डेमो पाहा: 500 किलो मिश्रित प्लास्टिक",
    tryDemoSub: "रबाळे एमआयडीसी, नवी मुंबई येथील प्रत्यक्ष औद्योगिक प्लास्टिक कचरा लोड करतो.",
    enterWasteDetails: "कचऱ्याचा तपशील प्रविष्ट करा",
    uploadWastePhoto: "कचऱ्याचा फोटो अपलोड करा",
    wasteTypeLabel: "कचऱ्याचा प्रकार / मुख्य घटक *",
    quantityLabel: "उत्पादन प्रमाण *",
    conditionLabel: "सध्याची भौतिक स्थिती",
    moistureLabel: "ओलाव्याचे प्रमाण",
    disposalLabel: "सध्याची विल्हेवाट पद्धत",
    locationLabel: "कारखान्याचे ठिकाण",
    runDiagnosisBtn: "सामग्रीचे निदान करा",
    diagnosisReport: "निदान अहवाल",
    estimatedBadge: "अंदाजित (प्रोटोटाइप)",
    estComposition: "अंदाजित रचना:",
    whyDifficult: "या सामग्रीची पुनर्प्राप्ती करणे सध्या कठीण का आहे:",
    viewRecipeBtn: "प्री-प्रोसेसिंग कृती पाहा",

    // Recipe
    recipeHeading: "सामग्री हलवण्यापूर्वी तिचे स्वरूप बदलणे आवश्यक आहे.",
    recipeSubtext: "रिसायकलर्स थेट घाण, मिश्रित कचरा स्वीकारू शकत नाहीत. खालील 7-टप्प्यांची कृती 500 किलो कचऱ्याला शुद्ध फ्लेक्समध्ये बदलते.",
    whyNeeded: "हे का आवश्यक आहे",
    requiredEquipment: "आवश्यक यंत्रसामग्री",
    processingCapacity: "केंद्राची क्षमता",
    assignedFacility: "स्थानिक केंद्र",
    unitCost: "अंदाजित प्रति किलो खर्च",
    prototypeDisclaimer: "सर्व आकडेवारी केवळ प्रात्यक्षिक अंदाज आहे.",

    // Capacity Network
    capacityHeading: "प्रक्रिया क्षमता नेटवर्क",
    capacitySubtext: "हे केवळ अंतिम रिसायकलर्सची यादी नाही. स्थानिक पातळीवरील वर्गीकरण, धुलाई आणि बारीक करण्याच्या क्षमतेचा हा नकाशा आहे.",
    capacityQuote: "« आपल्याला नवीन पायाभूत सुविधा उभारण्याची गरज नाही. आपण सध्याच्या कमी वापरल्या जाणाऱ्या सुविधांचे समन्वय साधू शकतो. »",
    allNodeTypes: "सर्व प्रकारची केंद्रे",

    // Flow
    flowHeading: "सामग्रीचा मार्ग तयार करा",
    flowSubtext: "थेट दूरच्या रिसायकलर्सकडे ट्रक पाठवण्याऐवजी, स्थानिक केंद्रांवर सामग्रीचे मूल्यवर्धन करणारा बहु-टप्प्यांचा मार्ग तयार केला जातो.",
    flowQuote: "आम्ही सामग्री कार्यक्षम करतो, केवळ ट्रक नाही.",
    flowQuoteSub: "« उद्दिष्ट केवळ कचरा जलद नेणे नाही, तर जे नेले जात आहे त्याचे औद्योगिक मूल्य वाढवणे आहे. »",
    conventionalApproach: "पारंपरिक पद्धत",
    missingMiddleApproach: "re'source कार्यपद्धती",
    materialJourneySummary: "सामग्री प्रवासाचे संपूर्ण ऑडिट",

    // Aggregation
    aggHeading: "लहान कचरा प्रवाह एकत्र आल्यावरच आर्थिकदृष्ट्या व्यवहार्य ठरतात.",
    aggSubtext: "रबाळे आणि तळोजासारख्या भागात कारखाने केवळ 200–500 किलो कचरा निर्माण करतात. एकत्रीकरणाने त्याचे मोठ्या लॉटमध्ये रूपांतर होते.",
    aggQuote: "« जेव्हा लहान कचरा प्रवाह एकत्रित होतात, तेव्हा ते एक व्यवहार्य औद्योगिक इनपुट बनतात. »",
    nearbyGenerators: "परिसरातील एमएसएमई कारखाने:",
    consolidatedBatch: "एकत्रित बॅच निकाल",
    totalSynchronizedVolume: "एकूण एकत्रित प्रमाण",

    // Passport
    passportHeading: "दुय्यम सामग्री पासपोर्ट (Material Passport)",
    passportSubtext: "प्रक्रिया केलेल्या दुय्यम कच्च्या मालाचे भौतिक प्रमाणीकरण, जेणेकरून पुढील उत्पादक खात्रीने खरेदी करू शकतील.",
    passportDisclaimer: "« प्रोटोटाइप मटेरियल पासपोर्ट — प्रात्यक्षिक अंदाज, कोणतेही कायदेशीर प्रमाणपत्र नाही. »",
    batchIdLabel: "बॅच ओळख क्रमांक",
    specTitle: "RE'SOURCE तांत्रिक तपशील",
    printSpecSheet: "तपशील पत्रक प्रिंट करा",

    // Impact
    impactHeading: "सामग्री पुनर्प्राप्ती प्रभाव",
    impactSubtext: "कचऱ्यापासून दुय्यम कच्च्या मालामध्ये झालेल्या प्रत्यक्ष रूपांतरणाचे पारदर्शक ऑडिट.",
    wasteDiverted: "डंपिंगपासून वाचवलेला कचरा",
    secondaryCreated: "तयार दुय्यम माल",
    virginSubstituted: "कच्च्या मालाची बचत",
    disposalResidue: "टाकाऊ अवशेष",
    viewMethodology: "पद्धती पाहा"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('missing_middle_lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('missing_middle_lang', newLang);
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
