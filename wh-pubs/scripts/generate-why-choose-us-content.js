// Content for updating Why Choose Us sections in Sanity Studio
// This provides the exact data structure needed for each pub

const whyChooseUsContent = {
  "the-little-brown-jug": {
    "ID": "cb4f1a9b-12ab-4047-89ee-e5b505ddd56d",
    "name": "The Little Brown Jug",
    "content": {
      "reason1": {
        "title": "TIKI HUTS",
        "description": "Unique, Instagram-worthy dining experience"
      },
      "reason2": {
        "title": "PLAYGROUND SMOKEHOUSE", 
        "description": "Appeals to families and BBQ enthusiasts"
      },
      "reason3": {
        "title": "RETRACTABLE ROOF",
        "description": "Shows weather flexibility and modern amenities"
      }
    }
  },
  "the-bull-otford": {
    "ID": "0018f66b-db31-4ac1-9898-0d9efe4d8ea8",
    "name": "The Bull Otford",
    "content": {
      "reason1": {
        "title": "FIREPLACES",
        "description": "Creates cozy, intimate atmosphere"
      },
      "reason2": {
        "title": "GARDEN",
        "description": "Perfect for outdoor dining and drinks"
      },
      "reason3": {
        "title": "BAR",
        "description": "Core pub experience with character"
      }
    }
  },
  "the-cricketers-inn": {
    "ID": "08a248bc-2fdc-481d-b621-25827d961d50",
    "name": "The Cricketers Inn",
    "content": {
      "reason1": {
        "title": "ORANGERY",
        "description": "Elegant, distinctive dining space"
      },
      "reason2": {
        "title": "BBQ AND OUTSIDE AREA",
        "description": "Great for casual outdoor dining"
      },
      "reason3": {
        "title": "BAR AREA",
        "description": "Traditional pub atmosphere"
      }
    }
  },
  "the-chaser-inn": {
    "ID": "317df0e6-b219-4006-8bb9-130a92cb473f",
    "name": "The Chaser Inn",
    "content": {
      "reason1": {
        "title": "THE CHURCH ROOM",
        "description": "Intriguing, unique private/function space"
      },
      "reason2": {
        "title": "COURTYARD",
        "description": "Charming outdoor dining area"
      },
      "reason3": {
        "title": "GARDEN",
        "description": "Relaxed outdoor setting"
      }
    }
  },
  "the-rose-and-crown": {
    "ID": "8359da89-c7d5-4269-817d-a3070cef84e4",
    "name": "The Rose and Crown",
    "content": {
      "reason1": {
        "title": "TIKI HUTS",
        "description": "Fun, tropical dining experience"
      },
      "reason2": {
        "title": "KIDS AREA",
        "description": "Strong family appeal"
      },
      "reason3": {
        "title": "PIZZA SHACK",
        "description": "Distinctive casual food offering"
      }
    }
  }
};

// Generate manual update instructions
console.log("=".repeat(80));
console.log("WHY CHOOSE US CONTENT UPDATE GUIDE");
console.log("=".repeat(80));
console.log("\nTo update each pub's Why Choose Us section in Sanity Studio:");
console.log("1. Go to https://whpubs.sanity.studio");
console.log("2. Navigate to 'Pubs' in the left sidebar");
console.log("3. Select each pub and update the 'Why Choose Us - Three Reasons' field");
console.log("4. Copy the content exactly as shown below for each pub\n");

Object.keys(whyChooseUsContent).forEach(slug => {
  const pub = whyChooseUsContent[slug];
  console.log("-".repeat(60));
  console.log(`PUB: ${pub.name.toUpperCase()}`);
  console.log(`ID: ${pub.ID}`);
  console.log("-".repeat(60));
  
  console.log("\nReason 1:");
  console.log(`  Title: ${pub.content.reason1.title}`);
  console.log(`  Description: ${pub.content.reason1.description}`);
  
  console.log("\nReason 2:");
  console.log(`  Title: ${pub.content.reason2.title}`);
  console.log(`  Description: ${pub.content.reason2.description}`);
  
  console.log("\nReason 3:");
  console.log(`  Title: ${pub.content.reason3.title}`);
  console.log(`  Description: ${pub.content.reason3.description}`);
  
  console.log("\n");
});

console.log("=".repeat(80));
console.log("IMPORTANT: After updating all pubs, remember to:");
console.log("- Save each pub document");
console.log("- Deploy any frontend changes if needed");
console.log("- Test the Why Choose Us sections on each pub page");
console.log("=".repeat(80));

// Also generate patches for GROQ mutations if token becomes available
console.log("\n\nFOR AUTOMATED UPDATE (when auth token is available):");
console.log("=".repeat(60));

Object.keys(whyChooseUsContent).forEach(slug => {
  const pub = whyChooseUsContent[slug];
  console.log(`\n// Patch for ${pub.name}`);
  console.log(`client.patch('${pub.ID}')`);
  console.log(`  .set({ whyChooseUs: ${JSON.stringify(pub.content, null, 4)} })`);
  console.log(`  .commit();`);
});

export { whyChooseUsContent };