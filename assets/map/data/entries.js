/*
=========================================================
M.A.P. MASTER LIFE DATA — SCHEMA v1.0.0
=========================================================
One source of truth for My Life, My Mission and My M.A.P.

This browser-ready data bundle is compatible with the
current GitHub Pages site. A future API or database can
return the same structure without redesigning the pages.
=========================================================
*/

window.MAP_DATA={
  "schemaVersion":"1.0.0",

  "meta":{
    "name":"M.A.P. Master Life Data",
    "description":"Single source of truth for My Life, My Mission and My M.A.P.",
    "canonicalBase":"https://champagne247.github.io/Champagne247",
    "updatedAt":"2026-09-14T12:15:00-05:00"
  },

  "owner":{
    "id":"christopher-champagne",
    "name":"Christopher Champagne",
    "handle":"@Champagne247",
    "location":"Leesville, Louisiana",

    "brandLines":[
      "My Life. My Mission. My M.A.P.",
      "The M begins with ME.",
      "Live once. Capture once. Connect everywhere."
    ]
  },

  "categories":{
    "family":{
      "id":"family",
      "label":"Family",
      "icon":"❤️",
      "image":"/Champagne247/assets/map/Hero/hero-family.webp"
    },

    "fitness":{
      "id":"fitness",
      "label":"Fitness",
      "icon":"💪",
      "image":"/Champagne247/assets/map/Hero/hero-fitness.webp"
    },

    "freeflight":{
      "id":"freeflight",
      "label":"Freeflight",
      "icon":"✈️",
      "image":"/Champagne247/assets/map/Hero/hero-freeflight.webp"
    },

    "professional":{
      "id":"professional",
      "label":"Professional",
      "icon":"🔧",
      "image":"/Champagne247/assets/map/Hero/hero-professional.webp"
    },

    "creator":{
      "id":"creator",
      "label":"Creator",
      "icon":"🎨",
      "image":"/Champagne247/assets/map/Hero/hero-creator.webp"
    },

    "travel":{
      "id":"travel",
      "label":"Food & Travel",
      "icon":"🌎",
      "image":"/Champagne247/assets/map/Hero/hero-travel.webp"
    }
  },

  "statuses":{
    "now":{
      "label":"Happening Now",
      "color":"#52f2a8"
    },

    "progress":{
      "label":"In Progress",
      "color":"#2f9bff"
    },

    "next":{
      "label":"Next",
      "color":"#ffd43b"
    },

    "goal":{
      "label":"Goal",
      "color":"#ff8c2f"
    },

    "done":{
      "label":"Experienced",
      "color":"#a855f7"
    }
  },

  "entries":[

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"gym-all-hours-2026-09-14",
      "authorId":"christopher-champagne",

      "title":"Gym Time • All Hours Fitness Leesville",

      "story":"Breakfast and planning are complete. Now it’s gym time at All Hours Fitness in Leesville.\n\nStarting today at 185.8 pounds, headphones on, “Hold On” playing, and continuing the mission—building controlled strength, functional mobility and the physical capacity to live everything on my M.A.P.\n\nThe M begins with MY choices. Accountability means doing what I said I would do.",

      "status":"now",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-09-14T10:34:00-05:00",
      "updatedAt":"2026-09-14T10:34:00-05:00",
      "eventAt":"2026-09-14T10:34:00-05:00",

      "datetime":"2026-09-14T10:34:00-05:00",
      "displayDate":"September 14, 2026 • Happening now",

      "primaryCategory":"fitness",

      "categories":[
        "fitness",
        "creator"
      ],

      "locations":[
        {
          "id":"gym-all-hours-2026-09-14-location-1",
          "label":"All Hours Fitness • Leesville, Louisiana",
          "lat":31.1437,
          "lng":-93.261,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"gym-all-hours-2026-09-14-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Life/2026-09-14-gym/gym-selfie.jpg",
          "caption":"Gym time • All Hours Fitness Leesville",
          "alt":"Gym time • All Hours Fitness Leesville"
        },

        {
          "id":"gym-all-hours-2026-09-14-media-2",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Life/2026-09-14-gym/weight-185-8.jpg",
          "caption":"185.8 lbs • Accountability marker",
          "alt":"185.8 lbs • Accountability marker"
        },

        {
          "id":"gym-all-hours-2026-09-14-media-3",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Life/2026-09-14-gym/hold-on-playlist.jpg",
          "caption":"“Hold On” • Mission mindset",
          "alt":"“Hold On” • Mission mindset"
        }
      ],

      "hashtags":[
        "MyLife",
        "MyMission",
        "MyMAP",
        "Fitness",
        "AllHoursFitness",
        "Leesville",
        "CertifiedMONSTER",
        "Accountability"
      ],

      "links":[
        {
          "label":"Explore Fitness on My M.A.P. →",
          "url":"/Champagne247/pages/map/explore/?path=fitness"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"content",
        "title":"Fitness accountability content",
        "description":"Document strength, mobility, bodyweight progress and the accountability system publicly.",

        "actions":[
          "Fitness content",
          "Accountability program",
          "Training partnerships",
          "Certified MONSTER brand"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "x"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"map-build-2026-09-14",
      "authorId":"christopher-champagne",

      "title":"Building and Living the M.A.P.",

      "story":"The day started over breakfast with a dream-driven breakthrough.\n\nThe ALL page should work like a living timeline: whatever I am doing now rises to the top, while every entry connects across the different paths it touches.\n\nToday isn’t preparation for the project. Today is the project.",

      "status":"progress",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-09-14T09:00:00-05:00",
      "updatedAt":"2026-09-14T09:00:00-05:00",
      "eventAt":"2026-09-14T09:00:00-05:00",

      "datetime":"2026-09-14T09:00:00-05:00",
      "displayDate":"September 14, 2026",

      "primaryCategory":"travel",

      "categories":[
        "travel",
        "fitness",
        "professional",
        "creator"
      ],

      "locations":[
        {
          "id":"map-build-2026-09-14-location-1",
          "label":"Breakfast and M.A.P. planning • Leesville",
          "lat":31.1435,
          "lng":-93.261,
          "precision":"exact",
          "visibility":"public"
        },

        {
          "id":"map-build-2026-09-14-location-2",
          "label":"Mission Control • Leesville",
          "lat":31.15,
          "lng":-93.25,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"map-build-2026-09-14-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Hero/hero-all.webp",
          "caption":"Fuel → Fitness → Business → Build",
          "alt":"Fuel → Fitness → Business → Build"
        }
      ],

      "hashtags":[
        "MyLife",
        "MyMission",
        "MyMAP",
        "NOVA",
        "Accountability"
      ],

      "links":[
        {
          "label":"Explore My M.A.P. →",
          "url":"/Champagne247/pages/map/explore/"
        },

        {
          "label":"Create Your Own M.A.P. →",
          "url":"/Champagne247/pages/map/create/"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"product",
        "title":"Mission Alignment Protocol",
        "description":"A living vision, planning and accountability system that helps people turn ideas into visible missions and measurable actions.",

        "actions":[
          "Free test group",
          "Paid user tiers",
          "Guided M.A.P. creation",
          "N.O.V.A. integration"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "youtube",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"lookout-24-minute-flight",
      "authorId":"christopher-champagne",

      "title":"24-Minute Mountain Flight",

      "story":"Ridge soared and thermalled for approximately 24 minutes, smashing my previous mountain-flight personal best.",

      "status":"done",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-08-23T15:00:00-04:00",
      "updatedAt":"2026-08-23T15:00:00-04:00",
      "eventAt":"2026-08-23T15:00:00-04:00",

      "datetime":"2026-08-23T15:00:00-04:00",
      "displayDate":"August 2026",

      "primaryCategory":"freeflight",

      "categories":[
        "freeflight",
        "fitness",
        "creator",
        "travel"
      ],

      "locations":[
        {
          "id":"lookout-24-minute-flight-location-1",
          "label":"Lookout Mountain Flight Park • Rising Fawn, Georgia",
          "lat":34.836,
          "lng":-85.486,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"lookout-24-minute-flight-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Hero/hero-freeflight.webp",
          "caption":"Looking4Lift • Lookout Mountain",
          "alt":"Looking4Lift • Lookout Mountain"
        }
      ],

      "hashtags":[
        "Looking4Lift",
        "Freeflight",
        "HangGliding",
        "LookoutMountain"
      ],

      "links":[
        {
          "label":"Explore Freeflight →",
          "url":"/Champagne247/pages/map/explore/?path=freeflight"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"experience",
        "title":"Looking4Lift and Freeflight Experience",
        "description":"Freeflight content, VR experiences, events, partnerships and community growth.",

        "actions":[
          "Video content",
          "VR experience",
          "Events",
          "Sponsorships"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "youtube",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"lookout-100-flights",
      "authorId":"christopher-champagne",

      "title":"100 Flights",

      "story":"Crossed the 100-flight milestone during Wingman Weekend at Lookout Mountain Flight Park.",

      "status":"done",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-08-22T15:00:00-04:00",
      "updatedAt":"2026-08-22T15:00:00-04:00",
      "eventAt":"2026-08-22T15:00:00-04:00",

      "datetime":"2026-08-22T15:00:00-04:00",
      "displayDate":"August 2026",

      "primaryCategory":"freeflight",

      "categories":[
        "freeflight",
        "fitness",
        "creator",
        "travel"
      ],

      "locations":[
        {
          "id":"lookout-100-flights-location-1",
          "label":"Lookout Mountain Flight Park • Rising Fawn, Georgia",
          "lat":34.835,
          "lng":-85.487,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"lookout-100-flights-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Hero/hero-freeflight.webp",
          "caption":"100 flights and still Looking4Lift",
          "alt":"100 flights and still Looking4Lift"
        }
      ],

      "hashtags":[
        "Looking4Lift",
        "100Flights",
        "HangGliding",
        "WingmanWeekend"
      ],

      "links":[
        {
          "label":"Explore Freeflight →",
          "url":"/Champagne247/pages/map/explore/?path=freeflight"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"content",
        "title":"Freeflight milestone storytelling",
        "description":"Use milestones to build community, promote freeflight and create valuable aviation content.",

        "actions":[
          "Milestone video",
          "Sponsor outreach",
          "Freeflight promotion"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "youtube",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"looking4lift",
      "authorId":"christopher-champagne",

      "title":"Looking4Lift",

      "story":"Freeflight, hang gliding, VR experiences, travel, education, content and community.",

      "status":"progress",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-08-05T09:00:00-05:00",
      "updatedAt":"2026-08-05T09:00:00-05:00",
      "eventAt":"2026-08-05T09:00:00-05:00",

      "datetime":"2026-08-05T09:00:00-05:00",
      "displayDate":"Building now",

      "primaryCategory":"freeflight",

      "categories":[
        "freeflight",
        "creator",
        "professional",
        "travel"
      ],

      "locations":[
        {
          "id":"looking4lift-location-1",
          "label":"Looking4Lift • United States",
          "lat":35.5,
          "lng":-92.5,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"looking4lift-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Hero/hero-freeflight.webp",
          "caption":"Looking4Lift",
          "alt":"Looking4Lift"
        }
      ],

      "hashtags":[
        "Looking4Lift",
        "Freeflight",
        "HangGliding",
        "VR"
      ],

      "links":[
        {
          "label":"Explore Freeflight →",
          "url":"/Champagne247/pages/map/explore/?path=freeflight"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"brand",
        "title":"Looking4Lift",
        "description":"A freeflight content, experience and community brand.",

        "actions":[
          "VR experiences",
          "YouTube",
          "Events",
          "Merchandise",
          "Partnerships"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "youtube",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"ccs-technical-services",
      "authorId":"christopher-champagne",

      "title":"CC'S Technical Services",

      "story":"HVAC, electrical, refrigeration, security, automation, IT and technical services. Real work, real solutions and an income-producing path on the M.A.P.",

      "status":"progress",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-06-25T09:00:00-05:00",
      "updatedAt":"2026-06-25T09:00:00-05:00",
      "eventAt":"2026-06-25T09:00:00-05:00",

      "datetime":"2026-06-25T09:00:00-05:00",
      "displayDate":"Building now",

      "primaryCategory":"professional",

      "categories":[
        "professional",
        "creator"
      ],

      "locations":[
        {
          "id":"ccs-technical-services-location-1",
          "label":"CC'S Technical Services • Leesville, Louisiana",
          "lat":31.1435,
          "lng":-93.261,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"ccs-technical-services-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Hero/hero-professional.webp",
          "caption":"Build. Solve. Get it done.",
          "alt":"Build. Solve. Get it done."
        }
      ],

      "hashtags":[
        "CCsTechnicalServices",
        "HVAC",
        "Electrical",
        "Refrigeration",
        "Leesville"
      ],

      "links":[
        {
          "label":"CC'S Technical Services →",
          "url":"https://ccstechnicalservices.com/"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"service",
        "title":"Technical service revenue",
        "description":"Local HVAC, electrical, refrigeration, security and technology services.",

        "actions":[
          "Service calls",
          "Installations",
          "Maintenance",
          "Consulting"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"certified-monster",
      "authorId":"christopher-champagne",

      "title":"Certified MONSTER • Strength & Mobility",

      "story":"Controlled strength, functional mobility, conditioning and lifelong physical capability.",

      "status":"progress",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2026-03-01T06:00:00-06:00",
      "updatedAt":"2026-03-01T06:00:00-06:00",
      "eventAt":"2026-03-01T06:00:00-06:00",

      "datetime":"2026-03-01T06:00:00-06:00",
      "displayDate":"Ongoing",

      "primaryCategory":"fitness",

      "categories":[
        "fitness",
        "creator"
      ],

      "locations":[
        {
          "id":"certified-monster-location-1",
          "label":"Louisiana",
          "lat":31.2,
          "lng":-93.2,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"certified-monster-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Hero/hero-fitness.webp",
          "caption":"Strength for life",
          "alt":"Strength for life"
        }
      ],

      "hashtags":[
        "CertifiedMONSTER",
        "Fitness",
        "Strength",
        "Mobility"
      ],

      "links":[],

      "opportunity":{
        "active":true,
        "type":"brand",
        "title":"Certified MONSTER",
        "description":"Fitness, performance, accountability, coaching and branded content.",

        "actions":[
          "Training content",
          "Coaching",
          "Programs",
          "Merchandise"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "youtube",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    {
      "schemaVersion":"1.0.0",
      "type":"life-entry",
      "id":"dockweiler-first-flight",
      "authorId":"christopher-champagne",

      "title":"Dockweiler • First Day of Flying Lessons",

      "story":"Where it started. A full day learning to hang glide on the dunes at Dockweiler Beach—10 flights on my first day.",

      "status":"done",
      "lifecycle":"published",
      "visibility":"public",

      "createdAt":"2015-08-24T09:00:00-07:00",
      "updatedAt":"2015-08-24T09:00:00-07:00",
      "eventAt":"2015-08-24T09:00:00-07:00",

      "datetime":"2015-08-24T09:00:00-07:00",
      "displayDate":"August 24, 2015 • 10 flights",

      "primaryCategory":"freeflight",

      "categories":[
        "freeflight",
        "fitness",
        "travel"
      ],

      "locations":[
        {
          "id":"dockweiler-first-flight-location-1",
          "label":"Dockweiler Beach • California",
          "lat":33.936,
          "lng":-118.44,
          "precision":"exact",
          "visibility":"public"
        }
      ],

      "media":[
        {
          "id":"dockweiler-first-flight-media-1",
          "type":"image",
          "source":"repository",
          "url":"/Champagne247/assets/map/Freeflight/dockweiler/dockweiler-2015-01.jpg",
          "caption":"Where the freeflight journey began",
          "alt":"Where the freeflight journey began"
        }
      ],

      "hashtags":[
        "Looking4Lift",
        "Dockweiler",
        "HangGliding",
        "FirstFlights"
      ],

      "links":[
        {
          "label":"Windsports →",
          "url":"https://www.windsports.com/beach"
        }
      ],

      "opportunity":{
        "active":true,
        "type":"story",
        "title":"Origin-story content",
        "description":"Use the beginning of the journey to inspire new pilots and introduce the complete Looking4Lift story.",

        "actions":[
          "Origin video",
          "Flight timeline",
          "Beginner education"
        ]
      },

      "distribution":{
        "destinations":[
          "map",
          "facebook",
          "instagram",
          "tiktok",
          "youtube",
          "x"
        ],

        "state":"ready",
        "published":{}
      },

      "platforms":[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    }

  ]
};
