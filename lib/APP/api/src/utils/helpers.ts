import { EntityManager } from "@mikro-orm/core";
import { User } from "../entities/User/User";
import { City } from "../entities/Geo/City";
import { Country } from "../entities/Geo/Country";
import { State } from "../entities/Geo/State";

const STATE_JSON = [
    {
        "id": 872,
        "name": "Alberta",
        "state_code": "AB",
        "cities": [
            {
                "id": 16151,
                "name": "Airdrie",
                "latitude": "51.30011000",
                "longitude": "-114.03528000"
            },
            {
                "id": 16178,
                "name": "Athabasca",
                "latitude": "54.71687000",
                "longitude": "-113.28537000"
            },
            {
                "id": 16190,
                "name": "Banff",
                "latitude": "51.17622000",
                "longitude": "-115.56982000"
            },
            {
                "id": 16192,
                "name": "Barrhead",
                "latitude": "54.13345000",
                "longitude": "-114.40211000"
            },
            {
                "id": 16196,
                "name": "Bassano",
                "latitude": "50.78342000",
                "longitude": "-112.46854000"
            },
            {
                "id": 16204,
                "name": "Beaumont",
                "latitude": "53.35013000",
                "longitude": "-113.41871000"
            },
            {
                "id": 16207,
                "name": "Beaverlodge",
                "latitude": "55.21664000",
                "longitude": "-119.43605000"
            },
            {
                "id": 16219,
                "name": "Black Diamond",
                "latitude": "50.70011000",
                "longitude": "-114.23530000"
            },
            {
                "id": 16220,
                "name": "Blackfalds",
                "latitude": "52.38342000",
                "longitude": "-113.78530000"
            },
            {
                "id": 16226,
                "name": "Bon Accord",
                "latitude": "53.83345000",
                "longitude": "-113.41872000"
            },
            {
                "id": 16229,
                "name": "Bonnyville",
                "latitude": "54.26684000",
                "longitude": "-110.73505000"
            },
            {
                "id": 16234,
                "name": "Bow Island",
                "latitude": "49.86676000",
                "longitude": "-111.36843000"
            },
            {
                "id": 16245,
                "name": "Brooks",
                "latitude": "50.58341000",
                "longitude": "-111.88509000"
            },
            {
                "id": 16259,
                "name": "Calgary",
                "latitude": "51.05011000",
                "longitude": "-114.08529000"
            },
            {
                "id": 16260,
                "name": "Calmar",
                "latitude": "53.26683000",
                "longitude": "-113.81874000"
            },
            {
                "id": 16265,
                "name": "Camrose",
                "latitude": "53.01684000",
                "longitude": "-112.83525000"
            },
            {
                "id": 16267,
                "name": "Canmore",
                "latitude": "51.08335000",
                "longitude": "-115.35206000"
            },
            {
                "id": 16277,
                "name": "Cardston",
                "latitude": "49.19998000",
                "longitude": "-113.30190000"
            },
            {
                "id": 16284,
                "name": "Carstairs",
                "latitude": "51.56681000",
                "longitude": "-114.10200000"
            },
            {
                "id": 16305,
                "name": "Chestermere",
                "latitude": "51.03341000",
                "longitude": "-113.81867000"
            },
            {
                "id": 16314,
                "name": "Claresholm",
                "latitude": "50.03332000",
                "longitude": "-113.58524000"
            },
            {
                "id": 16316,
                "name": "Coaldale",
                "latitude": "49.71670000",
                "longitude": "-112.61854000"
            },
            {
                "id": 16317,
                "name": "Coalhurst",
                "latitude": "49.74640000",
                "longitude": "-112.93246000"
            },
            {
                "id": 16320,
                "name": "Cochrane",
                "latitude": "51.18341000",
                "longitude": "-114.46871000"
            },
            {
                "id": 16323,
                "name": "Cold Lake",
                "latitude": "54.46525000",
                "longitude": "-110.18154000"
            },
            {
                "id": 16349,
                "name": "Crossfield",
                "latitude": "51.43341000",
                "longitude": "-114.03528000"
            },
            {
                "id": 16371,
                "name": "Devon",
                "latitude": "53.36683000",
                "longitude": "-113.73533000"
            },
            {
                "id": 16372,
                "name": "Didsbury",
                "latitude": "51.66681000",
                "longitude": "-114.13529000"
            },
            {
                "id": 16383,
                "name": "Drayton Valley",
                "latitude": "53.21682000",
                "longitude": "-114.98544000"
            },
            {
                "id": 16396,
                "name": "Edmonton",
                "latitude": "53.55014000",
                "longitude": "-113.46871000"
            },
            {
                "id": 16398,
                "name": "Edson",
                "latitude": "53.58345000",
                "longitude": "-116.43559000"
            },
            {
                "id": 16399,
                "name": "Elk Point",
                "latitude": "53.90017000",
                "longitude": "-110.90170000"
            },
            {
                "id": 16413,
                "name": "Fairview",
                "latitude": "56.06675000",
                "longitude": "-118.38606000"
            },
            {
                "id": 16415,
                "name": "Falher",
                "latitude": "55.73339000",
                "longitude": "-117.20262000"
            },
            {
                "id": 16429,
                "name": "Fort Macleod",
                "latitude": "49.71671000",
                "longitude": "-113.41857000"
            },
            {
                "id": 16430,
                "name": "Fort McMurray",
                "latitude": "56.72676000",
                "longitude": "-111.38103000"
            },
            {
                "id": 16433,
                "name": "Fort Saskatchewan",
                "latitude": "53.71684000",
                "longitude": "-113.21870000"
            },
            {
                "id": 16438,
                "name": "Fox Creek",
                "latitude": "54.40007000",
                "longitude": "-116.80238000"
            },
            {
                "id": 16450,
                "name": "Gibbons",
                "latitude": "53.83345000",
                "longitude": "-113.33531000"
            },
            {
                "id": 16463,
                "name": "Grand Centre",
                "latitude": "54.41628000",
                "longitude": "-110.21304000"
            },
            {
                "id": 16466,
                "name": "Grande Cache",
                "latitude": "53.88335000",
                "longitude": "-119.13585000"
            },
            {
                "id": 16467,
                "name": "Grande Prairie",
                "latitude": "55.16667000",
                "longitude": "-118.80271000"
            },
            {
                "id": 16476,
                "name": "Grimshaw",
                "latitude": "56.18339000",
                "longitude": "-117.60270000"
            },
            {
                "id": 16488,
                "name": "Hanna",
                "latitude": "51.63343000",
                "longitude": "-111.90181000"
            },
            {
                "id": 16502,
                "name": "Heritage Pointe",
                "latitude": "50.84213000",
                "longitude": "-114.00493000"
            },
            {
                "id": 16503,
                "name": "High Level",
                "latitude": "58.51688000",
                "longitude": "-117.13605000"
            },
            {
                "id": 16504,
                "name": "High Prairie",
                "latitude": "55.43340000",
                "longitude": "-116.48580000"
            },
            {
                "id": 16505,
                "name": "High River",
                "latitude": "50.58341000",
                "longitude": "-113.86867000"
            },
            {
                "id": 16506,
                "name": "Hinton",
                "latitude": "53.40009000",
                "longitude": "-117.58567000"
            },
            {
                "id": 16526,
                "name": "Irricana",
                "latitude": "51.32372000",
                "longitude": "-113.60475000"
            },
            {
                "id": 16528,
                "name": "Jasper Park Lodge",
                "latitude": "52.88633000",
                "longitude": "-118.05625000"
            },
            {
                "id": 16543,
                "name": "Killam",
                "latitude": "52.78344000",
                "longitude": "-111.85175000"
            },
            {
                "id": 16575,
                "name": "Lac La Biche",
                "latitude": "54.76690000",
                "longitude": "-111.96861000"
            },
            {
                "id": 16585,
                "name": "Lacombe",
                "latitude": "52.46681000",
                "longitude": "-113.73530000"
            },
            {
                "id": 16592,
                "name": "Lamont",
                "latitude": "53.76686000",
                "longitude": "-112.80195000"
            },
            {
                "id": 16602,
                "name": "Larkspur",
                "latitude": "53.47942000",
                "longitude": "-113.38142000"
            },
            {
                "id": 16603,
                "name": "Laurel",
                "latitude": "53.44667000",
                "longitude": "-113.38197000"
            },
            {
                "id": 16610,
                "name": "Leduc",
                "latitude": "53.26682000",
                "longitude": "-113.55201000"
            },
            {
                "id": 16614,
                "name": "Lethbridge",
                "latitude": "49.69999000",
                "longitude": "-112.81856000"
            },
            {
                "id": 16625,
                "name": "Lloydminster",
                "latitude": "53.27237000",
                "longitude": "-110.02256000"
            },
            {
                "id": 16645,
                "name": "Magrath",
                "latitude": "49.41668000",
                "longitude": "-112.86856000"
            },
            {
                "id": 16653,
                "name": "Manning",
                "latitude": "56.91683000",
                "longitude": "-117.61945000"
            },
            {
                "id": 16654,
                "name": "Mannville",
                "latitude": "53.33764000",
                "longitude": "-111.17750000"
            },
            {
                "id": 16657,
                "name": "Maple Ridge",
                "latitude": "53.50172000",
                "longitude": "-113.36274000"
            },
            {
                "id": 16671,
                "name": "Mayerthorpe",
                "latitude": "53.95015000",
                "longitude": "-115.13547000"
            },
            {
                "id": 16675,
                "name": "Medicine Hat",
                "latitude": "50.03928000",
                "longitude": "-110.67661000"
            },
            {
                "id": 16689,
                "name": "Mill Woods Town Centre",
                "latitude": "53.45639000",
                "longitude": "-113.42751000"
            },
            {
                "id": 16691,
                "name": "Millet",
                "latitude": "53.10013000",
                "longitude": "-113.46870000"
            },
            {
                "id": 16719,
                "name": "Morinville",
                "latitude": "53.80014000",
                "longitude": "-113.65203000"
            },
            {
                "id": 16729,
                "name": "Nanton",
                "latitude": "50.35008000",
                "longitude": "-113.76866000"
            },
            {
                "id": 16774,
                "name": "Okotoks",
                "latitude": "50.72885000",
                "longitude": "-113.98281000"
            },
            {
                "id": 16775,
                "name": "Olds",
                "latitude": "51.78341000",
                "longitude": "-114.10199000"
            },
            {
                "id": 16803,
                "name": "Peace River",
                "latitude": "56.23715000",
                "longitude": "-117.29176000"
            },
            {
                "id": 16810,
                "name": "Penhold",
                "latitude": "52.13342000",
                "longitude": "-113.86870000"
            },
            {
                "id": 16820,
                "name": "Picture Butte",
                "latitude": "49.88330000",
                "longitude": "-112.78516000"
            },
            {
                "id": 16824,
                "name": "Pincher Creek",
                "latitude": "49.48328000",
                "longitude": "-113.95195000"
            },
            {
                "id": 16834,
                "name": "Ponoka",
                "latitude": "52.67680000",
                "longitude": "-113.58147000"
            },
            {
                "id": 16861,
                "name": "Provost",
                "latitude": "52.35014000",
                "longitude": "-110.26828000"
            },
            {
                "id": 16871,
                "name": "Raymond",
                "latitude": "49.44998000",
                "longitude": "-112.65185000"
            },
            {
                "id": 16873,
                "name": "Red Deer",
                "latitude": "52.26682000",
                "longitude": "-113.80200000"
            },
            {
                "id": 16889,
                "name": "Rideau Park",
                "latitude": "53.47899000",
                "longitude": "-113.50470000"
            },
            {
                "id": 16892,
                "name": "Rimbey",
                "latitude": "52.63340000",
                "longitude": "-114.23532000"
            },
            {
                "id": 16901,
                "name": "Rocky Mountain House",
                "latitude": "52.36683000",
                "longitude": "-114.91880000"
            },
            {
                "id": 17029,
                "name": "Sexsmith",
                "latitude": "55.34998000",
                "longitude": "-118.78602000"
            },
            {
                "id": 17040,
                "name": "Sherwood Park",
                "latitude": "53.51684000",
                "longitude": "-113.31870000"
            },
            {
                "id": 17044,
                "name": "Silver Berry",
                "latitude": "53.45787000",
                "longitude": "-113.38170000"
            },
            {
                "id": 17049,
                "name": "Slave Lake",
                "latitude": "55.28344000",
                "longitude": "-114.76896000"
            },
            {
                "id": 17052,
                "name": "Smoky Lake",
                "latitude": "54.11687000",
                "longitude": "-112.46863000"
            },
            {
                "id": 17061,
                "name": "Spirit River",
                "latitude": "55.78327000",
                "longitude": "-118.83607000"
            },
            {
                "id": 17062,
                "name": "Springbrook",
                "latitude": "52.17920000",
                "longitude": "-113.87981000"
            },
            {
                "id": 17065,
                "name": "Spruce Grove",
                "latitude": "53.53344000",
                "longitude": "-113.91874000"
            },
            {
                "id": 17068,
                "name": "St. Albert",
                "latitude": "53.63344000",
                "longitude": "-113.63533000"
            },
            {
                "id": 17078,
                "name": "Stettler",
                "latitude": "52.31683000",
                "longitude": "-112.71861000"
            },
            {
                "id": 17082,
                "name": "Stony Plain",
                "latitude": "53.53343000",
                "longitude": "-114.00205000"
            },
            {
                "id": 17084,
                "name": "Strathmore",
                "latitude": "51.05011000",
                "longitude": "-113.38523000"
            },
            {
                "id": 17088,
                "name": "Sundre",
                "latitude": "51.80010000",
                "longitude": "-114.63532000"
            },
            {
                "id": 17092,
                "name": "Swan Hills",
                "latitude": "54.71681000",
                "longitude": "-115.40226000"
            },
            {
                "id": 17097,
                "name": "Sylvan Lake",
                "latitude": "52.31100000",
                "longitude": "-114.08375000"
            },
            {
                "id": 17098,
                "name": "Taber",
                "latitude": "49.78703000",
                "longitude": "-112.14603000"
            },
            {
                "id": 17099,
                "name": "Tamarack",
                "latitude": "53.46441000",
                "longitude": "-113.36235000"
            },
            {
                "id": 17110,
                "name": "Three Hills",
                "latitude": "51.70012000",
                "longitude": "-113.26863000"
            },
            {
                "id": 17118,
                "name": "Tofield",
                "latitude": "53.36684000",
                "longitude": "-112.66862000"
            },
            {
                "id": 17131,
                "name": "Two Hills",
                "latitude": "53.71686000",
                "longitude": "-111.75181000"
            },
            {
                "id": 17143,
                "name": "Valleyview",
                "latitude": "55.06673000",
                "longitude": "-117.28585000"
            },
            {
                "id": 17151,
                "name": "Vegreville",
                "latitude": "53.50015000",
                "longitude": "-112.05182000"
            },
            {
                "id": 17154,
                "name": "Vermilion",
                "latitude": "53.35409000",
                "longitude": "-110.85849000"
            },
            {
                "id": 17158,
                "name": "Viking",
                "latitude": "53.10014000",
                "longitude": "-111.76844000"
            },
            {
                "id": 17163,
                "name": "Vulcan",
                "latitude": "50.40008000",
                "longitude": "-113.25189000"
            },
            {
                "id": 17166,
                "name": "Wainwright",
                "latitude": "52.83482000",
                "longitude": "-110.85342000"
            },
            {
                "id": 17187,
                "name": "Wembley",
                "latitude": "55.14995000",
                "longitude": "-119.13602000"
            },
            {
                "id": 17194,
                "name": "Westlake",
                "latitude": "55.22228000",
                "longitude": "-118.80415000"
            },
            {
                "id": 17195,
                "name": "Westlock",
                "latitude": "54.15016000",
                "longitude": "-113.86876000"
            },
            {
                "id": 17197,
                "name": "Wetaskiwin",
                "latitude": "52.96683000",
                "longitude": "-113.36869000"
            },
            {
                "id": 17203,
                "name": "Whitecourt",
                "latitude": "54.15015000",
                "longitude": "-115.68548000"
            },
            {
                "id": 17205,
                "name": "Wild Rose",
                "latitude": "53.47080000",
                "longitude": "-113.38119000"
            }
        ]
    },
    {
        "id": 875,
        "name": "British Columbia",
        "state_code": "BC",
        "cities": [
            {
                "id": 16146,
                "name": "Abbotsford",
                "latitude": "49.05798000",
                "longitude": "-122.25257000"
            },
            {
                "id": 16150,
                "name": "Agassiz",
                "latitude": "49.23298000",
                "longitude": "-121.76926000"
            },
            {
                "id": 16155,
                "name": "Aldergrove",
                "latitude": "49.05801000",
                "longitude": "-122.47087000"
            },
            {
                "id": 16156,
                "name": "Aldergrove East",
                "latitude": "49.05593000",
                "longitude": "-122.42299000"
            },
            {
                "id": 16169,
                "name": "Anmore",
                "latitude": "49.31637000",
                "longitude": "-122.85263000"
            },
            {
                "id": 16172,
                "name": "Arbutus Ridge",
                "latitude": "49.24966000",
                "longitude": "-123.16934000"
            },
            {
                "id": 16173,
                "name": "Armstrong",
                "latitude": "50.44979000",
                "longitude": "-119.20235000"
            },
            {
                "id": 16176,
                "name": "Ashcroft",
                "latitude": "50.72372000",
                "longitude": "-121.28207000"
            },
            {
                "id": 16194,
                "name": "Barrière",
                "latitude": "51.18308000",
                "longitude": "-120.11920000"
            },
            {
                "id": 16235,
                "name": "Bowen Island",
                "latitude": "49.38470000",
                "longitude": "-123.33622000"
            },
            {
                "id": 16253,
                "name": "Burnaby",
                "latitude": "49.26636000",
                "longitude": "-122.95263000"
            },
            {
                "id": 16254,
                "name": "Burns Lake",
                "latitude": "54.22972000",
                "longitude": "-125.76084000"
            },
            {
                "id": 16257,
                "name": "Cache Creek",
                "latitude": "50.81011000",
                "longitude": "-121.32460000"
            },
            {
                "id": 16263,
                "name": "Campbell River",
                "latitude": "50.01634000",
                "longitude": "-125.24459000"
            },
            {
                "id": 16286,
                "name": "Castlegar",
                "latitude": "49.32317000",
                "longitude": "-117.65831000"
            },
            {
                "id": 16288,
                "name": "Cedar",
                "latitude": "49.11633000",
                "longitude": "-123.85270000"
            },
            {
                "id": 16289,
                "name": "Central Coast Regional District",
                "latitude": "52.16638000",
                "longitude": "-127.00323000"
            },
            {
                "id": 16298,
                "name": "Chase",
                "latitude": "50.81650000",
                "longitude": "-119.68571000"
            },
            {
                "id": 16302,
                "name": "Chemainus",
                "latitude": "48.91633000",
                "longitude": "-123.71937000"
            },
            {
                "id": 16306,
                "name": "Chetwynd",
                "latitude": "55.69988000",
                "longitude": "-121.63627000"
            },
            {
                "id": 16308,
                "name": "Chilliwack",
                "latitude": "49.16638000",
                "longitude": "-121.95257000"
            },
            {
                "id": 16326,
                "name": "Colwood",
                "latitude": "48.43293000",
                "longitude": "-123.48591000"
            },
            {
                "id": 16334,
                "name": "Coombs",
                "latitude": "49.29963000",
                "longitude": "-124.41946000"
            },
            {
                "id": 16335,
                "name": "Coquitlam",
                "latitude": "49.28460000",
                "longitude": "-122.78217000"
            },
            {
                "id": 16341,
                "name": "Courtenay",
                "latitude": "49.68657000",
                "longitude": "-124.99360000"
            },
            {
                "id": 16344,
                "name": "Cowichan Bay",
                "latitude": "48.73366000",
                "longitude": "-123.61739000"
            },
            {
                "id": 16346,
                "name": "Cranbrook",
                "latitude": "49.49991000",
                "longitude": "-115.76879000"
            },
            {
                "id": 16347,
                "name": "Creston",
                "latitude": "49.09987000",
                "longitude": "-116.50211000"
            },
            {
                "id": 16350,
                "name": "Cumberland",
                "latitude": "49.61634000",
                "longitude": "-125.03613000"
            },
            {
                "id": 16359,
                "name": "Dawson Creek",
                "latitude": "55.75984000",
                "longitude": "-120.24030000"
            },
            {
                "id": 16366,
                "name": "Delta",
                "latitude": "49.14399000",
                "longitude": "-122.90680000"
            },
            {
                "id": 16367,
                "name": "Denman Island",
                "latitude": "49.53294000",
                "longitude": "-124.81950000"
            },
            {
                "id": 16368,
                "name": "Denman Island Trust Area",
                "latitude": "49.55189000",
                "longitude": "-124.79881000"
            },
            {
                "id": 16386,
                "name": "Duck Lake",
                "latitude": "50.00880000",
                "longitude": "-119.39672000"
            },
            {
                "id": 16387,
                "name": "Duncan",
                "latitude": "48.78293000",
                "longitude": "-123.70266000"
            },
            {
                "id": 16394,
                "name": "East Wellington",
                "latitude": "49.17385000",
                "longitude": "-124.01745000"
            },
            {
                "id": 16400,
                "name": "Elkford",
                "latitude": "50.05007000",
                "longitude": "-114.88540000"
            },
            {
                "id": 16402,
                "name": "Ellison",
                "latitude": "49.93307000",
                "longitude": "-119.36907000"
            },
            {
                "id": 16404,
                "name": "Enderby",
                "latitude": "50.54980000",
                "longitude": "-119.15234000"
            },
            {
                "id": 16414,
                "name": "Fairwinds",
                "latitude": "49.27588000",
                "longitude": "-124.12782000"
            },
            {
                "id": 16421,
                "name": "Fernie",
                "latitude": "49.49996000",
                "longitude": "-115.06871000"
            },
            {
                "id": 16432,
                "name": "Fort Nelson",
                "latitude": "58.80533000",
                "longitude": "-122.70020000"
            },
            {
                "id": 16435,
                "name": "Fort St. John",
                "latitude": "56.24988000",
                "longitude": "-120.85292000"
            },
            {
                "id": 16440,
                "name": "Fraser Valley Regional District",
                "latitude": "49.58299000",
                "longitude": "-121.83587000"
            },
            {
                "id": 16442,
                "name": "French Creek",
                "latitude": "49.34123000",
                "longitude": "-124.35541000"
            },
            {
                "id": 16443,
                "name": "Fruitvale",
                "latitude": "49.11654000",
                "longitude": "-117.55222000"
            },
            {
                "id": 16451,
                "name": "Gibsons",
                "latitude": "49.39539000",
                "longitude": "-123.50555000"
            },
            {
                "id": 16458,
                "name": "Golden",
                "latitude": "51.29995000",
                "longitude": "-116.96890000"
            },
            {
                "id": 16465,
                "name": "Grand Forks",
                "latitude": "49.03309000",
                "longitude": "-118.43560000"
            },
            {
                "id": 16487,
                "name": "Hanceville",
                "latitude": "51.91922000",
                "longitude": "-123.04458000"
            },
            {
                "id": 16507,
                "name": "Hope",
                "latitude": "49.38299000",
                "longitude": "-121.44144000"
            },
            {
                "id": 16508,
                "name": "Hornby Island",
                "latitude": "49.53448000",
                "longitude": "-124.66923000"
            },
            {
                "id": 16510,
                "name": "Houston",
                "latitude": "54.39976000",
                "longitude": "-126.67008000"
            },
            {
                "id": 16523,
                "name": "Invermere",
                "latitude": "50.51666000",
                "longitude": "-116.03538000"
            },
            {
                "id": 16531,
                "name": "Kamloops",
                "latitude": "50.66648000",
                "longitude": "-120.31920000"
            },
            {
                "id": 16536,
                "name": "Kelowna",
                "latitude": "49.88307000",
                "longitude": "-119.48568000"
            },
            {
                "id": 16545,
                "name": "Kimberley",
                "latitude": "49.67071000",
                "longitude": "-115.97760000"
            },
            {
                "id": 16554,
                "name": "Kitimat",
                "latitude": "54.05244000",
                "longitude": "-128.65342000"
            },
            {
                "id": 16586,
                "name": "Ladner",
                "latitude": "49.08938000",
                "longitude": "-123.08241000"
            },
            {
                "id": 16587,
                "name": "Ladysmith",
                "latitude": "48.99016000",
                "longitude": "-123.81699000"
            },
            {
                "id": 16588,
                "name": "Lake Cowichan",
                "latitude": "48.82495000",
                "longitude": "-124.05461000"
            },
            {
                "id": 16595,
                "name": "Langford",
                "latitude": "48.44963000",
                "longitude": "-123.50261000"
            },
            {
                "id": 16597,
                "name": "Langley",
                "latitude": "49.10107000",
                "longitude": "-122.65883000"
            },
            {
                "id": 16616,
                "name": "Lillooet",
                "latitude": "50.68560000",
                "longitude": "-121.94200000"
            },
            {
                "id": 16621,
                "name": "Lions Bay",
                "latitude": "49.45218000",
                "longitude": "-123.23760000"
            },
            {
                "id": 16626,
                "name": "Logan Lake",
                "latitude": "50.49976000",
                "longitude": "-120.80253000"
            },
            {
                "id": 16635,
                "name": "Lumby",
                "latitude": "50.24979000",
                "longitude": "-118.96904000"
            },
            {
                "id": 16641,
                "name": "Mackenzie",
                "latitude": "55.33637000",
                "longitude": "-123.09374000"
            },
            {
                "id": 16656,
                "name": "Maple Ridge",
                "latitude": "49.21939000",
                "longitude": "-122.60193000"
            },
            {
                "id": 16681,
                "name": "Merritt",
                "latitude": "50.11225000",
                "longitude": "-120.79420000"
            },
            {
                "id": 16684,
                "name": "Metchosin",
                "latitude": "48.38293000",
                "longitude": "-123.53591000"
            },
            {
                "id": 16685,
                "name": "Metro Vancouver Regional District",
                "latitude": "49.33296000",
                "longitude": "-123.00264000"
            },
            {
                "id": 16696,
                "name": "Mission",
                "latitude": "49.13298000",
                "longitude": "-122.30258000"
            },
            {
                "id": 16727,
                "name": "Nakusp",
                "latitude": "50.24987000",
                "longitude": "-117.80226000"
            },
            {
                "id": 16728,
                "name": "Nanaimo",
                "latitude": "49.16638000",
                "longitude": "-123.94003000"
            },
            {
                "id": 16735,
                "name": "Nelson",
                "latitude": "49.49985000",
                "longitude": "-117.28553000"
            },
            {
                "id": 16742,
                "name": "New Westminster",
                "latitude": "49.20678000",
                "longitude": "-122.91092000"
            },
            {
                "id": 16757,
                "name": "North Cowichan",
                "latitude": "48.84133000",
                "longitude": "-123.68596000"
            },
            {
                "id": 16758,
                "name": "North Oyster\/Yellow Point",
                "latitude": "49.04807000",
                "longitude": "-123.83395000"
            },
            {
                "id": 16760,
                "name": "North Saanich",
                "latitude": "48.66634000",
                "longitude": "-123.41933000"
            },
            {
                "id": 16761,
                "name": "North Vancouver",
                "latitude": "49.31636000",
                "longitude": "-123.06934000"
            },
            {
                "id": 16769,
                "name": "Oak Bay",
                "latitude": "48.44964000",
                "longitude": "-123.30260000"
            },
            {
                "id": 16772,
                "name": "Okanagan",
                "latitude": "50.36386000",
                "longitude": "-119.34997000"
            },
            {
                "id": 16773,
                "name": "Okanagan Falls",
                "latitude": "49.35000000",
                "longitude": "-119.56667000"
            },
            {
                "id": 16776,
                "name": "Oliver",
                "latitude": "49.18306000",
                "longitude": "-119.55240000"
            },
            {
                "id": 16784,
                "name": "Osoyoos",
                "latitude": "49.03306000",
                "longitude": "-119.45237000"
            },
            {
                "id": 16798,
                "name": "Parksville",
                "latitude": "49.31947000",
                "longitude": "-124.31575000"
            },
            {
                "id": 16804,
                "name": "Peace River Regional District",
                "latitude": "56.66650000",
                "longitude": "-122.75302000"
            },
            {
                "id": 16805,
                "name": "Peachland",
                "latitude": "49.76647000",
                "longitude": "-119.73568000"
            },
            {
                "id": 16808,
                "name": "Pemberton",
                "latitude": "50.31641000",
                "longitude": "-122.80273000"
            },
            {
                "id": 16811,
                "name": "Penticton",
                "latitude": "49.48062000",
                "longitude": "-119.58584000"
            },
            {
                "id": 16826,
                "name": "Pitt Meadows",
                "latitude": "49.22119000",
                "longitude": "-122.68965000"
            },
            {
                "id": 16837,
                "name": "Port Alberni",
                "latitude": "49.24133000",
                "longitude": "-124.80280000"
            },
            {
                "id": 16839,
                "name": "Port Coquitlam",
                "latitude": "49.26637000",
                "longitude": "-122.76932000"
            },
            {
                "id": 16842,
                "name": "Port McNeill",
                "latitude": "50.58716000",
                "longitude": "-127.08053000"
            },
            {
                "id": 16843,
                "name": "Port Moody",
                "latitude": "49.28124000",
                "longitude": "-122.82457000"
            },
            {
                "id": 16851,
                "name": "Powell River",
                "latitude": "49.83278000",
                "longitude": "-124.52368000"
            },
            {
                "id": 16856,
                "name": "Prince George",
                "latitude": "53.91660000",
                "longitude": "-122.75301000"
            },
            {
                "id": 16857,
                "name": "Prince Rupert",
                "latitude": "54.31507000",
                "longitude": "-130.32098000"
            },
            {
                "id": 16858,
                "name": "Princeton",
                "latitude": "49.45802000",
                "longitude": "-120.51076000"
            },
            {
                "id": 16863,
                "name": "Puntledge",
                "latitude": "49.66168000",
                "longitude": "-125.05686000"
            },
            {
                "id": 16865,
                "name": "Quesnel",
                "latitude": "52.97842000",
                "longitude": "-122.49310000"
            },
            {
                "id": 16877,
                "name": "Regional District of Alberni-Clayoquot",
                "latitude": "49.24962000",
                "longitude": "-125.33615000"
            },
            {
                "id": 16878,
                "name": "Regional District of Central Okanagan",
                "latitude": "49.99978000",
                "longitude": "-119.41908000"
            },
            {
                "id": 16882,
                "name": "Revelstoke",
                "latitude": "50.99712000",
                "longitude": "-118.19530000"
            },
            {
                "id": 16885,
                "name": "Richmond",
                "latitude": "49.17003000",
                "longitude": "-123.13683000"
            },
            {
                "id": 16904,
                "name": "Rossland",
                "latitude": "49.08313000",
                "longitude": "-117.80224000"
            },
            {
                "id": 16908,
                "name": "Royston",
                "latitude": "49.64703000",
                "longitude": "-124.94670000"
            },
            {
                "id": 17016,
                "name": "Salmo",
                "latitude": "49.19986000",
                "longitude": "-117.26890000"
            },
            {
                "id": 17017,
                "name": "Salmon Arm",
                "latitude": "50.69980000",
                "longitude": "-119.30237000"
            },
            {
                "id": 17018,
                "name": "Salt Spring Island",
                "latitude": "48.81852000",
                "longitude": "-123.49061000"
            },
            {
                "id": 17019,
                "name": "Saltair",
                "latitude": "48.94963000",
                "longitude": "-123.76939000"
            },
            {
                "id": 17025,
                "name": "Sechelt",
                "latitude": "49.47512000",
                "longitude": "-123.75903000"
            },
            {
                "id": 17043,
                "name": "Sicamous",
                "latitude": "50.83312000",
                "longitude": "-118.98565000"
            },
            {
                "id": 17047,
                "name": "Six Mile",
                "latitude": "48.45767000",
                "longitude": "-123.46088000"
            },
            {
                "id": 17050,
                "name": "Smithers",
                "latitude": "54.78036000",
                "longitude": "-127.17428000"
            },
            {
                "id": 17053,
                "name": "Sooke",
                "latitude": "48.37463000",
                "longitude": "-123.72762000"
            },
            {
                "id": 17058,
                "name": "South Pender Harbour",
                "latitude": "49.62202000",
                "longitude": "-124.02484000"
            },
            {
                "id": 17060,
                "name": "Sparwood",
                "latitude": "49.73332000",
                "longitude": "-114.88532000"
            },
            {
                "id": 17086,
                "name": "Summerland",
                "latitude": "49.59977000",
                "longitude": "-119.66911000"
            },
            {
                "id": 17089,
                "name": "Surrey",
                "latitude": "49.10635000",
                "longitude": "-122.82509000"
            },
            {
                "id": 17102,
                "name": "Terrace",
                "latitude": "54.51634000",
                "longitude": "-128.60345000"
            },
            {
                "id": 17119,
                "name": "Tofino",
                "latitude": "49.15314000",
                "longitude": "-125.90744000"
            },
            {
                "id": 17125,
                "name": "Trail",
                "latitude": "49.09983000",
                "longitude": "-117.70223000"
            },
            {
                "id": 17128,
                "name": "Tsawwassen",
                "latitude": "49.01667000",
                "longitude": "-123.08333000"
            },
            {
                "id": 17129,
                "name": "Tumbler Ridge",
                "latitude": "55.13027000",
                "longitude": "-120.99415000"
            },
            {
                "id": 17133,
                "name": "Ucluelet",
                "latitude": "48.94153000",
                "longitude": "-125.54635000"
            },
            {
                "id": 17145,
                "name": "Vancouver",
                "latitude": "49.24966000",
                "longitude": "-123.11934000"
            },
            {
                "id": 17146,
                "name": "Vanderhoof",
                "latitude": "54.01657000",
                "longitude": "-124.01982000"
            },
            {
                "id": 17155,
                "name": "Vernon",
                "latitude": "50.26729000",
                "longitude": "-119.27337000"
            },
            {
                "id": 17156,
                "name": "Victoria",
                "latitude": "48.43590000",
                "longitude": "-123.35155000"
            },
            {
                "id": 17168,
                "name": "Walnut Grove",
                "latitude": "49.16473000",
                "longitude": "-122.64042000"
            },
            {
                "id": 17183,
                "name": "Welcome Beach",
                "latitude": "49.47959000",
                "longitude": "-123.89239000"
            },
            {
                "id": 17189,
                "name": "West End",
                "latitude": "49.28333000",
                "longitude": "-123.13333000"
            },
            {
                "id": 17190,
                "name": "West Kelowna",
                "latitude": "49.86250000",
                "longitude": "-119.58333000"
            },
            {
                "id": 17193,
                "name": "West Vancouver",
                "latitude": "49.36672000",
                "longitude": "-123.16652000"
            },
            {
                "id": 17200,
                "name": "Whistler",
                "latitude": "50.11817000",
                "longitude": "-122.95396000"
            },
            {
                "id": 17202,
                "name": "White Rock",
                "latitude": "49.01636000",
                "longitude": "-122.80260000"
            },
            {
                "id": 17207,
                "name": "Williams Lake",
                "latitude": "52.14153000",
                "longitude": "-122.14451000"
            }
        ]
    },
    {
        "id": 867,
        "name": "Manitoba",
        "state_code": "MB",
        "cities": [
            {
                "id": 16160,
                "name": "Altona",
                "latitude": "49.10469000",
                "longitude": "-97.55961000"
            },
            {
                "id": 16206,
                "name": "Beausejour",
                "latitude": "50.06220000",
                "longitude": "-96.51669000"
            },
            {
                "id": 16225,
                "name": "Boissevain",
                "latitude": "49.23062000",
                "longitude": "-100.05586000"
            },
            {
                "id": 16238,
                "name": "Brandon",
                "latitude": "49.84692000",
                "longitude": "-99.95306000"
            },
            {
                "id": 16275,
                "name": "Carberry",
                "latitude": "49.86893000",
                "longitude": "-99.36021000"
            },
            {
                "id": 16283,
                "name": "Carman",
                "latitude": "49.49920000",
                "longitude": "-98.00156000"
            },
            {
                "id": 16348,
                "name": "Cross Lake 19A",
                "latitude": "54.65135000",
                "longitude": "-97.76848000"
            },
            {
                "id": 16356,
                "name": "Dauphin",
                "latitude": "51.14941000",
                "longitude": "-100.05023000"
            },
            {
                "id": 16360,
                "name": "De Salaberry",
                "latitude": "49.39999000",
                "longitude": "-97.00894000"
            },
            {
                "id": 16364,
                "name": "Deloraine",
                "latitude": "49.19082000",
                "longitude": "-100.49477000"
            },
            {
                "id": 16422,
                "name": "Flin Flon",
                "latitude": "54.76703000",
                "longitude": "-101.87433000"
            },
            {
                "id": 16452,
                "name": "Gimli",
                "latitude": "50.63362000",
                "longitude": "-96.99066000"
            },
            {
                "id": 16477,
                "name": "Grunthal",
                "latitude": "49.40668000",
                "longitude": "-96.85873000"
            },
            {
                "id": 16500,
                "name": "Headingley",
                "latitude": "49.87530000",
                "longitude": "-97.40896000"
            },
            {
                "id": 16518,
                "name": "Ile des Chênes",
                "latitude": "49.71060000",
                "longitude": "-96.98893000"
            },
            {
                "id": 16544,
                "name": "Killarney",
                "latitude": "49.18332000",
                "longitude": "-99.66364000"
            },
            {
                "id": 16563,
                "name": "La Broquerie",
                "latitude": "49.51688000",
                "longitude": "-96.50029000"
            },
            {
                "id": 16576,
                "name": "Lac du Bonnet",
                "latitude": "50.25360000",
                "longitude": "-96.06116000"
            },
            {
                "id": 16593,
                "name": "Landmark",
                "latitude": "49.67169000",
                "longitude": "-96.82232000"
            },
            {
                "id": 16629,
                "name": "Lorette",
                "latitude": "49.73919000",
                "longitude": "-96.87232000"
            },
            {
                "id": 16677,
                "name": "Melita",
                "latitude": "49.26811000",
                "longitude": "-100.99669000"
            },
            {
                "id": 16693,
                "name": "Minnedosa",
                "latitude": "50.24532000",
                "longitude": "-99.84364000"
            },
            {
                "id": 16714,
                "name": "Moose Lake",
                "latitude": "49.20559000",
                "longitude": "-95.30629000"
            },
            {
                "id": 16717,
                "name": "Morden",
                "latitude": "49.19190000",
                "longitude": "-98.10136000"
            },
            {
                "id": 16720,
                "name": "Morris",
                "latitude": "49.35499000",
                "longitude": "-97.36567000"
            },
            {
                "id": 16734,
                "name": "Neepawa",
                "latitude": "50.22892000",
                "longitude": "-99.46642000"
            },
            {
                "id": 16749,
                "name": "Niverville",
                "latitude": "49.60559000",
                "longitude": "-97.04234000"
            },
            {
                "id": 16848,
                "name": "Portage la Prairie",
                "latitude": "49.97282000",
                "longitude": "-98.29263000"
            },
            {
                "id": 16894,
                "name": "Rivers",
                "latitude": "50.03081000",
                "longitude": "-100.24029000"
            },
            {
                "id": 16898,
                "name": "Roblin",
                "latitude": "51.22999000",
                "longitude": "-101.35650000"
            },
            {
                "id": 17026,
                "name": "Selkirk",
                "latitude": "50.14360000",
                "longitude": "-96.88452000"
            },
            {
                "id": 17041,
                "name": "Shilo",
                "latitude": "49.80509000",
                "longitude": "-99.63175000"
            },
            {
                "id": 17056,
                "name": "Souris",
                "latitude": "49.61720000",
                "longitude": "-100.26120000"
            },
            {
                "id": 17067,
                "name": "St. Adolphe",
                "latitude": "49.67440000",
                "longitude": "-97.11124000"
            },
            {
                "id": 17075,
                "name": "Steinbach",
                "latitude": "49.52579000",
                "longitude": "-96.68451000"
            },
            {
                "id": 17080,
                "name": "Stonewall",
                "latitude": "50.13441000",
                "longitude": "-97.32676000"
            },
            {
                "id": 17093,
                "name": "Swan River",
                "latitude": "52.10580000",
                "longitude": "-101.26759000"
            },
            {
                "id": 17105,
                "name": "The Pas",
                "latitude": "53.82509000",
                "longitude": "-101.25413000"
            },
            {
                "id": 17108,
                "name": "Thompson",
                "latitude": "55.74350000",
                "longitude": "-97.85579000"
            },
            {
                "id": 17161,
                "name": "Virden",
                "latitude": "49.85080000",
                "longitude": "-100.93262000"
            },
            {
                "id": 17192,
                "name": "West St. Paul",
                "latitude": "49.99940000",
                "longitude": "-97.16284000"
            },
            {
                "id": 17214,
                "name": "Winkler",
                "latitude": "49.18170000",
                "longitude": "-97.94104000"
            },
            {
                "id": 17215,
                "name": "Winnipeg",
                "latitude": "49.88440000",
                "longitude": "-97.14704000"
            }
        ]
    },
    {
        "id": 868,
        "name": "New Brunswick",
        "state_code": "NB",
        "cities": [
            {
                "id": 16184,
                "name": "Baie Ste. Anne",
                "latitude": "47.05231000",
                "longitude": "-64.95355000"
            },
            {
                "id": 16198,
                "name": "Bathurst",
                "latitude": "47.61814000",
                "longitude": "-65.65112000"
            },
            {
                "id": 16232,
                "name": "Bouctouche",
                "latitude": "46.46844000",
                "longitude": "-64.73905000"
            },
            {
                "id": 16264,
                "name": "Campbellton",
                "latitude": "48.00751000",
                "longitude": "-66.67272000"
            },
            {
                "id": 16373,
                "name": "Dieppe",
                "latitude": "46.07844000",
                "longitude": "-64.68735000"
            },
            {
                "id": 16397,
                "name": "Edmundston",
                "latitude": "47.37370000",
                "longitude": "-68.32512000"
            },
            {
                "id": 16423,
                "name": "Florenceville-Bristol",
                "latitude": "46.44353000",
                "longitude": "-67.61536000"
            },
            {
                "id": 16441,
                "name": "Fredericton",
                "latitude": "45.94541000",
                "longitude": "-66.66558000"
            },
            {
                "id": 16444,
                "name": "Fundy Bay",
                "latitude": "44.74100000",
                "longitude": "-66.76041000"
            },
            {
                "id": 16468,
                "name": "Grande-Digue",
                "latitude": "46.30014000",
                "longitude": "-64.56546000"
            },
            {
                "id": 16471,
                "name": "Greater Lakeburn",
                "latitude": "46.07651000",
                "longitude": "-64.66818000"
            },
            {
                "id": 16486,
                "name": "Hampton",
                "latitude": "45.52876000",
                "longitude": "-65.85354000"
            },
            {
                "id": 16493,
                "name": "Harrison Brook",
                "latitude": "47.21304000",
                "longitude": "-67.92847000"
            },
            {
                "id": 16542,
                "name": "Keswick Ridge",
                "latitude": "46.00011000",
                "longitude": "-66.88218000"
            },
            {
                "id": 16618,
                "name": "Lincoln",
                "latitude": "45.90012000",
                "longitude": "-66.58218000"
            },
            {
                "id": 16638,
                "name": "Lutes Mountain",
                "latitude": "46.13544000",
                "longitude": "-64.90504000"
            },
            {
                "id": 16672,
                "name": "McEwen",
                "latitude": "46.14520000",
                "longitude": "-64.78615000"
            },
            {
                "id": 16695,
                "name": "Miramichi",
                "latitude": "47.02895000",
                "longitude": "-65.50186000"
            },
            {
                "id": 16700,
                "name": "Moncton",
                "latitude": "46.09454000",
                "longitude": "-64.79650000"
            },
            {
                "id": 16726,
                "name": "Nackawic",
                "latitude": "45.99666000",
                "longitude": "-67.24028000"
            },
            {
                "id": 16741,
                "name": "New Maryland",
                "latitude": "45.87932000",
                "longitude": "-66.66828000"
            },
            {
                "id": 16750,
                "name": "Noonan",
                "latitude": "45.96682000",
                "longitude": "-66.53218000"
            },
            {
                "id": 16781,
                "name": "Oromocto",
                "latitude": "45.83512000",
                "longitude": "-66.47917000"
            },
            {
                "id": 16884,
                "name": "Richibucto",
                "latitude": "46.68073000",
                "longitude": "-64.88044000"
            },
            {
                "id": 16910,
                "name": "Sackville",
                "latitude": "45.91875000",
                "longitude": "-64.38455000"
            },
            {
                "id": 16913,
                "name": "Saint Andrews",
                "latitude": "45.07370000",
                "longitude": "-67.05312000"
            },
            {
                "id": 16914,
                "name": "Saint John",
                "latitude": "45.27271000",
                "longitude": "-66.06766000"
            },
            {
                "id": 16921,
                "name": "Saint-Antoine",
                "latitude": "46.36294000",
                "longitude": "-64.74985000"
            },
            {
                "id": 16967,
                "name": "Saint-Léonard",
                "latitude": "47.16317000",
                "longitude": "-67.92460000"
            },
            {
                "id": 17014,
                "name": "Salisbury",
                "latitude": "46.03905000",
                "longitude": "-65.04628000"
            },
            {
                "id": 17034,
                "name": "Shediac",
                "latitude": "46.21981000",
                "longitude": "-64.54107000"
            },
            {
                "id": 17035,
                "name": "Shediac Bridge-Shediac River",
                "latitude": "46.26886000",
                "longitude": "-64.60047000"
            },
            {
                "id": 17042,
                "name": "Shippagan",
                "latitude": "47.74424000",
                "longitude": "-64.70804000"
            },
            {
                "id": 17074,
                "name": "Starlight Village",
                "latitude": "45.88308000",
                "longitude": "-66.76905000"
            },
            {
                "id": 17090,
                "name": "Sussex",
                "latitude": "45.72266000",
                "longitude": "-65.50663000"
            },
            {
                "id": 17124,
                "name": "Tracadie-Sheila",
                "latitude": "47.51444000",
                "longitude": "-64.91806000"
            },
            {
                "id": 17186,
                "name": "Wells",
                "latitude": "45.39274000",
                "longitude": "-65.92313000"
            }
        ]
    },
    {
        "id": 877,
        "name": "Newfoundland and Labrador",
        "state_code": "NL",
        "cities": [
            {
                "id": 16199,
                "name": "Bay Roberts",
                "latitude": "47.59989000",
                "longitude": "-53.26478000"
            },
            {
                "id": 16200,
                "name": "Bay St. George South",
                "latitude": "48.22781000",
                "longitude": "-58.84162000"
            },
            {
                "id": 16228,
                "name": "Bonavista",
                "latitude": "48.64989000",
                "longitude": "-53.11474000"
            },
            {
                "id": 16230,
                "name": "Botwood",
                "latitude": "49.14994000",
                "longitude": "-55.34819000"
            },
            {
                "id": 16251,
                "name": "Burgeo",
                "latitude": "47.61668000",
                "longitude": "-57.61516000"
            },
            {
                "id": 16276,
                "name": "Carbonear",
                "latitude": "47.73319000",
                "longitude": "-53.21478000"
            },
            {
                "id": 16287,
                "name": "Catalina",
                "latitude": "48.51659000",
                "longitude": "-53.08135000"
            },
            {
                "id": 16294,
                "name": "Channel-Port aux Basques",
                "latitude": "47.57286000",
                "longitude": "-59.13808000"
            },
            {
                "id": 16313,
                "name": "Clarenville-Shoal Harbour",
                "latitude": "48.18050000",
                "longitude": "-53.96982000"
            },
            {
                "id": 16327,
                "name": "Conception Bay South",
                "latitude": "47.49989000",
                "longitude": "-52.99806000"
            },
            {
                "id": 16336,
                "name": "Corner Brook",
                "latitude": "48.95001000",
                "longitude": "-57.95202000"
            },
            {
                "id": 16362,
                "name": "Deer Lake",
                "latitude": "49.16671000",
                "longitude": "-57.43163000"
            },
            {
                "id": 16425,
                "name": "Fogo Island",
                "latitude": "49.71649000",
                "longitude": "-54.16981000"
            },
            {
                "id": 16445,
                "name": "Gambo",
                "latitude": "48.78320000",
                "longitude": "-54.21482000"
            },
            {
                "id": 16460,
                "name": "Goulds",
                "latitude": "47.45532000",
                "longitude": "-52.77552000"
            },
            {
                "id": 16462,
                "name": "Grand Bank",
                "latitude": "47.09995000",
                "longitude": "-55.76504000"
            },
            {
                "id": 16464,
                "name": "Grand Falls-Windsor",
                "latitude": "48.93324000",
                "longitude": "-55.66492000"
            },
            {
                "id": 16491,
                "name": "Happy Valley-Goose Bay",
                "latitude": "53.30380000",
                "longitude": "-60.32576000"
            },
            {
                "id": 16492,
                "name": "Harbour Breton",
                "latitude": "47.48325000",
                "longitude": "-55.79833000"
            },
            {
                "id": 16574,
                "name": "Labrador City",
                "latitude": "52.94626000",
                "longitude": "-66.91137000"
            },
            {
                "id": 16615,
                "name": "Lewisporte",
                "latitude": "49.24993000",
                "longitude": "-55.04816000"
            },
            {
                "id": 16664,
                "name": "Marystown",
                "latitude": "47.16663000",
                "longitude": "-55.14829000"
            },
            {
                "id": 16724,
                "name": "Mount Pearl",
                "latitude": "47.51659000",
                "longitude": "-52.78135000"
            },
            {
                "id": 16802,
                "name": "Pasadena",
                "latitude": "49.01671000",
                "longitude": "-57.59837000"
            },
            {
                "id": 17063,
                "name": "Springdale",
                "latitude": "49.49995000",
                "longitude": "-56.06492000"
            },
            {
                "id": 17069,
                "name": "St. Anthony",
                "latitude": "51.37039000",
                "longitude": "-55.59743000"
            },
            {
                "id": 17072,
                "name": "St. John's",
                "latitude": "47.56494000",
                "longitude": "-52.70931000"
            },
            {
                "id": 17076,
                "name": "Stephenville",
                "latitude": "48.55001000",
                "longitude": "-58.58180000"
            },
            {
                "id": 17077,
                "name": "Stephenville Crossing",
                "latitude": "48.50001000",
                "longitude": "-58.43180000"
            },
            {
                "id": 17120,
                "name": "Torbay",
                "latitude": "47.66659000",
                "longitude": "-52.73135000"
            },
            {
                "id": 17135,
                "name": "Upper Island Cove",
                "latitude": "47.64989000",
                "longitude": "-53.21478000"
            },
            {
                "id": 17164,
                "name": "Wabana",
                "latitude": "47.63319000",
                "longitude": "-52.94806000"
            }
        ]
    },
    {
        "id": 878,
        "name": "Northwest Territories",
        "state_code": "NT",
        "cities": [
            {
                "id": 16209,
                "name": "Behchokǫ̀",
                "latitude": "62.80250000",
                "longitude": "-116.04639000"
            },
            {
                "id": 16431,
                "name": "Fort McPherson",
                "latitude": "67.43863000",
                "longitude": "-134.88543000"
            },
            {
                "id": 16434,
                "name": "Fort Smith",
                "latitude": "60.00439000",
                "longitude": "-111.88871000"
            },
            {
                "id": 16498,
                "name": "Hay River",
                "latitude": "60.81555000",
                "longitude": "-115.79993000"
            },
            {
                "id": 16522,
                "name": "Inuvik",
                "latitude": "68.34986000",
                "longitude": "-133.72181000"
            },
            {
                "id": 16753,
                "name": "Norman Wells",
                "latitude": "65.28201000",
                "longitude": "-126.83290000"
            },
            {
                "id": 17221,
                "name": "Yellowknife",
                "latitude": "62.45411000",
                "longitude": "-114.37248000"
            }
        ]
    },
    {
        "id": 874,
        "name": "Nova Scotia",
        "state_code": "NS",
        "cities": [
            {
                "id": 16161,
                "name": "Amherst",
                "latitude": "45.83345000",
                "longitude": "-64.19874000"
            },
            {
                "id": 16170,
                "name": "Annapolis County",
                "latitude": "44.58345000",
                "longitude": "-65.16551000"
            },
            {
                "id": 16171,
                "name": "Antigonish",
                "latitude": "45.61685000",
                "longitude": "-61.99858000"
            },
            {
                "id": 16216,
                "name": "Berwick",
                "latitude": "45.05015000",
                "longitude": "-64.73208000"
            },
            {
                "id": 16242,
                "name": "Bridgewater",
                "latitude": "44.37856000",
                "longitude": "-64.51882000"
            },
            {
                "id": 16272,
                "name": "Cape Breton County",
                "latitude": "46.00014000",
                "longitude": "-60.31516000"
            },
            {
                "id": 16304,
                "name": "Chester",
                "latitude": "44.54225000",
                "longitude": "-64.23891000"
            },
            {
                "id": 16322,
                "name": "Colchester",
                "latitude": "45.33345000",
                "longitude": "-63.24868000"
            },
            {
                "id": 16324,
                "name": "Cole Harbour",
                "latitude": "44.67244000",
                "longitude": "-63.47506000"
            },
            {
                "id": 16342,
                "name": "Cow Bay",
                "latitude": "44.63141000",
                "longitude": "-63.43218000"
            },
            {
                "id": 16355,
                "name": "Dartmouth",
                "latitude": "44.67134000",
                "longitude": "-63.57719000"
            },
            {
                "id": 16374,
                "name": "Digby",
                "latitude": "44.62188000",
                "longitude": "-65.75860000"
            },
            {
                "id": 16375,
                "name": "Digby County",
                "latitude": "44.36685000",
                "longitude": "-65.69884000"
            },
            {
                "id": 16406,
                "name": "English Corner",
                "latitude": "44.73345000",
                "longitude": "-63.78201000"
            },
            {
                "id": 16407,
                "name": "Eskasoni 3",
                "latitude": "45.94522000",
                "longitude": "-60.61617000"
            },
            {
                "id": 16416,
                "name": "Fall River",
                "latitude": "44.81685000",
                "longitude": "-63.61540000"
            },
            {
                "id": 16454,
                "name": "Glace Bay",
                "latitude": "46.19695000",
                "longitude": "-59.95698000"
            },
            {
                "id": 16475,
                "name": "Greenwood",
                "latitude": "44.97413000",
                "longitude": "-64.93169000"
            },
            {
                "id": 16482,
                "name": "Halifax",
                "latitude": "44.64533000",
                "longitude": "-63.57239000"
            },
            {
                "id": 16490,
                "name": "Hantsport",
                "latitude": "45.06685000",
                "longitude": "-64.16544000"
            },
            {
                "id": 16499,
                "name": "Hayes Subdivision",
                "latitude": "45.05519000",
                "longitude": "-64.58795000"
            },
            {
                "id": 16539,
                "name": "Kentville",
                "latitude": "45.07710000",
                "longitude": "-64.49605000"
            },
            {
                "id": 16589,
                "name": "Lake Echo",
                "latitude": "44.73345000",
                "longitude": "-63.38198000"
            },
            {
                "id": 16600,
                "name": "Lantz",
                "latitude": "44.98345000",
                "longitude": "-63.48199000"
            },
            {
                "id": 16632,
                "name": "Lower Sackville",
                "latitude": "44.77599000",
                "longitude": "-63.67865000"
            },
            {
                "id": 16637,
                "name": "Lunenburg",
                "latitude": "44.37847000",
                "longitude": "-64.31658000"
            },
            {
                "id": 16686,
                "name": "Middleton",
                "latitude": "44.94284000",
                "longitude": "-65.07022000"
            },
            {
                "id": 16739,
                "name": "New Glasgow",
                "latitude": "45.58344000",
                "longitude": "-62.64863000"
            },
            {
                "id": 16791,
                "name": "Oxford",
                "latitude": "45.73345000",
                "longitude": "-63.86542000"
            },
            {
                "id": 16799,
                "name": "Parrsboro",
                "latitude": "45.40567000",
                "longitude": "-64.32585000"
            },
            {
                "id": 16818,
                "name": "Pictou",
                "latitude": "45.67875000",
                "longitude": "-62.70936000"
            },
            {
                "id": 16819,
                "name": "Pictou County",
                "latitude": "45.50015000",
                "longitude": "-62.58193000"
            },
            {
                "id": 16840,
                "name": "Port Hawkesbury",
                "latitude": "45.61685000",
                "longitude": "-61.34853000"
            },
            {
                "id": 16846,
                "name": "Port Williams",
                "latitude": "45.10015000",
                "longitude": "-64.41546000"
            },
            {
                "id": 16859,
                "name": "Princeville",
                "latitude": "45.76684000",
                "longitude": "-61.29853000"
            },
            {
                "id": 17037,
                "name": "Shelburne",
                "latitude": "43.76325000",
                "longitude": "-65.32355000"
            },
            {
                "id": 17064,
                "name": "Springhill",
                "latitude": "45.65015000",
                "longitude": "-64.04873000"
            },
            {
                "id": 17095,
                "name": "Sydney",
                "latitude": "46.13510000",
                "longitude": "-60.18310000"
            },
            {
                "id": 17096,
                "name": "Sydney Mines",
                "latitude": "46.23669000",
                "longitude": "-60.21767000"
            },
            {
                "id": 17127,
                "name": "Truro",
                "latitude": "45.36685000",
                "longitude": "-63.26538000"
            },
            {
                "id": 17211,
                "name": "Windsor",
                "latitude": "44.98345000",
                "longitude": "-64.13204000"
            },
            {
                "id": 17216,
                "name": "Wolfville",
                "latitude": "45.08345000",
                "longitude": "-64.36546000"
            },
            {
                "id": 17220,
                "name": "Yarmouth",
                "latitude": "43.83345000",
                "longitude": "-66.11557000"
            }
        ]
    },
    {
        "id": 876,
        "name": "Nunavut",
        "state_code": "NU",
        "cities": [
            {
                "id": 16315,
                "name": "Clyde River",
                "latitude": "70.47233000",
                "longitude": "-68.58987000"
            },
            {
                "id": 16453,
                "name": "Gjoa Haven",
                "latitude": "68.62602000",
                "longitude": "-95.87836000"
            },
            {
                "id": 16524,
                "name": "Iqaluit",
                "latitude": "63.74697000",
                "longitude": "-68.51727000"
            },
            {
                "id": 16555,
                "name": "Kugluktuk",
                "latitude": "67.82743000",
                "longitude": "-115.09649000"
            },
            {
                "id": 16793,
                "name": "Pangnirtung",
                "latitude": "66.14642000",
                "longitude": "-65.69996000"
            },
            {
                "id": 16869,
                "name": "Rankin Inlet",
                "latitude": "62.80906000",
                "longitude": "-92.08534000"
            }
        ]
    },
    {
        "id": 866,
        "name": "Ontario",
        "state_code": "ON",
        "cities": [
            {
                "id": 16152,
                "name": "Ajax",
                "latitude": "43.85012000",
                "longitude": "-79.03288000"
            },
            {
                "id": 16157,
                "name": "Algoma",
                "latitude": "47.88364000",
                "longitude": "-84.42406000"
            },
            {
                "id": 16158,
                "name": "Alliston",
                "latitude": "44.15011000",
                "longitude": "-79.86635000"
            },
            {
                "id": 16162,
                "name": "Amherstburg",
                "latitude": "42.10009000",
                "longitude": "-83.09985000"
            },
            {
                "id": 16163,
                "name": "Amigo Beach",
                "latitude": "44.70011000",
                "longitude": "-79.39963000"
            },
            {
                "id": 16166,
                "name": "Ancaster",
                "latitude": "43.21806000",
                "longitude": "-79.98716000"
            },
            {
                "id": 16168,
                "name": "Angus",
                "latitude": "44.31681000",
                "longitude": "-79.88295000"
            },
            {
                "id": 16174,
                "name": "Arnprior",
                "latitude": "45.43341000",
                "longitude": "-76.34939000"
            },
            {
                "id": 16179,
                "name": "Atikokan",
                "latitude": "48.75667000",
                "longitude": "-91.62409000"
            },
            {
                "id": 16180,
                "name": "Attawapiskat",
                "latitude": "52.92774000",
                "longitude": "-82.41669000"
            },
            {
                "id": 16181,
                "name": "Aurora",
                "latitude": "44.00011000",
                "longitude": "-79.46632000"
            },
            {
                "id": 16182,
                "name": "Aylmer",
                "latitude": "42.76679000",
                "longitude": "-80.98302000"
            },
            {
                "id": 16183,
                "name": "Azilda",
                "latitude": "46.55008000",
                "longitude": "-81.09975000"
            },
            {
                "id": 16188,
                "name": "Ballantrae",
                "latitude": "44.03342000",
                "longitude": "-79.29960000"
            },
            {
                "id": 16189,
                "name": "Bancroft",
                "latitude": "45.05752000",
                "longitude": "-77.85702000"
            },
            {
                "id": 16193,
                "name": "Barrie",
                "latitude": "44.40011000",
                "longitude": "-79.66634000"
            },
            {
                "id": 16197,
                "name": "Bath",
                "latitude": "44.18342000",
                "longitude": "-76.78273000"
            },
            {
                "id": 16211,
                "name": "Belleville",
                "latitude": "44.16682000",
                "longitude": "-77.38277000"
            },
            {
                "id": 16212,
                "name": "Bells Corners",
                "latitude": "45.31588000",
                "longitude": "-75.83012000"
            },
            {
                "id": 16213,
                "name": "Belmont",
                "latitude": "42.88339000",
                "longitude": "-81.08303000"
            },
            {
                "id": 16218,
                "name": "Binbrook",
                "latitude": "43.12135000",
                "longitude": "-79.81104000"
            },
            {
                "id": 16222,
                "name": "Bluewater",
                "latitude": "43.46679000",
                "longitude": "-81.59977000"
            },
            {
                "id": 16233,
                "name": "Bourget",
                "latitude": "45.43340000",
                "longitude": "-75.14930000"
            },
            {
                "id": 16236,
                "name": "Bracebridge",
                "latitude": "45.03341000",
                "longitude": "-79.31633000"
            },
            {
                "id": 16237,
                "name": "Brampton",
                "latitude": "43.68341000",
                "longitude": "-79.76633000"
            },
            {
                "id": 16239,
                "name": "Brant",
                "latitude": "43.13340000",
                "longitude": "-80.34967000"
            },
            {
                "id": 16240,
                "name": "Brantford",
                "latitude": "43.13340000",
                "longitude": "-80.26636000"
            },
            {
                "id": 16243,
                "name": "Brockville",
                "latitude": "44.59132000",
                "longitude": "-75.68705000"
            },
            {
                "id": 16248,
                "name": "Brussels",
                "latitude": "43.73339000",
                "longitude": "-81.24975000"
            },
            {
                "id": 16250,
                "name": "Burford",
                "latitude": "43.10292000",
                "longitude": "-80.42869000"
            },
            {
                "id": 16252,
                "name": "Burlington",
                "latitude": "43.38621000",
                "longitude": "-79.83713000"
            },
            {
                "id": 16261,
                "name": "Cambridge",
                "latitude": "43.36010000",
                "longitude": "-80.31269000"
            },
            {
                "id": 16262,
                "name": "Camlachie",
                "latitude": "43.03596000",
                "longitude": "-82.16160000"
            },
            {
                "id": 16274,
                "name": "Capreol",
                "latitude": "46.70626000",
                "longitude": "-80.92109000"
            },
            {
                "id": 16280,
                "name": "Carleton Place",
                "latitude": "45.13341000",
                "longitude": "-76.14938000"
            },
            {
                "id": 16285,
                "name": "Casselman",
                "latitude": "45.31680000",
                "longitude": "-75.08260000"
            },
            {
                "id": 16299,
                "name": "Chatham",
                "latitude": "42.41224000",
                "longitude": "-82.18494000"
            },
            {
                "id": 16300,
                "name": "Chatham-Kent",
                "latitude": "42.40009000",
                "longitude": "-82.18310000"
            },
            {
                "id": 16312,
                "name": "Clarence-Rockland",
                "latitude": "45.55010000",
                "longitude": "-75.29101000"
            },
            {
                "id": 16319,
                "name": "Cobourg",
                "latitude": "43.95977000",
                "longitude": "-78.16515000"
            },
            {
                "id": 16321,
                "name": "Cochrane District",
                "latitude": "50.00022000",
                "longitude": "-82.99979000"
            },
            {
                "id": 16325,
                "name": "Collingwood",
                "latitude": "44.48340000",
                "longitude": "-80.21638000"
            },
            {
                "id": 16328,
                "name": "Concord",
                "latitude": "43.80011000",
                "longitude": "-79.48291000"
            },
            {
                "id": 16329,
                "name": "Constance Bay",
                "latitude": "45.50011000",
                "longitude": "-76.08267000"
            },
            {
                "id": 16333,
                "name": "Cookstown",
                "latitude": "44.18341000",
                "longitude": "-79.69964000"
            },
            {
                "id": 16337,
                "name": "Cornwall",
                "latitude": "45.01809000",
                "longitude": "-74.72815000"
            },
            {
                "id": 16339,
                "name": "Corunna",
                "latitude": "42.88338000",
                "longitude": "-82.43313000"
            },
            {
                "id": 16361,
                "name": "Deep River",
                "latitude": "46.10012000",
                "longitude": "-77.49949000"
            },
            {
                "id": 16363,
                "name": "Delaware",
                "latitude": "42.91679000",
                "longitude": "-81.41646000"
            },
            {
                "id": 16369,
                "name": "Deseronto",
                "latitude": "44.20012000",
                "longitude": "-77.04944000"
            },
            {
                "id": 16380,
                "name": "Dorchester",
                "latitude": "42.98339000",
                "longitude": "-81.06643000"
            },
            {
                "id": 16382,
                "name": "Dowling",
                "latitude": "46.59111000",
                "longitude": "-81.33917000"
            },
            {
                "id": 16385,
                "name": "Dryden",
                "latitude": "49.78334000",
                "longitude": "-92.75032000"
            },
            {
                "id": 16389,
                "name": "Durham",
                "latitude": "44.20012000",
                "longitude": "-78.99957000"
            },
            {
                "id": 16390,
                "name": "Ear Falls",
                "latitude": "50.63955000",
                "longitude": "-93.23526000"
            },
            {
                "id": 16393,
                "name": "East Gwillimbury",
                "latitude": "44.10087000",
                "longitude": "-79.43785000"
            },
            {
                "id": 16395,
                "name": "East York",
                "latitude": "43.69053000",
                "longitude": "-79.32794000"
            },
            {
                "id": 16401,
                "name": "Elliot Lake",
                "latitude": "46.38336000",
                "longitude": "-82.63315000"
            },
            {
                "id": 16403,
                "name": "Elmvale",
                "latitude": "44.58340000",
                "longitude": "-79.86636000"
            },
            {
                "id": 16405,
                "name": "Englehart",
                "latitude": "47.81686000",
                "longitude": "-79.86640000"
            },
            {
                "id": 16408,
                "name": "Espanola",
                "latitude": "46.25837000",
                "longitude": "-81.76649000"
            },
            {
                "id": 16409,
                "name": "Essex",
                "latitude": "42.17509000",
                "longitude": "-82.82483000"
            },
            {
                "id": 16412,
                "name": "Etobicoke",
                "latitude": "43.65421000",
                "longitude": "-79.56711000"
            },
            {
                "id": 16427,
                "name": "Fort Erie",
                "latitude": "42.90012000",
                "longitude": "-78.93286000"
            },
            {
                "id": 16428,
                "name": "Fort Frances",
                "latitude": "48.61667000",
                "longitude": "-93.40030000"
            },
            {
                "id": 16446,
                "name": "Gananoque",
                "latitude": "44.33342000",
                "longitude": "-76.16607000"
            },
            {
                "id": 16455,
                "name": "Glencoe",
                "latitude": "42.75009000",
                "longitude": "-81.71648000"
            },
            {
                "id": 16457,
                "name": "Goderich",
                "latitude": "43.74171000",
                "longitude": "-81.71339000"
            },
            {
                "id": 16459,
                "name": "Golden",
                "latitude": "51.05917000",
                "longitude": "-93.73568000"
            },
            {
                "id": 16470,
                "name": "Gravenhurst",
                "latitude": "44.91681000",
                "longitude": "-79.36633000"
            },
            {
                "id": 16472,
                "name": "Greater Napanee",
                "latitude": "44.25012000",
                "longitude": "-76.94944000"
            },
            {
                "id": 16473,
                "name": "Greater Sudbury",
                "latitude": "46.49000000",
                "longitude": "-80.99001000"
            },
            {
                "id": 16474,
                "name": "Greenstone",
                "latitude": "49.73343000",
                "longitude": "-87.16668000"
            },
            {
                "id": 16478,
                "name": "Guelph",
                "latitude": "43.54594000",
                "longitude": "-80.25599000"
            },
            {
                "id": 16480,
                "name": "Haldimand County",
                "latitude": "42.98341000",
                "longitude": "-79.86633000"
            },
            {
                "id": 16481,
                "name": "Haliburton Village",
                "latitude": "45.05154000",
                "longitude": "-78.52245000"
            },
            {
                "id": 16483,
                "name": "Halton",
                "latitude": "43.50011000",
                "longitude": "-79.88294000"
            },
            {
                "id": 16484,
                "name": "Hamilton",
                "latitude": "43.25011000",
                "longitude": "-79.84963000"
            },
            {
                "id": 16489,
                "name": "Hanover",
                "latitude": "44.15009000",
                "longitude": "-81.03303000"
            },
            {
                "id": 16494,
                "name": "Harriston",
                "latitude": "43.90009000",
                "longitude": "-80.88302000"
            },
            {
                "id": 16497,
                "name": "Hawkesbury",
                "latitude": "45.60009000",
                "longitude": "-74.61595000"
            },
            {
                "id": 16501,
                "name": "Hearst",
                "latitude": "49.68351000",
                "longitude": "-83.66654000"
            },
            {
                "id": 16509,
                "name": "Hornepayne",
                "latitude": "49.21451000",
                "longitude": "-84.77617000"
            },
            {
                "id": 16515,
                "name": "Huntsville",
                "latitude": "45.33341000",
                "longitude": "-79.21632000"
            },
            {
                "id": 16516,
                "name": "Huron East",
                "latitude": "43.61679000",
                "longitude": "-81.29975000"
            },
            {
                "id": 16520,
                "name": "Ingersoll",
                "latitude": "43.03339000",
                "longitude": "-80.88302000"
            },
            {
                "id": 16521,
                "name": "Innisfil",
                "latitude": "44.30011000",
                "longitude": "-79.64964000"
            },
            {
                "id": 16525,
                "name": "Iroquois Falls",
                "latitude": "48.76688000",
                "longitude": "-80.68307000"
            },
            {
                "id": 16527,
                "name": "Jarvis",
                "latitude": "42.88341000",
                "longitude": "-80.09965000"
            },
            {
                "id": 16533,
                "name": "Kanata",
                "latitude": "45.30010000",
                "longitude": "-75.91606000"
            },
            {
                "id": 16534,
                "name": "Kapuskasing",
                "latitude": "49.41694000",
                "longitude": "-82.43308000"
            },
            {
                "id": 16535,
                "name": "Kawartha Lakes",
                "latitude": "44.58342000",
                "longitude": "-78.83288000"
            },
            {
                "id": 16537,
                "name": "Kenora",
                "latitude": "49.76741000",
                "longitude": "-94.48985000"
            },
            {
                "id": 16541,
                "name": "Keswick",
                "latitude": "44.25011000",
                "longitude": "-79.46632000"
            },
            {
                "id": 16546,
                "name": "Kincardine",
                "latitude": "44.18339000",
                "longitude": "-81.63307000"
            },
            {
                "id": 16548,
                "name": "King",
                "latitude": "43.96514000",
                "longitude": "-79.59011000"
            },
            {
                "id": 16550,
                "name": "Kingston",
                "latitude": "44.22976000",
                "longitude": "-76.48098000"
            },
            {
                "id": 16552,
                "name": "Kirkland Lake",
                "latitude": "48.14461000",
                "longitude": "-80.03767000"
            },
            {
                "id": 16553,
                "name": "Kitchener",
                "latitude": "43.42537000",
                "longitude": "-80.51120000"
            },
            {
                "id": 16560,
                "name": "L'Orignal",
                "latitude": "45.61980000",
                "longitude": "-74.69150000"
            },
            {
                "id": 16590,
                "name": "Lakefield",
                "latitude": "44.43342000",
                "longitude": "-78.26623000"
            },
            {
                "id": 16591,
                "name": "Lambton Shores",
                "latitude": "43.16678000",
                "longitude": "-81.93309000"
            },
            {
                "id": 16601,
                "name": "Lappe",
                "latitude": "48.56680000",
                "longitude": "-89.35013000"
            },
            {
                "id": 16607,
                "name": "Leamington",
                "latitude": "42.05009000",
                "longitude": "-82.59981000"
            },
            {
                "id": 16617,
                "name": "Limoges",
                "latitude": "45.33340000",
                "longitude": "-75.24931000"
            },
            {
                "id": 16619,
                "name": "Lindsay",
                "latitude": "44.35012000",
                "longitude": "-78.73286000"
            },
            {
                "id": 16622,
                "name": "Listowel",
                "latitude": "43.73340000",
                "longitude": "-80.94973000"
            },
            {
                "id": 16623,
                "name": "Little Current",
                "latitude": "45.97927000",
                "longitude": "-81.92480000"
            },
            {
                "id": 16624,
                "name": "Lively",
                "latitude": "46.43338000",
                "longitude": "-81.14975000"
            },
            {
                "id": 16627,
                "name": "London",
                "latitude": "42.98339000",
                "longitude": "-81.23304000"
            },
            {
                "id": 16633,
                "name": "Lucan",
                "latitude": "43.18339000",
                "longitude": "-81.39976000"
            },
            {
                "id": 16643,
                "name": "Madoc",
                "latitude": "44.50842000",
                "longitude": "-77.47448000"
            },
            {
                "id": 16650,
                "name": "Manitoulin District",
                "latitude": "45.75007000",
                "longitude": "-82.49985000"
            },
            {
                "id": 16651,
                "name": "Manitouwadge",
                "latitude": "49.12152000",
                "longitude": "-85.84030000"
            },
            {
                "id": 16658,
                "name": "Marathon",
                "latitude": "48.75010000",
                "longitude": "-86.43322000"
            },
            {
                "id": 16661,
                "name": "Markdale",
                "latitude": "44.31680000",
                "longitude": "-80.64971000"
            },
            {
                "id": 16662,
                "name": "Markham",
                "latitude": "43.86682000",
                "longitude": "-79.26630000"
            },
            {
                "id": 16669,
                "name": "Mattawa",
                "latitude": "46.31681000",
                "longitude": "-78.69957000"
            },
            {
                "id": 16674,
                "name": "Meaford",
                "latitude": "44.60725000",
                "longitude": "-80.61081000"
            },
            {
                "id": 16683,
                "name": "Metcalfe",
                "latitude": "45.23340000",
                "longitude": "-75.46603000"
            },
            {
                "id": 16687,
                "name": "Midland",
                "latitude": "44.75010000",
                "longitude": "-79.88296000"
            },
            {
                "id": 16688,
                "name": "Mildmay",
                "latitude": "44.05009000",
                "longitude": "-81.11644000"
            },
            {
                "id": 16690,
                "name": "Millbrook",
                "latitude": "44.15012000",
                "longitude": "-78.44954000"
            },
            {
                "id": 16692,
                "name": "Milton",
                "latitude": "43.51681000",
                "longitude": "-79.88294000"
            },
            {
                "id": 16697,
                "name": "Mississauga",
                "latitude": "43.57890000",
                "longitude": "-79.65830000"
            },
            {
                "id": 16698,
                "name": "Mississauga Beach",
                "latitude": "43.26682000",
                "longitude": "-79.08287000"
            },
            {
                "id": 16712,
                "name": "Moose Factory",
                "latitude": "51.26689000",
                "longitude": "-80.61624000"
            },
            {
                "id": 16716,
                "name": "Moosonee",
                "latitude": "51.27931000",
                "longitude": "-80.63450000"
            },
            {
                "id": 16721,
                "name": "Morrisburg",
                "latitude": "44.90010000",
                "longitude": "-75.18261000"
            },
            {
                "id": 16722,
                "name": "Mount Albert",
                "latitude": "44.13341000",
                "longitude": "-79.31630000"
            },
            {
                "id": 16723,
                "name": "Mount Brydges",
                "latitude": "42.90009000",
                "longitude": "-81.48306000"
            },
            {
                "id": 16730,
                "name": "Napanee",
                "latitude": "44.25012000",
                "longitude": "-76.94944000"
            },
            {
                "id": 16731,
                "name": "Napanee Downtown",
                "latitude": "44.24832000",
                "longitude": "-76.95069000"
            },
            {
                "id": 16733,
                "name": "Neebing",
                "latitude": "48.16680000",
                "longitude": "-89.41683000"
            },
            {
                "id": 16736,
                "name": "Nepean",
                "latitude": "45.35215000",
                "longitude": "-75.73975000"
            },
            {
                "id": 16740,
                "name": "New Hamburg",
                "latitude": "43.38339000",
                "longitude": "-80.69970000"
            },
            {
                "id": 16744,
                "name": "Newmarket",
                "latitude": "44.05011000",
                "longitude": "-79.46631000"
            },
            {
                "id": 16745,
                "name": "Niagara Falls",
                "latitude": "43.10012000",
                "longitude": "-79.06627000"
            },
            {
                "id": 16748,
                "name": "Nipissing District",
                "latitude": "46.00010000",
                "longitude": "-78.99959000"
            },
            {
                "id": 16752,
                "name": "Norfolk County",
                "latitude": "42.83340000",
                "longitude": "-80.38297000"
            },
            {
                "id": 16756,
                "name": "North Bay",
                "latitude": "46.31680000",
                "longitude": "-79.46633000"
            },
            {
                "id": 16759,
                "name": "North Perth",
                "latitude": "43.72510000",
                "longitude": "-80.96723000"
            },
            {
                "id": 16762,
                "name": "North York",
                "latitude": "43.76681000",
                "longitude": "-79.41630000"
            },
            {
                "id": 16763,
                "name": "Norwood",
                "latitude": "44.38342000",
                "longitude": "-77.98281000"
            },
            {
                "id": 16770,
                "name": "Oakville",
                "latitude": "43.45011000",
                "longitude": "-79.68292000"
            },
            {
                "id": 16777,
                "name": "Omemee",
                "latitude": "44.29897000",
                "longitude": "-78.55989000"
            },
            {
                "id": 16778,
                "name": "Orangeville",
                "latitude": "43.91680000",
                "longitude": "-80.09967000"
            },
            {
                "id": 16779,
                "name": "Orillia",
                "latitude": "44.60868000",
                "longitude": "-79.42068000"
            },
            {
                "id": 16782,
                "name": "Osgoode",
                "latitude": "45.14887000",
                "longitude": "-75.59778000"
            },
            {
                "id": 16783,
                "name": "Oshawa",
                "latitude": "43.90012000",
                "longitude": "-78.84957000"
            },
            {
                "id": 16785,
                "name": "Ottawa",
                "latitude": "45.41117000",
                "longitude": "-75.69812000"
            },
            {
                "id": 16789,
                "name": "Owen Sound",
                "latitude": "44.56717000",
                "longitude": "-80.94349000"
            },
            {
                "id": 16792,
                "name": "Paisley",
                "latitude": "44.30641000",
                "longitude": "-81.27265000"
            },
            {
                "id": 16796,
                "name": "Paris",
                "latitude": "43.20000000",
                "longitude": "-80.38333000"
            },
            {
                "id": 16797,
                "name": "Parkhill",
                "latitude": "43.15993000",
                "longitude": "-81.68464000"
            },
            {
                "id": 16800,
                "name": "Parry Sound",
                "latitude": "45.34732000",
                "longitude": "-80.03527000"
            },
            {
                "id": 16801,
                "name": "Parry Sound District",
                "latitude": "45.75011000",
                "longitude": "-79.83297000"
            },
            {
                "id": 16806,
                "name": "Peel",
                "latitude": "43.75011000",
                "longitude": "-79.78293000"
            },
            {
                "id": 16809,
                "name": "Pembroke",
                "latitude": "45.81681000",
                "longitude": "-77.11616000"
            },
            {
                "id": 16812,
                "name": "Perth",
                "latitude": "44.90011000",
                "longitude": "-76.24939000"
            },
            {
                "id": 16813,
                "name": "Petawawa",
                "latitude": "45.89452000",
                "longitude": "-77.28007000"
            },
            {
                "id": 16814,
                "name": "Peterborough",
                "latitude": "44.30012000",
                "longitude": "-78.31623000"
            },
            {
                "id": 16815,
                "name": "Petrolia",
                "latitude": "42.86678000",
                "longitude": "-82.14981000"
            },
            {
                "id": 16816,
                "name": "Pickering",
                "latitude": "43.90012000",
                "longitude": "-79.13289000"
            },
            {
                "id": 16817,
                "name": "Picton",
                "latitude": "44.00012000",
                "longitude": "-77.13275000"
            },
            {
                "id": 16827,
                "name": "Plantagenet",
                "latitude": "45.53260000",
                "longitude": "-74.99369000"
            },
            {
                "id": 16828,
                "name": "Plattsville",
                "latitude": "43.30010000",
                "longitude": "-80.61639000"
            },
            {
                "id": 16838,
                "name": "Port Colborne",
                "latitude": "42.90012000",
                "longitude": "-79.23288000"
            },
            {
                "id": 16841,
                "name": "Port Hope",
                "latitude": "44.01682000",
                "longitude": "-78.39953000"
            },
            {
                "id": 16844,
                "name": "Port Rowan",
                "latitude": "42.61680000",
                "longitude": "-80.46638000"
            },
            {
                "id": 16845,
                "name": "Port Stanley",
                "latitude": "42.66679000",
                "longitude": "-81.21644000"
            },
            {
                "id": 16850,
                "name": "Powassan",
                "latitude": "46.03340000",
                "longitude": "-79.34961000"
            },
            {
                "id": 16853,
                "name": "Prescott",
                "latitude": "44.71681000",
                "longitude": "-75.51604000"
            },
            {
                "id": 16855,
                "name": "Prince Edward",
                "latitude": "44.00012000",
                "longitude": "-77.24946000"
            },
            {
                "id": 16864,
                "name": "Queenswood Heights",
                "latitude": "45.47083000",
                "longitude": "-75.50556000"
            },
            {
                "id": 16866,
                "name": "Quinte West",
                "latitude": "44.18342000",
                "longitude": "-77.56618000"
            },
            {
                "id": 16868,
                "name": "Rainy River District",
                "latitude": "48.49981000",
                "longitude": "-92.50031000"
            },
            {
                "id": 16872,
                "name": "Rayside-Balfour",
                "latitude": "46.60873000",
                "longitude": "-81.20763000"
            },
            {
                "id": 16874,
                "name": "Red Lake",
                "latitude": "51.01678000",
                "longitude": "-93.82736000"
            },
            {
                "id": 16879,
                "name": "Regional Municipality of Waterloo",
                "latitude": "43.50010000",
                "longitude": "-80.49969000"
            },
            {
                "id": 16880,
                "name": "Renfrew",
                "latitude": "45.46681000",
                "longitude": "-76.68272000"
            },
            {
                "id": 16887,
                "name": "Richmond",
                "latitude": "45.18340000",
                "longitude": "-75.83266000"
            },
            {
                "id": 16888,
                "name": "Richmond Hill",
                "latitude": "43.87111000",
                "longitude": "-79.43725000"
            },
            {
                "id": 16890,
                "name": "Ridgetown",
                "latitude": "42.43339000",
                "longitude": "-81.89978000"
            },
            {
                "id": 16900,
                "name": "Rockwood",
                "latitude": "43.61899000",
                "longitude": "-80.14441000"
            },
            {
                "id": 16909,
                "name": "Russell",
                "latitude": "45.25010000",
                "longitude": "-75.36602000"
            },
            {
                "id": 17020,
                "name": "Sarnia",
                "latitude": "42.97866000",
                "longitude": "-82.40407000"
            },
            {
                "id": 17022,
                "name": "Sault Ste. Marie",
                "latitude": "46.51677000",
                "longitude": "-84.33325000"
            },
            {
                "id": 17023,
                "name": "Scarborough",
                "latitude": "43.77223000",
                "longitude": "-79.25666000"
            },
            {
                "id": 17024,
                "name": "Seaforth",
                "latitude": "43.55009000",
                "longitude": "-81.39976000"
            },
            {
                "id": 17036,
                "name": "Shelburne",
                "latitude": "44.07870000",
                "longitude": "-80.20408000"
            },
            {
                "id": 17045,
                "name": "Simcoe",
                "latitude": "42.83340000",
                "longitude": "-80.29967000"
            },
            {
                "id": 17046,
                "name": "Sioux Lookout",
                "latitude": "50.06676000",
                "longitude": "-91.98358000"
            },
            {
                "id": 17048,
                "name": "Skatepark",
                "latitude": "44.25122000",
                "longitude": "-76.94424000"
            },
            {
                "id": 17051,
                "name": "Smiths Falls",
                "latitude": "44.90452000",
                "longitude": "-76.02333000"
            },
            {
                "id": 17057,
                "name": "South Huron",
                "latitude": "43.31679000",
                "longitude": "-81.51647000"
            },
            {
                "id": 17059,
                "name": "South River",
                "latitude": "45.83340000",
                "longitude": "-79.38293000"
            },
            {
                "id": 17070,
                "name": "St. Catharines",
                "latitude": "43.17126000",
                "longitude": "-79.24267000"
            },
            {
                "id": 17071,
                "name": "St. George",
                "latitude": "43.24495000",
                "longitude": "-80.25144000"
            },
            {
                "id": 17073,
                "name": "St. Thomas",
                "latitude": "42.77361000",
                "longitude": "-81.18038000"
            },
            {
                "id": 17079,
                "name": "Stirling",
                "latitude": "44.30012000",
                "longitude": "-77.54948000"
            },
            {
                "id": 17081,
                "name": "Stoney Point",
                "latitude": "44.26681000",
                "longitude": "-79.53292000"
            },
            {
                "id": 17083,
                "name": "Stratford",
                "latitude": "43.36679000",
                "longitude": "-80.94972000"
            },
            {
                "id": 17085,
                "name": "Sudbury",
                "latitude": "47.16679000",
                "longitude": "-81.99980000"
            },
            {
                "id": 17100,
                "name": "Tavistock",
                "latitude": "43.31679000",
                "longitude": "-80.83302000"
            },
            {
                "id": 17101,
                "name": "Temiskaming Shores",
                "latitude": "47.49376000",
                "longitude": "-79.71529000"
            },
            {
                "id": 17106,
                "name": "Thessalon",
                "latitude": "46.25006000",
                "longitude": "-83.56660000"
            },
            {
                "id": 17109,
                "name": "Thorold",
                "latitude": "43.11682000",
                "longitude": "-79.19958000"
            },
            {
                "id": 17111,
                "name": "Thunder Bay",
                "latitude": "48.38202000",
                "longitude": "-89.25018000"
            },
            {
                "id": 17112,
                "name": "Thunder Bay District",
                "latitude": "49.50011000",
                "longitude": "-88.50004000"
            },
            {
                "id": 17114,
                "name": "Timiskaming District",
                "latitude": "47.75016000",
                "longitude": "-80.33303000"
            },
            {
                "id": 17115,
                "name": "Timmins",
                "latitude": "48.46686000",
                "longitude": "-81.33312000"
            },
            {
                "id": 17117,
                "name": "Tobermory",
                "latitude": "45.25007000",
                "longitude": "-81.66647000"
            },
            {
                "id": 17121,
                "name": "Toronto",
                "latitude": "43.70011000",
                "longitude": "-79.41630000"
            },
            {
                "id": 17122,
                "name": "Toronto county",
                "latitude": "43.69655000",
                "longitude": "-79.42909000"
            },
            {
                "id": 17123,
                "name": "Tottenham",
                "latitude": "44.02437000",
                "longitude": "-79.80553000"
            },
            {
                "id": 17130,
                "name": "Tweed",
                "latitude": "44.47512000",
                "longitude": "-77.31616000"
            },
            {
                "id": 17136,
                "name": "Uxbridge",
                "latitude": "44.10012000",
                "longitude": "-79.11628000"
            },
            {
                "id": 17142,
                "name": "Valley East",
                "latitude": "46.66773000",
                "longitude": "-81.00028000"
            },
            {
                "id": 17147,
                "name": "Vanier",
                "latitude": "45.43990000",
                "longitude": "-75.66498000"
            },
            {
                "id": 17150,
                "name": "Vaughan",
                "latitude": "43.83610000",
                "longitude": "-79.49827000"
            },
            {
                "id": 17160,
                "name": "Vineland",
                "latitude": "43.15012000",
                "longitude": "-79.39960000"
            },
            {
                "id": 17162,
                "name": "Virgil",
                "latitude": "43.21682000",
                "longitude": "-79.13288000"
            },
            {
                "id": 17169,
                "name": "Walpole Island",
                "latitude": "42.61520000",
                "longitude": "-82.51398000"
            },
            {
                "id": 17172,
                "name": "Wasaga Beach",
                "latitude": "44.51680000",
                "longitude": "-80.01637000"
            },
            {
                "id": 17175,
                "name": "Waterford",
                "latitude": "42.93340000",
                "longitude": "-80.28296000"
            },
            {
                "id": 17176,
                "name": "Waterloo",
                "latitude": "43.46680000",
                "longitude": "-80.51639000"
            },
            {
                "id": 17178,
                "name": "Watford",
                "latitude": "42.95008000",
                "longitude": "-81.88309000"
            },
            {
                "id": 17181,
                "name": "Wawa",
                "latitude": "47.98877000",
                "longitude": "-84.77411000"
            },
            {
                "id": 17184,
                "name": "Welland",
                "latitude": "42.98342000",
                "longitude": "-79.24958000"
            },
            {
                "id": 17185,
                "name": "Wellesley",
                "latitude": "43.47691000",
                "longitude": "-80.76209000"
            },
            {
                "id": 17188,
                "name": "Wendover",
                "latitude": "45.57275000",
                "longitude": "-75.12757000"
            },
            {
                "id": 17191,
                "name": "West Lorne",
                "latitude": "42.60009000",
                "longitude": "-81.59976000"
            },
            {
                "id": 17208,
                "name": "Willowdale",
                "latitude": "43.76672000",
                "longitude": "-79.39909000"
            },
            {
                "id": 17209,
                "name": "Winchester",
                "latitude": "45.08340000",
                "longitude": "-75.34933000"
            },
            {
                "id": 17212,
                "name": "Windsor",
                "latitude": "42.30008000",
                "longitude": "-83.01654000"
            },
            {
                "id": 17213,
                "name": "Wingham",
                "latitude": "43.88793000",
                "longitude": "-81.31145000"
            },
            {
                "id": 17217,
                "name": "Woodstock",
                "latitude": "43.13339000",
                "longitude": "-80.74970000"
            },
            {
                "id": 17222,
                "name": "York",
                "latitude": "44.00011000",
                "longitude": "-79.46632000"
            }
        ]
    },
    {
        "id": 871,
        "name": "Prince Edward Island",
        "state_code": "PE",
        "cities": [
            {
                "id": 16154,
                "name": "Alberton",
                "latitude": "46.81685000",
                "longitude": "-64.06542000"
            },
            {
                "id": 16210,
                "name": "Belfast",
                "latitude": "46.08341000",
                "longitude": "-62.88197000"
            },
            {
                "id": 16297,
                "name": "Charlottetown",
                "latitude": "46.23899000",
                "longitude": "-63.13414000"
            },
            {
                "id": 16338,
                "name": "Cornwall",
                "latitude": "46.22652000",
                "longitude": "-63.21809000"
            },
            {
                "id": 16417,
                "name": "Fallingbrook",
                "latitude": "45.47558000",
                "longitude": "-75.48401000"
            },
            {
                "id": 16538,
                "name": "Kensington",
                "latitude": "46.43343000",
                "longitude": "-63.64871000"
            },
            {
                "id": 16707,
                "name": "Montague",
                "latitude": "46.16681000",
                "longitude": "-62.64866000"
            },
            {
                "id": 17055,
                "name": "Souris",
                "latitude": "46.35010000",
                "longitude": "-62.24862000"
            },
            {
                "id": 17087,
                "name": "Summerside",
                "latitude": "46.39593000",
                "longitude": "-63.78762000"
            }
        ]
    },
    {
        "id": 873,
        "name": "Quebec",
        "state_code": "QC",
        "cities": [
            {
                "id": 16147,
                "name": "Abitibi-Témiscamingue",
                "latitude": "48.10018000",
                "longitude": "-77.78280000"
            },
            {
                "id": 16148,
                "name": "Acton Vale",
                "latitude": "45.65007000",
                "longitude": "-72.56582000"
            },
            {
                "id": 16149,
                "name": "Adstock",
                "latitude": "46.05007000",
                "longitude": "-71.08235000"
            },
            {
                "id": 16153,
                "name": "Albanel",
                "latitude": "48.88324000",
                "longitude": "-72.44867000"
            },
            {
                "id": 16159,
                "name": "Alma",
                "latitude": "48.55009000",
                "longitude": "-71.64910000"
            },
            {
                "id": 16164,
                "name": "Amos",
                "latitude": "48.56688000",
                "longitude": "-78.11624000"
            },
            {
                "id": 16165,
                "name": "Amqui",
                "latitude": "48.46382000",
                "longitude": "-67.43134000"
            },
            {
                "id": 16167,
                "name": "Ange-Gardien",
                "latitude": "45.35008000",
                "longitude": "-72.93244000"
            },
            {
                "id": 16175,
                "name": "Asbestos",
                "latitude": "45.76678000",
                "longitude": "-71.93240000"
            },
            {
                "id": 16185,
                "name": "Baie-Comeau",
                "latitude": "49.21679000",
                "longitude": "-68.14894000"
            },
            {
                "id": 16186,
                "name": "Baie-D'Urfé",
                "latitude": "45.41397000",
                "longitude": "-73.91586000"
            },
            {
                "id": 16187,
                "name": "Baie-Saint-Paul",
                "latitude": "47.44109000",
                "longitude": "-70.49858000"
            },
            {
                "id": 16191,
                "name": "Barraute",
                "latitude": "48.43349000",
                "longitude": "-77.63279000"
            },
            {
                "id": 16195,
                "name": "Bas-Saint-Laurent",
                "latitude": "48.05030000",
                "longitude": "-68.02266000"
            },
            {
                "id": 16201,
                "name": "Beaconsfield",
                "latitude": "45.43341000",
                "longitude": "-73.86586000"
            },
            {
                "id": 16202,
                "name": "Beauceville",
                "latitude": "46.21785000",
                "longitude": "-70.77873000"
            },
            {
                "id": 16203,
                "name": "Beauharnois",
                "latitude": "45.31341000",
                "longitude": "-73.87250000"
            },
            {
                "id": 16205,
                "name": "Beaupré",
                "latitude": "47.04428000",
                "longitude": "-70.89529000"
            },
            {
                "id": 16255,
                "name": "Bécancour",
                "latitude": "46.34106000",
                "longitude": "-72.43224000"
            },
            {
                "id": 16208,
                "name": "Bedford",
                "latitude": "45.11678000",
                "longitude": "-72.98244000"
            },
            {
                "id": 16214,
                "name": "Beloeil",
                "latitude": "45.56839000",
                "longitude": "-73.20568000"
            },
            {
                "id": 16215,
                "name": "Berthierville",
                "latitude": "46.08336000",
                "longitude": "-73.18245000"
            },
            {
                "id": 16221,
                "name": "Blainville",
                "latitude": "45.66678000",
                "longitude": "-73.88249000"
            },
            {
                "id": 16223,
                "name": "Bois-des-Filion",
                "latitude": "45.66678000",
                "longitude": "-73.74918000"
            },
            {
                "id": 16224,
                "name": "Boisbriand",
                "latitude": "45.61678000",
                "longitude": "-73.83249000"
            },
            {
                "id": 16227,
                "name": "Bonaventure",
                "latitude": "48.04573000",
                "longitude": "-65.49259000"
            },
            {
                "id": 16231,
                "name": "Boucherville",
                "latitude": "45.59104000",
                "longitude": "-73.43605000"
            },
            {
                "id": 16241,
                "name": "Breakeyville",
                "latitude": "46.68037000",
                "longitude": "-71.22327000"
            },
            {
                "id": 16244,
                "name": "Bromont",
                "latitude": "45.31678000",
                "longitude": "-72.64912000"
            },
            {
                "id": 16246,
                "name": "Brossard",
                "latitude": "45.45008000",
                "longitude": "-73.46583000"
            },
            {
                "id": 16247,
                "name": "Brownsburg-Chatham",
                "latitude": "45.68342000",
                "longitude": "-74.41590000"
            },
            {
                "id": 16249,
                "name": "Buckingham",
                "latitude": "45.58563000",
                "longitude": "-75.42080000"
            },
            {
                "id": 16256,
                "name": "Cabano",
                "latitude": "47.68065000",
                "longitude": "-68.87810000"
            },
            {
                "id": 16258,
                "name": "Cacouna",
                "latitude": "47.91657000",
                "longitude": "-69.50054000"
            },
            {
                "id": 16266,
                "name": "Candiac",
                "latitude": "45.38338000",
                "longitude": "-73.51587000"
            },
            {
                "id": 16269,
                "name": "Cantley",
                "latitude": "45.56680000",
                "longitude": "-75.78265000"
            },
            {
                "id": 16270,
                "name": "Cap-Chat",
                "latitude": "49.10009000",
                "longitude": "-66.68212000"
            },
            {
                "id": 16271,
                "name": "Cap-Santé",
                "latitude": "46.67159000",
                "longitude": "-71.78812000"
            },
            {
                "id": 16273,
                "name": "Capitale-Nationale",
                "latitude": "47.37600000",
                "longitude": "-71.12337000"
            },
            {
                "id": 16278,
                "name": "Carignan",
                "latitude": "45.45008000",
                "longitude": "-73.29916000"
            },
            {
                "id": 16279,
                "name": "Carleton",
                "latitude": "48.09838000",
                "longitude": "-66.10036000"
            },
            {
                "id": 16281,
                "name": "Carleton-sur-Mer",
                "latitude": "48.10749000",
                "longitude": "-66.12800000"
            },
            {
                "id": 16290,
                "name": "Centre-du-Québec",
                "latitude": "46.01985000",
                "longitude": "-71.98242000"
            },
            {
                "id": 16291,
                "name": "Chambly",
                "latitude": "45.45008000",
                "longitude": "-73.28246000"
            },
            {
                "id": 16292,
                "name": "Chambord",
                "latitude": "48.43339000",
                "longitude": "-72.06583000"
            },
            {
                "id": 16293,
                "name": "Chandler",
                "latitude": "48.34935000",
                "longitude": "-64.67926000"
            },
            {
                "id": 16295,
                "name": "Chapais",
                "latitude": "49.78344000",
                "longitude": "-74.84919000"
            },
            {
                "id": 16296,
                "name": "Charlemagne",
                "latitude": "45.71678000",
                "longitude": "-73.48247000"
            },
            {
                "id": 16310,
                "name": "Château-Richer",
                "latitude": "46.96031000",
                "longitude": "-71.03219000"
            },
            {
                "id": 16311,
                "name": "Châteauguay",
                "latitude": "45.38338000",
                "longitude": "-73.74919000"
            },
            {
                "id": 16301,
                "name": "Chaudière-Appalaches",
                "latitude": "46.55500000",
                "longitude": "-70.83080000"
            },
            {
                "id": 16303,
                "name": "Chertsey",
                "latitude": "46.07109000",
                "longitude": "-73.89095000"
            },
            {
                "id": 16307,
                "name": "Chibougamau",
                "latitude": "49.91684000",
                "longitude": "-74.36586000"
            },
            {
                "id": 16309,
                "name": "Chute-aux-Outardes",
                "latitude": "49.11679000",
                "longitude": "-68.39896000"
            },
            {
                "id": 16318,
                "name": "Coaticook",
                "latitude": "45.13339000",
                "longitude": "-71.79907000"
            },
            {
                "id": 16330,
                "name": "Contrecoeur",
                "latitude": "45.85008000",
                "longitude": "-73.23245000"
            },
            {
                "id": 16331,
                "name": "Cookshire",
                "latitude": "45.41536000",
                "longitude": "-71.62962000"
            },
            {
                "id": 16332,
                "name": "Cookshire-Eaton",
                "latitude": "45.41675000",
                "longitude": "-71.63240000"
            },
            {
                "id": 16351,
                "name": "Côte-Nord",
                "latitude": "50.86683000",
                "longitude": "-65.81541000"
            },
            {
                "id": 16352,
                "name": "Côte-Saint-Luc",
                "latitude": "45.46536000",
                "longitude": "-73.66585000"
            },
            {
                "id": 16340,
                "name": "Coteau-du-Lac",
                "latitude": "45.30008000",
                "longitude": "-74.18253000"
            },
            {
                "id": 16343,
                "name": "Cowansville",
                "latitude": "45.20008000",
                "longitude": "-72.74913000"
            },
            {
                "id": 16345,
                "name": "Crabtree",
                "latitude": "45.96677000",
                "longitude": "-73.46586000"
            },
            {
                "id": 16354,
                "name": "Danville",
                "latitude": "45.78337000",
                "longitude": "-72.01580000"
            },
            {
                "id": 16357,
                "name": "Daveluyville",
                "latitude": "46.20006000",
                "longitude": "-72.13239000"
            },
            {
                "id": 16365,
                "name": "Delson",
                "latitude": "45.36678000",
                "longitude": "-73.54917000"
            },
            {
                "id": 16370,
                "name": "Deux-Montagnes",
                "latitude": "45.53455000",
                "longitude": "-73.90168000"
            },
            {
                "id": 16376,
                "name": "Disraeli",
                "latitude": "45.90007000",
                "longitude": "-71.34907000"
            },
            {
                "id": 16377,
                "name": "Dolbeau-Mistassini",
                "latitude": "48.87860000",
                "longitude": "-72.23142000"
            },
            {
                "id": 16378,
                "name": "Dollard-Des Ormeaux",
                "latitude": "45.49452000",
                "longitude": "-73.82419000"
            },
            {
                "id": 16379,
                "name": "Donnacona",
                "latitude": "46.68042000",
                "longitude": "-71.72390000"
            },
            {
                "id": 16381,
                "name": "Dorval",
                "latitude": "45.44730000",
                "longitude": "-73.75335000"
            },
            {
                "id": 16384,
                "name": "Drummondville",
                "latitude": "45.88336000",
                "longitude": "-72.48241000"
            },
            {
                "id": 16388,
                "name": "Dunham",
                "latitude": "45.13338000",
                "longitude": "-72.79913000"
            },
            {
                "id": 16391,
                "name": "East Angus",
                "latitude": "45.48338000",
                "longitude": "-71.66577000"
            },
            {
                "id": 16392,
                "name": "East Broughton",
                "latitude": "46.21358000",
                "longitude": "-71.07674000"
            },
            {
                "id": 16418,
                "name": "Farnham",
                "latitude": "45.28338000",
                "longitude": "-72.98244000"
            },
            {
                "id": 16419,
                "name": "Ferme-Neuve",
                "latitude": "46.70011000",
                "longitude": "-75.44929000"
            },
            {
                "id": 16420,
                "name": "Fermont",
                "latitude": "52.78345000",
                "longitude": "-67.08204000"
            },
            {
                "id": 16426,
                "name": "Forestville",
                "latitude": "48.73808000",
                "longitude": "-69.08478000"
            },
            {
                "id": 16436,
                "name": "Fort-Coulonge",
                "latitude": "45.85011000",
                "longitude": "-76.73272000"
            },
            {
                "id": 16437,
                "name": "Fossambault-sur-le-Lac",
                "latitude": "46.87662000",
                "longitude": "-71.61541000"
            },
            {
                "id": 16439,
                "name": "Franklin",
                "latitude": "45.03338000",
                "longitude": "-73.91591000"
            },
            {
                "id": 16447,
                "name": "Gaspé",
                "latitude": "48.83341000",
                "longitude": "-64.48194000"
            },
            {
                "id": 16448,
                "name": "Gaspésie-Îles-de-la-Madeleine",
                "latitude": "48.87555000",
                "longitude": "-65.40710000"
            },
            {
                "id": 16449,
                "name": "Gatineau",
                "latitude": "45.47723000",
                "longitude": "-75.70164000"
            },
            {
                "id": 16456,
                "name": "Godefroy",
                "latitude": "51.75012000",
                "longitude": "-68.08213000"
            },
            {
                "id": 16461,
                "name": "Granby",
                "latitude": "45.40008000",
                "longitude": "-72.73243000"
            },
            {
                "id": 16485,
                "name": "Hampstead",
                "latitude": "45.48064000",
                "longitude": "-73.66307000"
            },
            {
                "id": 16495,
                "name": "Hauterive",
                "latitude": "49.19572000",
                "longitude": "-68.25813000"
            },
            {
                "id": 16496,
                "name": "Havre-Saint-Pierre",
                "latitude": "50.24342000",
                "longitude": "-63.60264000"
            },
            {
                "id": 16517,
                "name": "Hérouxville",
                "latitude": "46.66617000",
                "longitude": "-72.62512000"
            },
            {
                "id": 16511,
                "name": "Hudson",
                "latitude": "45.45008000",
                "longitude": "-74.14922000"
            },
            {
                "id": 16514,
                "name": "Huntingdon",
                "latitude": "45.08339000",
                "longitude": "-74.16593000"
            },
            {
                "id": 16529,
                "name": "Joliette",
                "latitude": "46.01640000",
                "longitude": "-73.42360000"
            },
            {
                "id": 16530,
                "name": "Jonquière",
                "latitude": "48.41648000",
                "longitude": "-71.24884000"
            },
            {
                "id": 16549,
                "name": "Kingsey Falls",
                "latitude": "45.85007000",
                "longitude": "-72.06580000"
            },
            {
                "id": 16551,
                "name": "Kirkland",
                "latitude": "45.45008000",
                "longitude": "-73.86586000"
            },
            {
                "id": 16556,
                "name": "L'Ancienne-Lorette",
                "latitude": "46.79392000",
                "longitude": "-71.35191000"
            },
            {
                "id": 16557,
                "name": "L'Ange-Gardien",
                "latitude": "46.91976000",
                "longitude": "-71.08253000"
            },
            {
                "id": 16558,
                "name": "L'Ascension-de-Notre-Seigneur",
                "latitude": "48.68339000",
                "longitude": "-71.66580000"
            },
            {
                "id": 16559,
                "name": "L'Assomption",
                "latitude": "45.82318000",
                "longitude": "-73.42940000"
            },
            {
                "id": 16561,
                "name": "L'Épiphanie",
                "latitude": "45.85008000",
                "longitude": "-73.48246000"
            },
            {
                "id": 16562,
                "name": "L'Île-Perrot",
                "latitude": "45.38338000",
                "longitude": "-73.94920000"
            },
            {
                "id": 16564,
                "name": "La Conception",
                "latitude": "46.15009000",
                "longitude": "-74.69925000"
            },
            {
                "id": 16565,
                "name": "La Haute-Saint-Charles",
                "latitude": "46.89028000",
                "longitude": "-71.37222000"
            },
            {
                "id": 16566,
                "name": "La Malbaie",
                "latitude": "47.65400000",
                "longitude": "-70.15268000"
            },
            {
                "id": 16567,
                "name": "La Minerve",
                "latitude": "46.25009000",
                "longitude": "-74.93257000"
            },
            {
                "id": 16568,
                "name": "La Pocatière",
                "latitude": "47.36733000",
                "longitude": "-70.03484000"
            },
            {
                "id": 16569,
                "name": "La Prairie",
                "latitude": "45.41678000",
                "longitude": "-73.49917000"
            },
            {
                "id": 16571,
                "name": "La Sarre",
                "latitude": "48.80019000",
                "longitude": "-79.19964000"
            },
            {
                "id": 16572,
                "name": "La Tuque",
                "latitude": "47.43337000",
                "longitude": "-72.78240000"
            },
            {
                "id": 16573,
                "name": "Labelle",
                "latitude": "46.28339000",
                "longitude": "-74.73255000"
            },
            {
                "id": 16577,
                "name": "Lac-Alouette",
                "latitude": "45.81698000",
                "longitude": "-73.95920000"
            },
            {
                "id": 16578,
                "name": "Lac-Brome",
                "latitude": "45.21678000",
                "longitude": "-72.51581000"
            },
            {
                "id": 16579,
                "name": "Lac-Connelly",
                "latitude": "45.89788000",
                "longitude": "-73.97230000"
            },
            {
                "id": 16580,
                "name": "Lac-Lapierre",
                "latitude": "45.89837000",
                "longitude": "-73.77308000"
            },
            {
                "id": 16581,
                "name": "Lac-Mégantic",
                "latitude": "45.58338000",
                "longitude": "-70.88234000"
            },
            {
                "id": 16582,
                "name": "Lac-Simon",
                "latitude": "46.15699000",
                "longitude": "-74.74129000"
            },
            {
                "id": 16583,
                "name": "Lachute",
                "latitude": "45.65008000",
                "longitude": "-74.33253000"
            },
            {
                "id": 16584,
                "name": "Lacolle",
                "latitude": "45.08338000",
                "longitude": "-73.36585000"
            },
            {
                "id": 16599,
                "name": "Lanoraie",
                "latitude": "45.96677000",
                "longitude": "-73.21585000"
            },
            {
                "id": 16604,
                "name": "Laval",
                "latitude": "45.56995000",
                "longitude": "-73.69200000"
            },
            {
                "id": 16605,
                "name": "Lavaltrie",
                "latitude": "45.88338000",
                "longitude": "-73.28245000"
            },
            {
                "id": 16606,
                "name": "Le Bic",
                "latitude": "48.37549000",
                "longitude": "-68.69415000"
            },
            {
                "id": 17224,
                "name": "le Plateau",
                "latitude": "45.43514000",
                "longitude": "-75.78030000"
            },
            {
                "id": 16608,
                "name": "Lebel-sur-Quévillon",
                "latitude": "49.05018000",
                "longitude": "-76.98273000"
            },
            {
                "id": 16609,
                "name": "Leblanc",
                "latitude": "48.26683000",
                "longitude": "-74.34914000"
            },
            {
                "id": 16612,
                "name": "Les Cèdres",
                "latitude": "45.30008000",
                "longitude": "-74.04922000"
            },
            {
                "id": 16611,
                "name": "Les Coteaux",
                "latitude": "45.28338000",
                "longitude": "-74.23254000"
            },
            {
                "id": 16613,
                "name": "Les Escoumins",
                "latitude": "48.35191000",
                "longitude": "-69.40724000"
            },
            {
                "id": 16639,
                "name": "Lévis",
                "latitude": "46.80326000",
                "longitude": "-71.17793000"
            },
            {
                "id": 16620,
                "name": "Linière",
                "latitude": "46.00007000",
                "longitude": "-70.41572000"
            },
            {
                "id": 16628,
                "name": "Longueuil",
                "latitude": "45.53121000",
                "longitude": "-73.51806000"
            },
            {
                "id": 16630,
                "name": "Lorraine",
                "latitude": "45.68338000",
                "longitude": "-73.78249000"
            },
            {
                "id": 16631,
                "name": "Louiseville",
                "latitude": "46.25594000",
                "longitude": "-72.94145000"
            },
            {
                "id": 16634,
                "name": "Luceville",
                "latitude": "48.54498000",
                "longitude": "-68.39658000"
            },
            {
                "id": 16640,
                "name": "Macamic",
                "latitude": "48.75018000",
                "longitude": "-78.99962000"
            },
            {
                "id": 16644,
                "name": "Magog",
                "latitude": "45.26678000",
                "longitude": "-72.14909000"
            },
            {
                "id": 16646,
                "name": "Malartic",
                "latitude": "48.13348000",
                "longitude": "-78.13283000"
            },
            {
                "id": 16647,
                "name": "Maliotenam",
                "latitude": "50.21119000",
                "longitude": "-66.18164000"
            },
            {
                "id": 16648,
                "name": "Manawan",
                "latitude": "47.22029000",
                "longitude": "-74.38606000"
            },
            {
                "id": 16649,
                "name": "Mandeville",
                "latitude": "46.36677000",
                "longitude": "-73.34915000"
            },
            {
                "id": 16652,
                "name": "Maniwaki",
                "latitude": "46.38341000",
                "longitude": "-75.96605000"
            },
            {
                "id": 16659,
                "name": "Maria",
                "latitude": "48.17490000",
                "longitude": "-65.98595000"
            },
            {
                "id": 16660,
                "name": "Marieville",
                "latitude": "45.43338000",
                "longitude": "-73.16585000"
            },
            {
                "id": 16665,
                "name": "Mascouche",
                "latitude": "45.74965000",
                "longitude": "-73.59956000"
            },
            {
                "id": 16666,
                "name": "Maskinongé",
                "latitude": "46.22860000",
                "longitude": "-73.01917000"
            },
            {
                "id": 16667,
                "name": "Matagami",
                "latitude": "49.75018000",
                "longitude": "-77.63277000"
            },
            {
                "id": 16668,
                "name": "Matane",
                "latitude": "48.82857000",
                "longitude": "-67.52197000"
            },
            {
                "id": 16670,
                "name": "Mauricie",
                "latitude": "47.55009000",
                "longitude": "-73.41583000"
            },
            {
                "id": 16678,
                "name": "Melocheville",
                "latitude": "45.31726000",
                "longitude": "-73.93710000"
            },
            {
                "id": 16680,
                "name": "Mercier",
                "latitude": "45.31678000",
                "longitude": "-73.74919000"
            },
            {
                "id": 16725,
                "name": "Métabetchouan",
                "latitude": "48.36679000",
                "longitude": "-72.01583000"
            },
            {
                "id": 16682,
                "name": "Metabetchouan-Lac-a-la-Croix",
                "latitude": "48.41000000",
                "longitude": "-71.78000000"
            },
            {
                "id": 16694,
                "name": "Mirabel",
                "latitude": "45.65008000",
                "longitude": "-74.08251000"
            },
            {
                "id": 16699,
                "name": "Mistissini",
                "latitude": "50.41667000",
                "longitude": "-73.88333000"
            },
            {
                "id": 16701,
                "name": "Mont-Joli",
                "latitude": "48.58388000",
                "longitude": "-68.19214000"
            },
            {
                "id": 16702,
                "name": "Mont-Laurier",
                "latitude": "46.55011000",
                "longitude": "-75.49930000"
            },
            {
                "id": 16703,
                "name": "Mont-Royal",
                "latitude": "45.51675000",
                "longitude": "-73.64918000"
            },
            {
                "id": 16704,
                "name": "Mont-Saint-Grégoire",
                "latitude": "45.33338000",
                "longitude": "-73.16585000"
            },
            {
                "id": 16705,
                "name": "Mont-Saint-Hilaire",
                "latitude": "45.56515000",
                "longitude": "-73.18680000"
            },
            {
                "id": 16706,
                "name": "Mont-Tremblant",
                "latitude": "46.21274000",
                "longitude": "-74.58438000"
            },
            {
                "id": 16708,
                "name": "Montmagny",
                "latitude": "46.98043000",
                "longitude": "-70.55493000"
            },
            {
                "id": 16709,
                "name": "Montréal",
                "latitude": "45.50008000",
                "longitude": "-73.68248000"
            },
            {
                "id": 16710,
                "name": "Montréal-Est",
                "latitude": "45.63202000",
                "longitude": "-73.50750000"
            },
            {
                "id": 16711,
                "name": "Montréal-Ouest",
                "latitude": "45.45286000",
                "longitude": "-73.64918000"
            },
            {
                "id": 16718,
                "name": "Morin-Heights",
                "latitude": "45.90009000",
                "longitude": "-74.24922000"
            },
            {
                "id": 16732,
                "name": "Napierville",
                "latitude": "45.18648000",
                "longitude": "-73.40468000"
            },
            {
                "id": 16737,
                "name": "Neuville",
                "latitude": "46.69823000",
                "longitude": "-71.58275000"
            },
            {
                "id": 16738,
                "name": "New Carlisle",
                "latitude": "48.00956000",
                "longitude": "-65.33621000"
            },
            {
                "id": 16743,
                "name": "New-Richmond",
                "latitude": "48.16059000",
                "longitude": "-65.85823000"
            },
            {
                "id": 16746,
                "name": "Nicolet",
                "latitude": "46.21676000",
                "longitude": "-72.61582000"
            },
            {
                "id": 16751,
                "name": "Nord-du-Québec",
                "latitude": "51.96200000",
                "longitude": "-74.89610000"
            },
            {
                "id": 16754,
                "name": "Normandin",
                "latitude": "48.83328000",
                "longitude": "-72.53209000"
            },
            {
                "id": 16764,
                "name": "Notre-Dame-de-Grâce",
                "latitude": "45.47675000",
                "longitude": "-73.61432000"
            },
            {
                "id": 16765,
                "name": "Notre-Dame-de-l'Île-Perrot",
                "latitude": "45.36678000",
                "longitude": "-73.93250000"
            },
            {
                "id": 16766,
                "name": "Notre-Dame-des-Prairies",
                "latitude": "46.05007000",
                "longitude": "-73.43245000"
            },
            {
                "id": 16767,
                "name": "Notre-Dame-du-Lac",
                "latitude": "46.75012000",
                "longitude": "-79.04961000"
            },
            {
                "id": 16768,
                "name": "Notre-Dame-du-Mont-Carmel",
                "latitude": "46.01680000",
                "longitude": "-75.08259000"
            },
            {
                "id": 16771,
                "name": "Oka",
                "latitude": "45.46489000",
                "longitude": "-74.08892000"
            },
            {
                "id": 16780,
                "name": "Ormstown",
                "latitude": "45.13338000",
                "longitude": "-73.99922000"
            },
            {
                "id": 16786,
                "name": "Otterburn Park",
                "latitude": "45.53338000",
                "longitude": "-73.21585000"
            },
            {
                "id": 16787,
                "name": "Outaouais",
                "latitude": "46.26681000",
                "longitude": "-76.31606000"
            },
            {
                "id": 16794,
                "name": "Papineauville",
                "latitude": "45.61680000",
                "longitude": "-75.01599000"
            },
            {
                "id": 16795,
                "name": "Parc-Boutin",
                "latitude": "45.29209000",
                "longitude": "-73.26154000"
            },
            {
                "id": 16821,
                "name": "Piedmont",
                "latitude": "45.90008000",
                "longitude": "-74.13251000"
            },
            {
                "id": 16822,
                "name": "Pierreville",
                "latitude": "46.07034000",
                "longitude": "-72.81125000"
            },
            {
                "id": 16825,
                "name": "Pincourt",
                "latitude": "45.38338000",
                "longitude": "-73.98250000"
            },
            {
                "id": 16829,
                "name": "Plessisville",
                "latitude": "46.21856000",
                "longitude": "-71.76201000"
            },
            {
                "id": 16830,
                "name": "Pohénégamook",
                "latitude": "47.46315000",
                "longitude": "-69.22666000"
            },
            {
                "id": 16831,
                "name": "Pointe-Calumet",
                "latitude": "45.50008000",
                "longitude": "-73.96590000"
            },
            {
                "id": 16832,
                "name": "Pointe-Claire",
                "latitude": "45.44868000",
                "longitude": "-73.81669000"
            },
            {
                "id": 16833,
                "name": "Pointe-du-Lac",
                "latitude": "48.50009000",
                "longitude": "-71.78241000"
            },
            {
                "id": 16835,
                "name": "Pont Rouge",
                "latitude": "48.88332000",
                "longitude": "-72.08247000"
            },
            {
                "id": 16836,
                "name": "Pont-Rouge",
                "latitude": "46.75468000",
                "longitude": "-71.69566000"
            },
            {
                "id": 16847,
                "name": "Port-Cartier",
                "latitude": "50.03339000",
                "longitude": "-66.86545000"
            },
            {
                "id": 16849,
                "name": "Portneuf",
                "latitude": "46.69058000",
                "longitude": "-71.89011000"
            },
            {
                "id": 16862,
                "name": "Prévost",
                "latitude": "45.86678000",
                "longitude": "-74.08251000"
            },
            {
                "id": 16860,
                "name": "Princeville",
                "latitude": "46.17163000",
                "longitude": "-71.87462000"
            },
            {
                "id": 16867,
                "name": "Québec",
                "latitude": "46.81228000",
                "longitude": "-71.21454000"
            },
            {
                "id": 16870,
                "name": "Rawdon",
                "latitude": "46.05007000",
                "longitude": "-73.71587000"
            },
            {
                "id": 16881,
                "name": "Repentigny",
                "latitude": "45.74222000",
                "longitude": "-73.45008000"
            },
            {
                "id": 16883,
                "name": "Richelieu",
                "latitude": "45.44336000",
                "longitude": "-73.24602000"
            },
            {
                "id": 16886,
                "name": "Richmond",
                "latitude": "45.66677000",
                "longitude": "-72.14910000"
            },
            {
                "id": 16891,
                "name": "Rigaud",
                "latitude": "45.47927000",
                "longitude": "-74.30238000"
            },
            {
                "id": 16893,
                "name": "Rimouski",
                "latitude": "48.44879000",
                "longitude": "-68.52396000"
            },
            {
                "id": 16896,
                "name": "Rivière-du-Loup",
                "latitude": "47.82699000",
                "longitude": "-69.54243000"
            },
            {
                "id": 16895,
                "name": "Rivière-Rouge",
                "latitude": "46.41679000",
                "longitude": "-74.86596000"
            },
            {
                "id": 16897,
                "name": "Roberval",
                "latitude": "48.51680000",
                "longitude": "-72.23244000"
            },
            {
                "id": 16899,
                "name": "Rock Forest",
                "latitude": "45.35699000",
                "longitude": "-71.99676000"
            },
            {
                "id": 16902,
                "name": "Rosemère",
                "latitude": "45.63338000",
                "longitude": "-73.79919000"
            },
            {
                "id": 16906,
                "name": "Rougemont",
                "latitude": "45.43338000",
                "longitude": "-73.04914000"
            },
            {
                "id": 16907,
                "name": "Rouyn-Noranda",
                "latitude": "48.23656000",
                "longitude": "-79.02311000"
            },
            {
                "id": 16911,
                "name": "Sacré-Coeur",
                "latitude": "48.22970000",
                "longitude": "-69.80061000"
            },
            {
                "id": 16912,
                "name": "Saguenay",
                "latitude": "48.41675000",
                "longitude": "-71.06573000"
            },
            {
                "id": 16915,
                "name": "Saint-Adolphe-d'Howard",
                "latitude": "45.96679000",
                "longitude": "-74.33253000"
            },
            {
                "id": 16916,
                "name": "Saint-Alexandre",
                "latitude": "45.50010000",
                "longitude": "-75.74935000"
            },
            {
                "id": 16917,
                "name": "Saint-Amable",
                "latitude": "45.65008000",
                "longitude": "-73.29916000"
            },
            {
                "id": 16918,
                "name": "Saint-Ambroise",
                "latitude": "48.55009000",
                "longitude": "-71.33238000"
            },
            {
                "id": 16919,
                "name": "Saint-André-Avellin",
                "latitude": "45.71680000",
                "longitude": "-75.06599000"
            },
            {
                "id": 16920,
                "name": "Saint-Anselme",
                "latitude": "46.62922000",
                "longitude": "-70.97340000"
            },
            {
                "id": 16922,
                "name": "Saint-Antoine-de-Tilly",
                "latitude": "46.66346000",
                "longitude": "-71.57335000"
            },
            {
                "id": 16923,
                "name": "Saint-Augustin",
                "latitude": "51.22602000",
                "longitude": "-58.65017000"
            },
            {
                "id": 16924,
                "name": "Saint-Augustin-de-Desmaures",
                "latitude": "46.74064000",
                "longitude": "-71.45131000"
            },
            {
                "id": 16925,
                "name": "Saint-Barnabé-Sud",
                "latitude": "45.72977000",
                "longitude": "-72.92244000"
            },
            {
                "id": 16926,
                "name": "Saint-Basile-le-Grand",
                "latitude": "45.53338000",
                "longitude": "-73.28246000"
            },
            {
                "id": 16927,
                "name": "Saint-Boniface",
                "latitude": "46.50011000",
                "longitude": "-75.98264000"
            },
            {
                "id": 16928,
                "name": "Saint-Bruno",
                "latitude": "48.46679000",
                "longitude": "-71.64910000"
            },
            {
                "id": 16929,
                "name": "Saint-Bruno-de-Guigues",
                "latitude": "47.46685000",
                "longitude": "-79.43296000"
            },
            {
                "id": 16930,
                "name": "Saint-Bruno-de-Montarville",
                "latitude": "45.53341000",
                "longitude": "-73.34916000"
            },
            {
                "id": 16931,
                "name": "Saint-Canut",
                "latitude": "45.71502000",
                "longitude": "-74.08376000"
            },
            {
                "id": 16935,
                "name": "Saint-Césaire",
                "latitude": "45.41678000",
                "longitude": "-72.99914000"
            },
            {
                "id": 16932,
                "name": "Saint-Charles",
                "latitude": "45.70288000",
                "longitude": "-73.55417000"
            },
            {
                "id": 16936,
                "name": "Saint-Côme--Linière",
                "latitude": "46.06677000",
                "longitude": "-70.51573000"
            },
            {
                "id": 16933,
                "name": "Saint-Constant",
                "latitude": "45.36678000",
                "longitude": "-73.56588000"
            },
            {
                "id": 16934,
                "name": "Saint-Cyrille-de-Wendover",
                "latitude": "45.93336000",
                "longitude": "-72.43241000"
            },
            {
                "id": 16937,
                "name": "Saint-Damase",
                "latitude": "45.53341000",
                "longitude": "-72.99914000"
            },
            {
                "id": 16938,
                "name": "Saint-Denis-sur-Richelieu",
                "latitude": "45.78338000",
                "longitude": "-73.14915000"
            },
            {
                "id": 16939,
                "name": "Saint-Donat-de-Montcalm",
                "latitude": "46.31868000",
                "longitude": "-74.22171000"
            },
            {
                "id": 16992,
                "name": "Saint-Édouard",
                "latitude": "45.23338000",
                "longitude": "-73.51588000"
            },
            {
                "id": 16940,
                "name": "Saint-Elzéar",
                "latitude": "45.60338000",
                "longitude": "-73.72698000"
            },
            {
                "id": 16993,
                "name": "Saint-Éphrem-de-Beauce",
                "latitude": "46.06677000",
                "longitude": "-70.94905000"
            },
            {
                "id": 16941,
                "name": "Saint-Eustache",
                "latitude": "45.56500000",
                "longitude": "-73.90554000"
            },
            {
                "id": 16942,
                "name": "Saint-Félicien",
                "latitude": "48.65007000",
                "longitude": "-72.44906000"
            },
            {
                "id": 16943,
                "name": "Saint-Félix-de-Valois",
                "latitude": "46.16977000",
                "longitude": "-73.42525000"
            },
            {
                "id": 16944,
                "name": "Saint-Gabriel",
                "latitude": "46.30007000",
                "longitude": "-73.38245000"
            },
            {
                "id": 16947,
                "name": "Saint-Gédéon",
                "latitude": "48.50009000",
                "longitude": "-71.76581000"
            },
            {
                "id": 16945,
                "name": "Saint-Georges",
                "latitude": "46.11353000",
                "longitude": "-70.66526000"
            },
            {
                "id": 16946,
                "name": "Saint-Germain-de-Grantham",
                "latitude": "45.83337000",
                "longitude": "-72.56582000"
            },
            {
                "id": 16948,
                "name": "Saint-Henri",
                "latitude": "46.69314000",
                "longitude": "-71.06927000"
            },
            {
                "id": 16949,
                "name": "Saint-Hippolyte",
                "latitude": "45.93338000",
                "longitude": "-74.01590000"
            },
            {
                "id": 16950,
                "name": "Saint-Honoré",
                "latitude": "48.53338000",
                "longitude": "-71.08236000"
            },
            {
                "id": 16951,
                "name": "Saint-Hyacinthe",
                "latitude": "45.63076000",
                "longitude": "-72.95699000"
            },
            {
                "id": 16952,
                "name": "Saint-Isidore",
                "latitude": "47.43345000",
                "longitude": "-79.29965000"
            },
            {
                "id": 16953,
                "name": "Saint-Jacques-le-Mineur",
                "latitude": "45.28338000",
                "longitude": "-73.41587000"
            },
            {
                "id": 16954,
                "name": "Saint-Jean-Baptiste",
                "latitude": "45.38060000",
                "longitude": "-74.01210000"
            },
            {
                "id": 16955,
                "name": "Saint-Jean-sur-Richelieu",
                "latitude": "45.30713000",
                "longitude": "-73.26259000"
            },
            {
                "id": 16960,
                "name": "Saint-Jérôme",
                "latitude": "45.78036000",
                "longitude": "-74.00365000"
            },
            {
                "id": 16956,
                "name": "Saint-Joseph",
                "latitude": "45.95817000",
                "longitude": "-73.22025000"
            },
            {
                "id": 16957,
                "name": "Saint-Joseph-de-Beauce",
                "latitude": "46.30000000",
                "longitude": "-70.86667000"
            },
            {
                "id": 16958,
                "name": "Saint-Joseph-de-Coleraine",
                "latitude": "45.96677000",
                "longitude": "-71.36577000"
            },
            {
                "id": 16959,
                "name": "Saint-Joseph-du-Lac",
                "latitude": "45.53338000",
                "longitude": "-73.99920000"
            },
            {
                "id": 16961,
                "name": "Saint-Lambert-de-Lauzon",
                "latitude": "46.58624000",
                "longitude": "-71.20892000"
            },
            {
                "id": 16962,
                "name": "Saint-Laurent",
                "latitude": "45.50008000",
                "longitude": "-73.66585000"
            },
            {
                "id": 16963,
                "name": "Saint-Lazare",
                "latitude": "45.40008000",
                "longitude": "-74.13256000"
            },
            {
                "id": 16966,
                "name": "Saint-Léonard",
                "latitude": "45.58773000",
                "longitude": "-73.59501000"
            },
            {
                "id": 16968,
                "name": "Saint-Léonard-d'Aston",
                "latitude": "46.10006000",
                "longitude": "-72.36580000"
            },
            {
                "id": 16964,
                "name": "Saint-Liboire",
                "latitude": "45.65068000",
                "longitude": "-72.76348000"
            },
            {
                "id": 16965,
                "name": "Saint-Lin-Laurentides",
                "latitude": "45.85008000",
                "longitude": "-73.76588000"
            },
            {
                "id": 16969,
                "name": "Saint-Marc-des-Carrières",
                "latitude": "46.68335000",
                "longitude": "-72.04910000"
            },
            {
                "id": 16970,
                "name": "Saint-Mathieu",
                "latitude": "45.31678000",
                "longitude": "-73.51587000"
            },
            {
                "id": 16971,
                "name": "Saint-Michel",
                "latitude": "45.56758000",
                "longitude": "-73.62168000"
            },
            {
                "id": 16972,
                "name": "Saint-Michel-des-Saints",
                "latitude": "46.67702000",
                "longitude": "-73.91881000"
            },
            {
                "id": 16973,
                "name": "Saint-Nazaire",
                "latitude": "48.58944000",
                "longitude": "-71.55247000"
            },
            {
                "id": 16974,
                "name": "Saint-Norbert",
                "latitude": "46.16949000",
                "longitude": "-73.31494000"
            },
            {
                "id": 16975,
                "name": "Saint-Pacôme",
                "latitude": "47.40457000",
                "longitude": "-69.95025000"
            },
            {
                "id": 16976,
                "name": "Saint-Pascal",
                "latitude": "47.51813000",
                "longitude": "-69.80301000"
            },
            {
                "id": 16977,
                "name": "Saint-Philippe-de-La Prairie",
                "latitude": "45.35723000",
                "longitude": "-73.47706000"
            },
            {
                "id": 16978,
                "name": "Saint-Pie",
                "latitude": "45.50277000",
                "longitude": "-72.90890000"
            },
            {
                "id": 16979,
                "name": "Saint-Pierre-les-Becquets",
                "latitude": "46.50005000",
                "longitude": "-72.19910000"
            },
            {
                "id": 16980,
                "name": "Saint-Prime",
                "latitude": "48.58339000",
                "longitude": "-72.33244000"
            },
            {
                "id": 16981,
                "name": "Saint-Raphaël",
                "latitude": "46.25011000",
                "longitude": "-76.01605000"
            },
            {
                "id": 16982,
                "name": "Saint-Raymond",
                "latitude": "45.46698000",
                "longitude": "-73.60948000"
            },
            {
                "id": 16983,
                "name": "Saint-Rémi",
                "latitude": "45.26678000",
                "longitude": "-73.61588000"
            },
            {
                "id": 16984,
                "name": "Saint-Rémi-de-Tingwick",
                "latitude": "45.86677000",
                "longitude": "-71.81581000"
            },
            {
                "id": 16985,
                "name": "Saint-Sauveur",
                "latitude": "45.88686000",
                "longitude": "-74.17943000"
            },
            {
                "id": 16986,
                "name": "Saint-Sauveur-des-Monts",
                "latitude": "45.90008000",
                "longitude": "-74.16591000"
            },
            {
                "id": 16987,
                "name": "Saint-Siméon",
                "latitude": "47.84431000",
                "longitude": "-69.87837000"
            },
            {
                "id": 16988,
                "name": "Saint-Thomas",
                "latitude": "46.01677000",
                "longitude": "-73.34915000"
            },
            {
                "id": 16989,
                "name": "Saint-Tite",
                "latitude": "46.73336000",
                "longitude": "-72.56581000"
            },
            {
                "id": 16990,
                "name": "Saint-Victor",
                "latitude": "45.61118000",
                "longitude": "-73.51527000"
            },
            {
                "id": 16991,
                "name": "Saint-Zotique",
                "latitude": "45.25009000",
                "longitude": "-74.24924000"
            },
            {
                "id": 16994,
                "name": "Sainte Catherine de la Jacques Cartier",
                "latitude": "46.85244000",
                "longitude": "-71.62056000"
            },
            {
                "id": 16995,
                "name": "Sainte-Adèle",
                "latitude": "45.95008000",
                "longitude": "-74.13251000"
            },
            {
                "id": 16996,
                "name": "Sainte-Agathe-des-Monts",
                "latitude": "46.05009000",
                "longitude": "-74.28252000"
            },
            {
                "id": 16997,
                "name": "Sainte-Anne-de-Bellevue",
                "latitude": "45.40618000",
                "longitude": "-73.94560000"
            },
            {
                "id": 16998,
                "name": "Sainte-Anne-des-Monts",
                "latitude": "49.12402000",
                "longitude": "-66.49243000"
            },
            {
                "id": 16999,
                "name": "Sainte-Anne-des-Plaines",
                "latitude": "45.76468000",
                "longitude": "-73.81156000"
            },
            {
                "id": 17000,
                "name": "Sainte-Béatrix",
                "latitude": "46.20007000",
                "longitude": "-73.61587000"
            },
            {
                "id": 17001,
                "name": "Sainte-Catherine",
                "latitude": "45.40008000",
                "longitude": "-73.58248000"
            },
            {
                "id": 17002,
                "name": "Sainte-Croix",
                "latitude": "45.13368000",
                "longitude": "-72.80083000"
            },
            {
                "id": 17012,
                "name": "Sainte-Élisabeth",
                "latitude": "46.09502000",
                "longitude": "-73.35176000"
            },
            {
                "id": 17003,
                "name": "Sainte-Julie",
                "latitude": "45.58338000",
                "longitude": "-73.33246000"
            },
            {
                "id": 17004,
                "name": "Sainte-Julienne",
                "latitude": "45.96677000",
                "longitude": "-73.71587000"
            },
            {
                "id": 17005,
                "name": "Sainte-Madeleine",
                "latitude": "45.60008000",
                "longitude": "-73.09914000"
            },
            {
                "id": 17006,
                "name": "Sainte-Marie",
                "latitude": "46.43401000",
                "longitude": "-71.01168000"
            },
            {
                "id": 17007,
                "name": "Sainte-Marthe-sur-le-Lac",
                "latitude": "45.53338000",
                "longitude": "-73.93250000"
            },
            {
                "id": 17008,
                "name": "Sainte-Martine",
                "latitude": "45.25008000",
                "longitude": "-73.79919000"
            },
            {
                "id": 17009,
                "name": "Sainte-Sophie",
                "latitude": "45.81678000",
                "longitude": "-73.89919000"
            },
            {
                "id": 17010,
                "name": "Sainte-Thècle",
                "latitude": "46.81676000",
                "longitude": "-72.49911000"
            },
            {
                "id": 17011,
                "name": "Sainte-Thérèse",
                "latitude": "45.63922000",
                "longitude": "-73.82757000"
            },
            {
                "id": 17013,
                "name": "Salaberry-de-Valleyfield",
                "latitude": "45.25008000",
                "longitude": "-74.13253000"
            },
            {
                "id": 17015,
                "name": "Salluit",
                "latitude": "62.20411000",
                "longitude": "-75.64344000"
            },
            {
                "id": 17027,
                "name": "Senneterre",
                "latitude": "48.39302000",
                "longitude": "-77.23951000"
            },
            {
                "id": 17028,
                "name": "Sept-Îles",
                "latitude": "50.20011000",
                "longitude": "-66.38208000"
            },
            {
                "id": 17030,
                "name": "Shannon",
                "latitude": "46.88026000",
                "longitude": "-71.51464000"
            },
            {
                "id": 17032,
                "name": "Shawinigan",
                "latitude": "46.56675000",
                "longitude": "-72.74913000"
            },
            {
                "id": 17033,
                "name": "Shawville",
                "latitude": "45.60011000",
                "longitude": "-76.48270000"
            },
            {
                "id": 17039,
                "name": "Sherbrooke",
                "latitude": "45.40008000",
                "longitude": "-71.89908000"
            },
            {
                "id": 17054,
                "name": "Sorel-Tracy",
                "latitude": "46.04178000",
                "longitude": "-73.11358000"
            },
            {
                "id": 17066,
                "name": "St-Jean-Port-Joli",
                "latitude": "47.21418000",
                "longitude": "-70.26969000"
            },
            {
                "id": 17091,
                "name": "Sutton",
                "latitude": "45.10008000",
                "longitude": "-72.61582000"
            },
            {
                "id": 17132,
                "name": "Témiscaming",
                "latitude": "46.72122000",
                "longitude": "-79.09712000"
            },
            {
                "id": 17103,
                "name": "Terrasse-des-Pins",
                "latitude": "45.86449000",
                "longitude": "-74.06627000"
            },
            {
                "id": 17104,
                "name": "Terrebonne",
                "latitude": "45.70004000",
                "longitude": "-73.64732000"
            },
            {
                "id": 17107,
                "name": "Thetford-Mines",
                "latitude": "46.09371000",
                "longitude": "-71.30539000"
            },
            {
                "id": 17113,
                "name": "Thurso",
                "latitude": "45.60010000",
                "longitude": "-75.24931000"
            },
            {
                "id": 17126,
                "name": "Trois-Rivières",
                "latitude": "46.34515000",
                "longitude": "-72.54770000"
            },
            {
                "id": 17139,
                "name": "Val-d'Or",
                "latitude": "48.09740000",
                "longitude": "-77.79737000"
            },
            {
                "id": 17137,
                "name": "Val-David",
                "latitude": "46.03338000",
                "longitude": "-74.21592000"
            },
            {
                "id": 17140,
                "name": "Val-des-Monts",
                "latitude": "45.65010000",
                "longitude": "-75.66604000"
            },
            {
                "id": 17138,
                "name": "Val-Morin",
                "latitude": "46.00008000",
                "longitude": "-74.18251000"
            },
            {
                "id": 17141,
                "name": "Valcourt",
                "latitude": "45.50008000",
                "longitude": "-72.31581000"
            },
            {
                "id": 17144,
                "name": "Vallée-Jonction",
                "latitude": "46.37441000",
                "longitude": "-70.91881000"
            },
            {
                "id": 17148,
                "name": "Varennes",
                "latitude": "45.68338000",
                "longitude": "-73.43246000"
            },
            {
                "id": 17149,
                "name": "Vaudreuil-Dorion",
                "latitude": "45.40008000",
                "longitude": "-74.03251000"
            },
            {
                "id": 17152,
                "name": "Venise-en-Québec",
                "latitude": "45.08338000",
                "longitude": "-73.13245000"
            },
            {
                "id": 17153,
                "name": "Verchères",
                "latitude": "45.78338000",
                "longitude": "-73.34916000"
            },
            {
                "id": 17157,
                "name": "Victoriaville",
                "latitude": "46.05007000",
                "longitude": "-71.96579000"
            },
            {
                "id": 17159,
                "name": "Ville-Marie",
                "latitude": "47.33345000",
                "longitude": "-79.43297000"
            },
            {
                "id": 17167,
                "name": "Wakefield",
                "latitude": "45.66680000",
                "longitude": "-75.83265000"
            },
            {
                "id": 17171,
                "name": "Warwick",
                "latitude": "45.95007000",
                "longitude": "-71.98240000"
            },
            {
                "id": 17173,
                "name": "Waskaganish",
                "latitude": "51.48333000",
                "longitude": "-78.75000000"
            },
            {
                "id": 17174,
                "name": "Waswanipi",
                "latitude": "49.73346000",
                "longitude": "-76.16604000"
            },
            {
                "id": 17177,
                "name": "Waterloo",
                "latitude": "45.35008000",
                "longitude": "-72.51582000"
            },
            {
                "id": 17182,
                "name": "Weedon Centre",
                "latitude": "45.70802000",
                "longitude": "-71.45986000"
            },
            {
                "id": 17196,
                "name": "Westmount",
                "latitude": "45.48341000",
                "longitude": "-73.59918000"
            },
            {
                "id": 17199,
                "name": "Weymontachie",
                "latitude": "47.89940000",
                "longitude": "-73.77720000"
            },
            {
                "id": 17210,
                "name": "Windsor",
                "latitude": "45.56678000",
                "longitude": "-71.99909000"
            },
            {
                "id": 17219,
                "name": "Yamachiche",
                "latitude": "46.26676000",
                "longitude": "-72.83243000"
            }
        ]
    },
    {
        "id": 870,
        "name": "Saskatchewan",
        "state_code": "SK",
        "cities": [
            {
                "id": 16177,
                "name": "Assiniboia",
                "latitude": "49.63336000",
                "longitude": "-105.98446000"
            },
            {
                "id": 16217,
                "name": "Biggar",
                "latitude": "52.06680000",
                "longitude": "-108.00135000"
            },
            {
                "id": 16268,
                "name": "Canora",
                "latitude": "51.63328000",
                "longitude": "-102.43425000"
            },
            {
                "id": 16282,
                "name": "Carlyle",
                "latitude": "49.63334000",
                "longitude": "-102.26765000"
            },
            {
                "id": 16353,
                "name": "Dalmeny",
                "latitude": "52.33339000",
                "longitude": "-106.76792000"
            },
            {
                "id": 16410,
                "name": "Esterhazy",
                "latitude": "50.65001000",
                "longitude": "-102.08426000"
            },
            {
                "id": 16411,
                "name": "Estevan",
                "latitude": "49.13337000",
                "longitude": "-102.98422000"
            },
            {
                "id": 16424,
                "name": "Foam Lake",
                "latitude": "51.65001000",
                "longitude": "-103.53431000"
            },
            {
                "id": 16469,
                "name": "Gravelbourg",
                "latitude": "49.88336000",
                "longitude": "-106.55122000"
            },
            {
                "id": 16512,
                "name": "Hudson Bay",
                "latitude": "52.85003000",
                "longitude": "-102.38425000"
            },
            {
                "id": 16513,
                "name": "Humboldt",
                "latitude": "52.20005000",
                "longitude": "-105.12550000"
            },
            {
                "id": 16519,
                "name": "Indian Head",
                "latitude": "50.53336000",
                "longitude": "-103.66775000"
            },
            {
                "id": 16532,
                "name": "Kamsack",
                "latitude": "51.56668000",
                "longitude": "-101.90093000"
            },
            {
                "id": 16540,
                "name": "Kerrobert",
                "latitude": "51.91682000",
                "longitude": "-109.13479000"
            },
            {
                "id": 16547,
                "name": "Kindersley",
                "latitude": "51.46681000",
                "longitude": "-109.16818000"
            },
            {
                "id": 16570,
                "name": "La Ronge",
                "latitude": "55.10013000",
                "longitude": "-105.28422000"
            },
            {
                "id": 16594,
                "name": "Langenburg",
                "latitude": "50.84999000",
                "longitude": "-101.71763000"
            },
            {
                "id": 16596,
                "name": "Langham",
                "latitude": "52.36680000",
                "longitude": "-106.96793000"
            },
            {
                "id": 16598,
                "name": "Lanigan",
                "latitude": "51.85006000",
                "longitude": "-105.03443000"
            },
            {
                "id": 16636,
                "name": "Lumsden",
                "latitude": "50.65009000",
                "longitude": "-104.86783000"
            },
            {
                "id": 16642,
                "name": "Macklin",
                "latitude": "52.33344000",
                "longitude": "-109.93484000"
            },
            {
                "id": 16655,
                "name": "Maple Creek",
                "latitude": "49.91678000",
                "longitude": "-109.48481000"
            },
            {
                "id": 16663,
                "name": "Martensville",
                "latitude": "52.28339000",
                "longitude": "-106.66792000"
            },
            {
                "id": 16673,
                "name": "Meadow Lake",
                "latitude": "54.13348000",
                "longitude": "-108.43471000"
            },
            {
                "id": 16676,
                "name": "Melfort",
                "latitude": "52.86673000",
                "longitude": "-104.61768000"
            },
            {
                "id": 16679,
                "name": "Melville",
                "latitude": "50.91671000",
                "longitude": "-102.80099000"
            },
            {
                "id": 16713,
                "name": "Moose Jaw",
                "latitude": "50.40005000",
                "longitude": "-105.53445000"
            },
            {
                "id": 16715,
                "name": "Moosomin",
                "latitude": "50.13332000",
                "longitude": "-101.66766000"
            },
            {
                "id": 16747,
                "name": "Nipawin",
                "latitude": "53.36678000",
                "longitude": "-104.00092000"
            },
            {
                "id": 16755,
                "name": "North Battleford",
                "latitude": "52.77972000",
                "longitude": "-108.29670000"
            },
            {
                "id": 16788,
                "name": "Outlook",
                "latitude": "51.50008000",
                "longitude": "-107.05128000"
            },
            {
                "id": 16790,
                "name": "Oxbow",
                "latitude": "49.23335000",
                "longitude": "-102.16760000"
            },
            {
                "id": 16807,
                "name": "Pelican Narrows",
                "latitude": "55.16685000",
                "longitude": "-102.93410000"
            },
            {
                "id": 16823,
                "name": "Pilot Butte",
                "latitude": "50.46678000",
                "longitude": "-104.41778000"
            },
            {
                "id": 16852,
                "name": "Preeceville",
                "latitude": "51.94998000",
                "longitude": "-102.66766000"
            },
            {
                "id": 16854,
                "name": "Prince Albert",
                "latitude": "53.20008000",
                "longitude": "-105.76772000"
            },
            {
                "id": 16875,
                "name": "Regina",
                "latitude": "50.45008000",
                "longitude": "-104.61780000"
            },
            {
                "id": 16876,
                "name": "Regina Beach",
                "latitude": "50.78338000",
                "longitude": "-105.00112000"
            },
            {
                "id": 16903,
                "name": "Rosetown",
                "latitude": "51.55010000",
                "longitude": "-108.00136000"
            },
            {
                "id": 16905,
                "name": "Rosthern",
                "latitude": "52.66679000",
                "longitude": "-106.33446000"
            },
            {
                "id": 17021,
                "name": "Saskatoon",
                "latitude": "52.13238000",
                "longitude": "-106.66892000"
            },
            {
                "id": 17031,
                "name": "Shaunavon",
                "latitude": "49.65005000",
                "longitude": "-108.41810000"
            },
            {
                "id": 17038,
                "name": "Shellbrook",
                "latitude": "53.21679000",
                "longitude": "-106.40109000"
            },
            {
                "id": 17094,
                "name": "Swift Current",
                "latitude": "50.28337000",
                "longitude": "-107.80135000"
            },
            {
                "id": 17116,
                "name": "Tisdale",
                "latitude": "52.85002000",
                "longitude": "-104.05096000"
            },
            {
                "id": 17134,
                "name": "Unity",
                "latitude": "52.45014000",
                "longitude": "-109.16816000"
            },
            {
                "id": 17165,
                "name": "Wadena",
                "latitude": "51.94999000",
                "longitude": "-103.80102000"
            },
            {
                "id": 17170,
                "name": "Warman",
                "latitude": "52.31679000",
                "longitude": "-106.56791000"
            },
            {
                "id": 17179,
                "name": "Watrous",
                "latitude": "51.66677000",
                "longitude": "-105.46788000"
            },
            {
                "id": 17198,
                "name": "Weyburn",
                "latitude": "49.66675000",
                "longitude": "-103.85109000"
            },
            {
                "id": 17201,
                "name": "White City",
                "latitude": "50.43338000",
                "longitude": "-104.36778000"
            },
            {
                "id": 17206,
                "name": "Wilkie",
                "latitude": "52.41683000",
                "longitude": "-108.70142000"
            },
            {
                "id": 17218,
                "name": "Wynyard",
                "latitude": "51.76674000",
                "longitude": "-104.18436000"
            },
            {
                "id": 17223,
                "name": "Yorkton",
                "latitude": "51.21670000",
                "longitude": "-102.46766000"
            }
        ]
    },
    {
        "id": 869,
        "name": "Yukon",
        "state_code": "YT",
        "cities": [
            {
                "id": 16358,
                "name": "Dawson City",
                "latitude": "64.06013000",
                "longitude": "-139.43328000"
            },
            {
                "id": 16479,
                "name": "Haines Junction",
                "latitude": "60.75216000",
                "longitude": "-137.51082000"
            },
            {
                "id": 17180,
                "name": "Watson Lake",
                "latitude": "60.06349000",
                "longitude": "-128.70893000"
            },
            {
                "id": 17204,
                "name": "Whitehorse",
                "latitude": "60.71611000",
                "longitude": "-135.05375000"
            }
        ]
    }
]

/**
 * TODO: Add dummy listings, dummy conversations/messages, bookings etc between different users.
 * Done: Moving this to testing instead of dev.
 */
/**
 * 
 * Seeds the database with values that are needed for the
 * app to function properly. Things such as dummy users, geo info
 * like country, states, cities and so on.
 * 
 * @param em Entity manager
 */
export async function seedDatabase(em: EntityManager) {

    const user = new User("3f1f8783-8e27-473d-852e-90c94c4f270b", 
    "munibrhmn@gmail.com")
    user.first_name = "Munib"
    user.last_name = "Rahman"
    user.stripe_customer_id = "cus_JKClOkOhSdxGZ1"
    user.stripe_account_id = "acct_1IhYLr2eWenfZEly"
    
    

    const country = new Country(1, "Canada", "CAD", "$")


    STATE_JSON.forEach(state => {
        let newState = new State(state.id, state.name, country)
        state.cities.forEach(city => {
            newState.cities.add(new City(city.id, city.name, newState))
        })
        country.states.add(newState)
    })

    try {
        await em.findOneOrFail(Country, country);
        await em.findOneOrFail(User, user);
    } catch(er) {
        await em.persist(country);
        await em.persist(user);
        await em.flush();
    }

}
