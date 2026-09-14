/*
=========================================================
M.A.P. MASTER LIFE DATA
=========================================================

This is the single source of truth for:

- My Life
- My M.A.P.
- Category feeds
- Map pins
- Media galleries
- Links
- Opportunities
- Social publishing
- Future N.O.V.A. integration

Each life event is created once and connected everywhere.
=========================================================
*/

window.MAP_DATA={

  owner:{
    name:"Christopher Champagne",
    handle:"@Champagne247",
    location:"Leesville, Louisiana",

    brandLines:[
      "My Life. My Mission. My M.A.P.",
      "The M begins with ME.",
      "Live once. Capture once. Connect everywhere."
    ]
  },

  categories:{
    family:{
      label:"Family",
      icon:"❤️",
      image:"../../../assets/map/Hero/hero-family.webp"
    },

    fitness:{
      label:"Fitness",
      icon:"💪",
      image:"../../../assets/map/Hero/hero-fitness.webp"
    },

    freeflight:{
      label:"Freeflight",
      icon:"✈️",
      image:"../../../assets/map/Hero/hero-freeflight.webp"
    },

    professional:{
      label:"Professional",
      icon:"🔧",
      image:"../../../assets/map/Hero/hero-professional.webp"
    },

    creator:{
      label:"Creator",
      icon:"🎨",
      image:"../../../assets/map/Hero/hero-creator.webp"
    },

    travel:{
      label:"Food & Travel",
      icon:"🌎",
      image:"../../../assets/map/Hero/hero-travel.webp"
    }
  },

  statuses:{
    now:{
      label:"Happening Now",
      color:"#52f2a8"
    },

    progress:{
      label:"In Progress",
      color:"#2f9bff"
    },

    next:{
      label:"Next",
      color:"#ffd43b"
    },

    goal:{
      label:"Goal",
      color:"#ff8c2f"
    },

    done:{
      label:"Experienced",
      color:"#a855f7"
    }
  },

  entries:[

    /*
    =====================================================
    ALL HOURS FITNESS
    =====================================================
    */

    {
      id:"gym-all-hours-2026-09-14",

      title:"Gym Time • All Hours Fitness Leesville",

      story:
`Breakfast and planning are complete. Now it’s gym time at All Hours Fitness in Leesville.

Starting today at 185.8 pounds, headphones on, “Hold On” playing, and continuing the mission—building controlled strength, functional mobility and the physical capacity to live everything on my M.A.P.

The M begins with MY choices. Accountability means doing what I said I would do.`,

      status:"now",

      datetime:"2026-09-14T10:34:00-05:00",

      displayDate:"September 14, 2026 • Happening now",

      categories:[
        "fitness",
        "creator"
      ],

      locations:[
        {
          label:"All Hours Fitness • Leesville, Louisiana",
          lat:31.1437,
          lng:-93.2610
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Life/2026-09-14-gym/gym-selfie.jpg",
          caption:"Gym time • All Hours Fitness Leesville"
        },

        {
          type:"image",
          url:"../../../assets/map/Life/2026-09-14-gym/weight-185-8.jpg",
          caption:"185.8 lbs • Accountability marker"
        },

        {
          type:"image",
          url:"../../../assets/map/Life/2026-09-14-gym/hold-on-playlist.jpg",
          caption:"“Hold On” • Mission mindset"
        }
      ],

      hashtags:[
        "MyLife",
        "MyMission",
        "MyMAP",
        "Fitness",
        "AllHoursFitness",
        "Leesville",
        "CertifiedMONSTER",
        "Accountability"
      ],

      links:[
        {
          label:"Explore Fitness on My M.A.P. →",
          url:"../explore/fitness/"
        }
      ],

      opportunity:{
        active:true,

        type:"content",

        title:"Fitness accountability content",

        description:
          "Document strength, mobility, bodyweight progress and the accountability system publicly.",

        actions:[
          "Fitness content",
          "Accountability program",
          "Training partnerships",
          "Certified MONSTER brand"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "x"
      ]
    },

    /*
    =====================================================
    BUILDING THE M.A.P.
    =====================================================
    */

    {
      id:"map-build-2026-09-14",

      title:"Building and Living the M.A.P.",

      story:
`The day started over breakfast with a dream-driven breakthrough.

The ALL page should work like a living timeline: whatever I am doing now rises to the top, while every entry connects across the different paths it touches.

Today isn’t preparation for the project. Today is the project.`,

      status:"progress",

      datetime:"2026-09-14T09:00:00-05:00",

      displayDate:"September 14, 2026",

      categories:[
        "travel",
        "fitness",
        "professional",
        "creator"
      ],

      locations:[
        {
          label:"Breakfast and M.A.P. planning • Leesville",
          lat:31.1435,
          lng:-93.2610
        },

        {
          label:"Mission Control • Leesville",
          lat:31.1500,
          lng:-93.2500
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Hero/hero-all.webp",
          caption:"Fuel → Fitness → Business → Build"
        }
      ],

      hashtags:[
        "MyLife",
        "MyMission",
        "MyMAP",
        "NOVA",
        "Accountability"
      ],

      links:[
        {
          label:"Explore My M.A.P. →",
          url:"../explore/"
        },

        {
          label:"Create Your Own M.A.P. →",
          url:"../create/"
        }
      ],

      opportunity:{
        active:true,

        type:"product",

        title:"Mission Alignment Protocol",

        description:
          "A living vision, planning and accountability system that helps people turn ideas into visible missions and measurable actions.",

        actions:[
          "Free test group",
          "Paid user tiers",
          "Guided M.A.P. creation",
          "N.O.V.A. integration"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    /*
    =====================================================
    24-MINUTE MOUNTAIN FLIGHT
    =====================================================
    */

    {
      id:"lookout-24-minute-flight",

      title:"24-Minute Mountain Flight",

      story:
        "Ridge soared and thermalled for approximately 24 minutes, smashing my previous mountain-flight personal best.",

      status:"done",

      datetime:"2026-08-23T15:00:00-04:00",

      displayDate:"August 2026",

      categories:[
        "freeflight",
        "fitness",
        "creator",
        "travel"
      ],

      locations:[
        {
          label:"Lookout Mountain Flight Park • Rising Fawn, Georgia",
          lat:34.836,
          lng:-85.486
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Hero/hero-freeflight.webp",
          caption:"Looking4Lift • Lookout Mountain"
        }
      ],

      hashtags:[
        "Looking4Lift",
        "Freeflight",
        "HangGliding",
        "LookoutMountain"
      ],

      links:[
        {
          label:"Explore Freeflight →",
          url:"../explore/freeflight/"
        }
      ],

      opportunity:{
        active:true,

        type:"experience",

        title:"Looking4Lift and Freeflight Experience",

        description:
          "Freeflight content, VR experiences, events, partnerships and community growth.",

        actions:[
          "Video content",
          "VR experience",
          "Events",
          "Sponsorships"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    /*
    =====================================================
    100 FLIGHTS
    =====================================================
    */

    {
      id:"lookout-100-flights",

      title:"100 Flights",

      story:
        "Crossed the 100-flight milestone during Wingman Weekend at Lookout Mountain Flight Park.",

      status:"done",

      datetime:"2026-08-22T15:00:00-04:00",

      displayDate:"August 2026",

      categories:[
        "freeflight",
        "fitness",
        "creator",
        "travel"
      ],

      locations:[
        {
          label:"Lookout Mountain Flight Park • Rising Fawn, Georgia",
          lat:34.835,
          lng:-85.487
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Hero/hero-freeflight.webp",
          caption:"100 flights and still Looking4Lift"
        }
      ],

      hashtags:[
        "Looking4Lift",
        "100Flights",
        "HangGliding",
        "WingmanWeekend"
      ],

      links:[
        {
          label:"Explore Freeflight →",
          url:"../explore/freeflight/"
        }
      ],

      opportunity:{
        active:true,

        type:"content",

        title:"Freeflight milestone storytelling",

        description:
          "Use milestones to build community, promote freeflight and create valuable aviation content.",

        actions:[
          "Milestone video",
          "Sponsor outreach",
          "Freeflight promotion"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    /*
    =====================================================
    LOOKING4LIFT
    =====================================================
    */

    {
      id:"looking4lift",

      title:"Looking4Lift",

      story:
        "Freeflight, hang gliding, VR experiences, travel, education, content and community.",

      status:"progress",

      datetime:"2026-08-05T09:00:00-05:00",

      displayDate:"Building now",

      categories:[
        "freeflight",
        "creator",
        "professional",
        "travel"
      ],

      locations:[
        {
          label:"Looking4Lift • United States",
          lat:35.5000,
          lng:-92.5000
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Hero/hero-freeflight.webp",
          caption:"Looking4Lift"
        }
      ],

      hashtags:[
        "Looking4Lift",
        "Freeflight",
        "HangGliding",
        "VR"
      ],

      links:[
        {
          label:"Explore Freeflight →",
          url:"../explore/freeflight/"
        }
      ],

      opportunity:{
        active:true,

        type:"brand",

        title:"Looking4Lift",

        description:
          "A freeflight content, experience and community brand.",

        actions:[
          "VR experiences",
          "YouTube",
          "Events",
          "Merchandise",
          "Partnerships"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    /*
    =====================================================
    CC'S TECHNICAL SERVICES
    =====================================================
    */

    {
      id:"ccs-technical-services",

      title:"CC'S Technical Services",

      story:
        "HVAC, electrical, refrigeration, security, automation, IT and technical services. Real work, real solutions and an income-producing path on the M.A.P.",

      status:"progress",

      datetime:"2026-06-25T09:00:00-05:00",

      displayDate:"Building now",

      categories:[
        "professional",
        "creator"
      ],

      locations:[
        {
          label:"CC'S Technical Services • Leesville, Louisiana",
          lat:31.1435,
          lng:-93.2610
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Hero/hero-professional.webp",
          caption:"Build. Solve. Get it done."
        }
      ],

      hashtags:[
        "CCsTechnicalServices",
        "HVAC",
        "Electrical",
        "Refrigeration",
        "Leesville"
      ],

      links:[
        {
          label:"CC'S Technical Services →",
          url:"https://ccstechnicalservices.com/"
        }
      ],

      opportunity:{
        active:true,

        type:"service",

        title:"Technical service revenue",

        description:
          "Local HVAC, electrical, refrigeration, security and technology services.",

        actions:[
          "Service calls",
          "Installations",
          "Maintenance",
          "Consulting"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok"
      ]
    },

    /*
    =====================================================
    CERTIFIED MONSTER
    =====================================================
    */

    {
      id:"certified-monster",

      title:"Certified MONSTER • Strength & Mobility",

      story:
        "Controlled strength, functional mobility, conditioning and lifelong physical capability.",

      status:"progress",

      datetime:"2026-03-01T06:00:00-06:00",

      displayDate:"Ongoing",

      categories:[
        "fitness",
        "creator"
      ],

      locations:[
        {
          label:"Louisiana",
          lat:31.2000,
          lng:-93.2000
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Hero/hero-fitness.webp",
          caption:"Strength for life"
        }
      ],

      hashtags:[
        "CertifiedMONSTER",
        "Fitness",
        "Strength",
        "Mobility"
      ],

      links:[],

      opportunity:{
        active:true,

        type:"brand",

        title:"Certified MONSTER",

        description:
          "Fitness, performance, accountability, coaching and branded content.",

        actions:[
          "Training content",
          "Coaching",
          "Programs",
          "Merchandise"
        ]
      },

      platforms:[
        "map",
        "facebook",
        "instagram",
        "tiktok",
        "youtube",
        "x"
      ]
    },

    /*
    =====================================================
    DOCKWEILER
    =====================================================
    */

    {
      id:"dockweiler-first-flight",

      title:"Dockweiler • First Day of Flying Lessons",

      story:
        "Where it started. A full day learning to hang glide on the dunes at Dockweiler Beach—10 flights on my first day.",

      status:"done",

      datetime:"2015-08-24T09:00:00-07:00",

      displayDate:"August 24, 2015 • 10 flights",

      categories:[
        "freeflight",
        "fitness",
        "travel"
      ],

      locations:[
        {
          label:"Dockweiler Beach • California",
          lat:33.936,
          lng:-118.440
        }
      ],

      media:[
        {
          type:"image",
          url:"../../../assets/map/Freeflight/dockweiler/dockweiler-2015-01.jpg",
          caption:"Where the freeflight journey began"
        }
      ],

      hashtags:[
        "Looking4Lift",
        "Dockweiler",
        "HangGliding",
        "FirstFlights"
      ],

      links:[
        {
          label:"Windsports →",
          url:"https://www.windsports.com/beach"
        }
      ],

      opportunity:{
        active:true,

        type:"story",

        title:"Origin-story content",

        description:
          "Use the beginning of the journey to inspire new pilots and introduce the complete Looking4Lift story.",

        actions:[
          "Origin video",
          "Flight timeline",
          "Beginner education"
        ]
      },

      platforms:[
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
