//     const map;
// 	  const classAllRivers;
// 	  const classParkAndPlay;
// 	  const classParkAndHuck;
// 	  const class3Rivers;
// 	  const class4Rivers;
// const class5Rivers;
    

	  const riversList = [
	  ['willardstream', 'Willard Stream'], 
	  ['upperpauls', "Paul's Stream (Upper)"],
	  ['lowerpauls',"Paul's Stream (Lower)"],
	  ['lowerlamoille', 'Lamoille (Lower / 5 Chutes'],
	  ['lowerbrowns', 'Browns River (Lower)'],
	  ['lowermoose','Moose River (Lower)'],
	  ['uppermoose','Moose River (Upper)'],
	  ['topmoose','Moose River (Top)'],
	  ['lowermad','Mad River (Lower)'],
	  ['uppermad','Mad River (Upper)'],
	  ['uppernewhaven','New Haven (Upper)'],
	  ['rockriver','Rock River'],
	  ['thecold','Cold River'],
	  ['upperpoultney','Poultney River (Upper'],
	  ['thewinhall','Winhall River'],
	  ['thewest','West River'],
	  ['quecheegorge','Quechee Gorge'],
	  ['themissisquoi','Missisquoi River (Sheldon Springs)'],
	  ['footebrook','Foote Brook'],
	  ['kenfieldbrook', 'Kenfield Brook (Terrill Gorge)'],
	  ['sterlingbrook','Sterling Brook'],
	  ['brownsriverjericho','Browns River (Jericho)'],
	  ['millbrookjericho','Mill Brook (Jericho)'],
	  ['cobbbrook','Cobb Brook'],
	  ['wellsriver','Wells River'],
	  ['stonybrook','Stony Brook'],
	  ['bingobrook','Bingo Brook'],
	  ['clarendongorge','Mill River (Clarendon Gorge)'],
	  ['danbyslides','Mill Brook (Danby Slides)'],
	  ['ballmountainbrook','Ball Mountain Brook'],
	  ['wardsborobrook','Wardsboro Brook'],
	  ['bartonriver','Barton River'],
	  ['eastgranvillebrook','East Granville Brook'],
	  ['bristolnotchbrook','Bristol Notch Brook'],
	  ['middleburygorge','Middlebury River'],
	  ['furnacebrook','Furnace Brook'],
	  ['roaringbranch','Roaring Branch of the Battenkill'],
	  ['westbranchdeerfield','West Branch of The Deerfield'],
	  ['watermanbrook','Waterman Brook']
	  ]
	  
	  const defaultImageLoc = "https://creekvt.com/wp-content/uploads/2019/11/Placeholder.png"
	  
	  export const rivers = {
        {
        name: "Browns River (Jericho)",
        imageLoc: 'https://creekvt.com/wp-content/uploads/2020/05/BrownsRiverJericho2.jpg',
        linkHref: 'https://creekvt.com/riverguide/brownsriverjericho/',
        riverGrade: "B",
        description: "The Jericho Town Run of the Browns River is a bite-size bit of fun, easily accessed and conveniently situated between Burlington and the runs of the Route 15 corridor.  Despite its small size, the run has water frequently and can be run at fairly low levels.  While it may never be a destination river, the beautiful and entertaining rapids of this little run are well worth a stop when in the area.",
        stats: {
          location: "Jericho",
          length: ".65 miles (lower) 1.15 miles (full)",
          class: "IV",
          flowDirection: "Southwest",
          putIn: [44.508621, -72.993681],
          takeOut: [44.504918, -72.999222],
        },
    },
    'New Haven (Lower)' : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/New-Haven-Lower.jpg',
      linkHref: 'https://creekvt.com/riverguide/lowernewhaven',
      riverGrade: "B+",
      description: "The Lower New Haven is one of Vermont’s best class III runs and provides a great option when most rivers are too high.  The run starts and ends with quality action, the highlight being the final 1/2 mile down to the takeout.  If that level is really up, this run becomes a blast of pushy big water that is sure to keep you on your toes.  Oh did we mention there is a brewery quite literally riverside shortly into the run?",
      putIn: [-73.05043, 44.12938],
      takeOut: [-73.08328, 44.12917],
     
    },
    'Patterson Brook (Upper White River)' : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/07/Patterson.jpg',
        linkHref: 'https://creekvt.com/riverguide/patterson',
        riverGrade: "A",
        description: "Pristine water, beautiful surroundings, clean ledges and slides make this run a creek boating paradise for a wide range of paddlers.  Those cutting their teeth will love lower flows, where they can practice in a fun and challenging but relatively safe environment.  Seasoned veterans will find delight in an exciting high-water romp.  Patterson Brook is a true hidden gem.",
        putIn: [-72.86665, 43.9937],
        takeOut: [-72.84881, 43.98519]
      },
    
        "Devil's Washbowl" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/07/DWB.jpg',
        linkHref: 'https://creekvt.com/riverguide/devilswashbowl/',
        riverGrade: "A-",
        description: "On the Delorme Gazetteer, the stream known as the Devil’s Washbowl does not appear.  Upon seeing the put-in, even the most adventurous creek boater will question if they are in the correct place.  But trust that downstream lies a truly fantastic little run.  The DWB is stocked with ledges and falls, and contains a 1/4 mile stretch of pure fun that rivals anything in the state.  If that isn’t enough, near the end of the run is the single greatest boof found in Vermont.",
        putIn: [-72.71529, 44.2113],
        takeOut: [-72.69360, 44.20440],
       
    },
      "Flint Brook" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/Flint-Brook.jpg',
        linkHref: 'https://creekvt.com/riverguide/flintbrook/',
        riverGrade: "A-",
        description: "The rapids are continuous, the eddies are tiny, and the gradient is unrelenting.  Flint Brook is a true gem of a micro creek.  Don’t let its diminutive size fool you, as the 1 mile run will keep you on your toes for the entirety.  From the put-in down, paddlers are treated to a non-stop descent through steep boulder gardens and over tight bedrock ledges and slides.  The minuscule watershed (2.75 miles at the put-in) means it takes a big water event for Flint to run, but catch it with flow and you are in for a treat.  Just don’t miss the take-out.",
        putIn: [44.073299, -72.765898],
        takeOut: [44.068780, -72.749990]
    },
    "Gihon River" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/The-Gihon.jpg',
      linkHref: 'https://creekvt.com/riverguide/thegihon/',
      riverGrade: "A",
      description: "The Gihon River is a staple in the Northern VT creek boaters diet.  It combines a large and relatively slow draining watershed with two sections of whitewater each with their own unique character.  The rapids are mainly class IV save for two slightly more challenging options, one being a class V.  Unfortunately these two fun sections are separated by approximately a mile of flatwater.  If it weren’t for this minor annoyance this run would likely be considered a Vermont classic.",
      putIn: [-72.62289, 44.63414],
        takeOut: [-72.67166, 44.63519]
    },
    "Missisquoi River (Sheldon Springs)" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2020/04/Missisquoi.jpg',
      linkHref: 'https://creekvt.com/riverguide/missisquoiriversheldonsprings/',
      riverGrade: "B+",
      description: "The Sheldon Springs Rapids of the Missisquoi feature the largest volume class IV found in Vermont.  The run is short and sweet, with fun, continuous, in-your-face rapids.  Due to its residence in the lower reaches of a large watershed, the Missisquoi runs well after other rivers have dropped out. To further add to the already ample opportunity to catch it with water, negotiated dam releases occur several weekends in the spring, and can be arranged when water levels allow throughout the year.  So the next time you crave some big water fun, check the guages, and head north.",
      putIn: [-72.97343, 44.91212],
      takeOut: [-72.98222, 44.90960]
    },
    "North Branch of The Winooski" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/NB-Winooski.jpg',
        linkHref: 'https://creekvt.com/riverguide/northbranchwinooski/',
      putIn: [44.457088, -72.546840],
      takeOut: [44.426880, -72.535060]
    },
    "Ridley Brook" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/Ridley.jpg',
        linkHref: 'https://creekvt.com/riverguide/ridleybrook/',
      putIn: [44.340254, -72.833587],
      takeOut: [44.357793, -72.826721]
    },
     "Trout River" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/11/The-Trout.jpg',
        linkHref: 'https://creekvt.com/riverguide/thetrout/',
      putIn: [-72.56440, 44.87845],
      takeOut: [-72.60794, 44.87703]
    },
     "North Branch of The Lamoille (School To Waterville Ledges)" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/NB-Lamoille.jpg',
        linkHref: 'https://creekvt.com',
      putIn: [],
      takeOut: []
    },
    "North Branch of The Lamoille (Bog to School)" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/NB-Lamoille.jpg',
        linkHref: 'https://creekvt.com',
      putIn: [],
      takeOut: []
    },
    "Green River" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/TheGreen.jpg',
        linkHref: 'https://creekvt.com/riverguide/thegreen',
      putIn: [44.602836, -72.535175],
      takeOut: [44.573067, -72.516228]
    },
    "New Haven (Ledges)" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/05/New-Haven-Ledges.jpg',
        linkHref: 'https://creekvt.com',
      putIn: [],
      takeOut: []
    },
     "Waterman Brook" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/11/Waterman-Brook.jpg',
        linkHref: 'https://creekvt.com/riverguide/waterman',
      putIn: [],
      takeOut: []
    },
    "Joe's Brook" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/11/Joes-Brook.jpg',
        linkHref: 'https://creekvt.com',
      putIn: [],
      takeOut: []
    },
    "Big Branch of Otter Creek" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2019/11/Big-Branch.jpg',
        linkHref: 'https://creekvt.com/riverguide/thebigbranch',
      putIn: [],
      takeOut: []
    },
    "Mill River (Clarendon Gorge)" : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2021/09/ClarendonGorge.jpg',
        linkHref: 'https://creekvt.com/riverguide/clarendongorge',
      putIn: [],
      takeOut: []
    },
    'Mad River (Lower)' : {
        imageLoc: 'https://creekvt.com/wp-content/uploads/2023/07/MadRiver.jpg',
      linkHref: 'https://creekvt.com/riverguide/lowermad',
      putIn: [],
      takeOut: []
    }
   
        
    }